import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session

from . import models, schemas, auth
from .database import engine, get_db, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="EduBridge Overseas API", version="1.0.0")

origins = os.getenv("CORS_ORIGINS", "https://edubridge-1-ntxj.onrender.com").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "database": "connected"}


# ---------- Public routes ----------


@app.post("/api/contact", response_model=schemas.ContactOut, status_code=201)
def submit_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    submission = models.ContactSubmission(**payload.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


# ---------- User Auth routes ----------


@app.post("/api/auth/register", response_model=schemas.UserAuthResponse, status_code=201)
def register_user(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists.",
        )

    hashed_pw = auth.hash_password(payload.password)
    user = models.User(
        full_name=payload.full_name,
        email=payload.email.lower(),
        hashed_password=hashed_pw,
        role="user",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = auth.create_access_token(user.email, role="user")
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }


@app.post("/api/auth/login", response_model=schemas.UserAuthResponse)
def login_user(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email.lower()).first()
    if not user or not auth.verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account has been deactivated. Please contact support.",
        )

    token = auth.create_access_token(user.email, role="user")
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }


@app.get("/api/auth/me", response_model=schemas.UserOut)
def get_current_user_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


# ---------- Admin Auth routes ----------


@app.post("/api/admin/login", response_model=schemas.Token)
def admin_login(payload: schemas.AdminLogin):
    if not auth.authenticate_admin(payload.username, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = auth.create_access_token(payload.username, role="admin")
    return {"access_token": token, "token_type": "bearer"}


# ---------- Admin protected routes ----------


@app.get("/api/admin/submissions", response_model=list[schemas.ContactOut])
def list_submissions(
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    return (
        db.query(models.ContactSubmission)
        .order_by(models.ContactSubmission.created_at.desc())
        .all()
    )


@app.patch("/api/admin/submissions/{submission_id}", response_model=schemas.ContactOut)
def update_submission(
    submission_id: int,
    payload: schemas.ContactUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    submission = (
        db.query(models.ContactSubmission)
        .filter(models.ContactSubmission.id == submission_id)
        .first()
    )
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission.is_reviewed = payload.is_reviewed
    db.commit()
    db.refresh(submission)
    return submission


@app.delete("/api/admin/submissions/{submission_id}", status_code=204)
def delete_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    submission = (
        db.query(models.ContactSubmission)
        .filter(models.ContactSubmission.id == submission_id)
        .first()
    )
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    db.delete(submission)
    db.commit()
    return None


@app.get("/api/admin/stats", response_model=schemas.Stats)
def get_stats(
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    total = db.query(func.count(models.ContactSubmission.id)).scalar()
    reviewed = (
        db.query(func.count(models.ContactSubmission.id))
        .filter(models.ContactSubmission.is_reviewed.is_(True))
        .scalar()
    )
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    new_this_week = (
        db.query(func.count(models.ContactSubmission.id))
        .filter(models.ContactSubmission.created_at >= week_ago)
        .scalar()
    )
    return {
        "total_submissions": total,
        "new_this_week": new_this_week,
        "reviewed": reviewed,
        "pending": total - reviewed,
    }


# ---------- Public Service & University routes ----------

@app.get("/api/services", response_model=list[schemas.ServiceOut])
def get_services(db: Session = Depends(get_db)):
    return db.query(models.Service).order_by(models.Service.display_order.asc()).all()

@app.get("/api/universities", response_model=list[schemas.UniversityOut])
def get_universities(db: Session = Depends(get_db)):
    return db.query(models.University).all()

@app.get("/api/universities/{slug}", response_model=schemas.UniversityOut)
def get_university(slug: str, db: Session = Depends(get_db)):
    uni = db.query(models.University).filter(models.University.id == slug).first()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
    return uni


# ---------- Admin Service routes ----------

@app.post("/api/admin/services", response_model=schemas.ServiceOut, status_code=201)
def create_service(
    payload: schemas.ServiceCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    service = models.Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@app.put("/api/admin/services/{service_id}", response_model=schemas.ServiceOut)
def update_service(
    service_id: int,
    payload: schemas.ServiceUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    for key, value in payload.model_dump().items():
        setattr(service, key, value)
    
    db.commit()
    db.refresh(service)
    return service

@app.delete("/api/admin/services/{service_id}", status_code=204)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return None


# ---------- Admin University routes ----------

@app.post("/api/admin/universities", response_model=schemas.UniversityOut, status_code=201)
def create_university(
    payload: schemas.UniversityCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    existing = db.query(models.University).filter(models.University.id == payload.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="University with this ID already exists")
        
    uni = models.University(**payload.model_dump())
    db.add(uni)
    db.commit()
    db.refresh(uni)
    return uni

@app.put("/api/admin/universities/{slug}", response_model=schemas.UniversityOut)
def update_university(
    slug: str,
    payload: schemas.UniversityUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    uni = db.query(models.University).filter(models.University.id == slug).first()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
        
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(uni, key, value)
        
    db.commit()
    db.refresh(uni)
    return uni

@app.delete("/api/admin/universities/{slug}", status_code=204)
def delete_university(
    slug: str,
    db: Session = Depends(get_db),
    current_admin: str = Depends(auth.get_current_admin),
):
    uni = db.query(models.University).filter(models.University.id == slug).first()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
    db.delete(uni)
    db.commit()
    return None
