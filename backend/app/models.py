from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.sql import func

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="user", nullable=False)  # "user" or "admin"
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    interested_course = Column(String(120), nullable=True)
    message = Column(Text, nullable=True)
    is_reviewed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    image = Column(String(255), nullable=True)
    color = Column(String(50), nullable=True)
    display_order = Column(Integer, default=0)
    items = Column(JSON, nullable=True)


class University(Base):
    __tablename__ = "universities"

    id = Column(String(150), primary_key=True, index=True)  # slug
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    location = Column(String(255), nullable=True)
    state = Column(String(50), nullable=True)
    type = Column(String(100), nullable=True)
    established = Column(String(20), nullable=True)
    ranking = Column(String(255), nullable=True)
    global_rank = Column(String(255), nullable=True)
    acceptance_rate = Column(String(50), nullable=True)
    image = Column(String(255), nullable=True)
    badge = Column(String(100), nullable=True)
    overview = Column(Text, nullable=True)
    
    courses = Column(JSON, nullable=True)
    fees = Column(JSON, nullable=True)
    timeline = Column(JSON, nullable=True)
    rules = Column(JSON, nullable=True)
    regulations = Column(JSON, nullable=True)
    campus_life = Column(JSON, nullable=True)
