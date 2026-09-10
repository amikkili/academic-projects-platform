from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .db import Base

def now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    id             = Column(Integer, primary_key=True, index=True)
    name           = Column(String(120), nullable=False)
    email          = Column(String(200), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    created_at     = Column(DateTime, default=now)

    marks_entries  = relationship("MarksEntry",  back_populates="user", cascade="all, delete")
    resume_entries = relationship("ResumeEntry", back_populates="user", cascade="all, delete")


class MarksEntry(Base):
    """One row per subject per user. data_json stores the component breakdown."""
    __tablename__ = "marks_entries"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    subject    = Column(String(200), nullable=False)
    data_json  = Column(Text, nullable=False)   # JSON string of marks components
    total_marks = Column(Integer, default=50)
    updated_at = Column(DateTime, default=now, onupdate=now)

    user = relationship("User", back_populates="marks_entries")


class ResumeEntry(Base):
    """One saved resume per user per title."""
    __tablename__ = "resume_entries"
    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)
    title       = Column(String(300), nullable=False)
    mode        = Column(String(20), default="fresher")   # fresher | exp
    skills      = Column(Text, nullable=False)            # comma-separated
    years_exp   = Column(String(20), default="0")
    input_json  = Column(Text, nullable=False)            # full form JSON
    bullets_json = Column(Text, nullable=False)           # generated bullets JSON
    summary     = Column(Text, default="")
    created_at  = Column(DateTime, default=now)
    updated_at  = Column(DateTime, default=now, onupdate=now)

    user = relationship("User", back_populates="resume_entries")
