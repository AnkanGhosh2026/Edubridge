from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ---------- User Schemas ----------

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UserAuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---------- Contact Schemas ----------

class ContactCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=30)
    interested_course: Optional[str] = Field(default=None, max_length=120)
    message: Optional[str] = Field(default=None, max_length=2000)


class ContactOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    interested_course: Optional[str] = None
    message: Optional[str] = None
    is_reviewed: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactUpdate(BaseModel):
    is_reviewed: bool


class AdminLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class Stats(BaseModel):
    total_submissions: int
    new_this_week: int
    reviewed: int
    pending: int


# ---------- Service Schemas ----------

class ServiceCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    icon: Optional[str] = Field(default=None, max_length=50)
    image: Optional[str] = Field(default=None, max_length=255)
    color: Optional[str] = Field(default=None, max_length=50)
    display_order: int = 0
    items: Optional[list | dict] = None

class ServiceUpdate(ServiceCreate):
    pass

class ServiceOut(ServiceCreate):
    id: int

    class Config:
        from_attributes = True


# ---------- University Schemas ----------

class UniversityCreate(BaseModel):
    id: str = Field(..., max_length=150)
    name: str = Field(..., max_length=255)
    category: Optional[str] = Field(default=None, max_length=100)
    location: Optional[str] = Field(default=None, max_length=255)
    state: Optional[str] = Field(default=None, max_length=50)
    type: Optional[str] = Field(default=None, max_length=100)
    established: Optional[str] = Field(default=None, max_length=20)
    ranking: Optional[str] = Field(default=None, max_length=255)
    global_rank: Optional[str] = Field(default=None, max_length=255)
    acceptance_rate: Optional[str] = Field(default=None, max_length=50)
    image: Optional[str] = Field(default=None, max_length=255)
    badge: Optional[str] = Field(default=None, max_length=100)
    overview: Optional[str] = None
    
    courses: Optional[list | dict] = None
    fees: Optional[dict] = None
    timeline: Optional[list | dict] = None
    rules: Optional[dict] = None
    regulations: Optional[dict] = None
    campus_life: Optional[dict] = None

class UniversityUpdate(BaseModel):
    name: Optional[str] = Field(default=None, max_length=255)
    category: Optional[str] = Field(default=None, max_length=100)
    location: Optional[str] = Field(default=None, max_length=255)
    state: Optional[str] = Field(default=None, max_length=50)
    type: Optional[str] = Field(default=None, max_length=100)
    established: Optional[str] = Field(default=None, max_length=20)
    ranking: Optional[str] = Field(default=None, max_length=255)
    global_rank: Optional[str] = Field(default=None, max_length=255)
    acceptance_rate: Optional[str] = Field(default=None, max_length=50)
    image: Optional[str] = Field(default=None, max_length=255)
    badge: Optional[str] = Field(default=None, max_length=100)
    overview: Optional[str] = None
    
    courses: Optional[list | dict] = None
    fees: Optional[dict] = None
    timeline: Optional[list | dict] = None
    rules: Optional[dict] = None
    regulations: Optional[dict] = None
    campus_life: Optional[dict] = None

class UniversityOut(UniversityCreate):
    class Config:
        from_attributes = True
