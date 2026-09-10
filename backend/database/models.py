from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from .db import Base

def now():
    return datetime.now(timezone.utc)


class MarksEntry(Base):
    """One row per subject per user. data_json stores the component breakdown."""
    __tablename__ = "ac_marks_entries"
    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(String(36), nullable=False, index=True)   # Supabase UUID
    subject     = Column(String(200), nullable=False)
    data_json   = Column(Text, nullable=False)
    total_marks = Column(Integer, default=50)
    updated_at  = Column(DateTime, default=now, onupdate=now)


class ResumeEntry(Base):
    """One saved resume per user."""
    __tablename__ = "ac_resume_entries"
    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(String(36), nullable=False, index=True)  # Supabase UUID
    title        = Column(String(300), nullable=False)
    mode         = Column(String(20), default="fresher")
    skills       = Column(Text, nullable=False)
    years_exp    = Column(String(20), default="0")
    input_json   = Column(Text, nullable=False)
    bullets_json = Column(Text, nullable=False)
    summary      = Column(Text, default="")
    created_at   = Column(DateTime, default=now)
    updated_at   = Column(DateTime, default=now, onupdate=now)


class Payment(Base):
    """One row per Razorpay order. Status: created → paid | failed."""
    __tablename__ = "ac_payments"
    id                  = Column(Integer, primary_key=True, index=True)
    user_id             = Column(String(36), nullable=False, index=True)  # Supabase UUID
    plan                = Column(String(20), nullable=False)
    project_id          = Column(String(100), nullable=True)
    amount_paise        = Column(Integer, nullable=False)
    razorpay_order_id   = Column(String(200), unique=True, nullable=False)
    razorpay_payment_id = Column(String(200), nullable=True)
    razorpay_signature  = Column(String(500), nullable=True)
    status              = Column(String(20), default="created")
    created_at          = Column(DateTime, default=now)
    paid_at             = Column(DateTime, nullable=True)


class SiteStat(Base):
    """Single-row counter table. key='visitor_count'."""
    __tablename__ = "ac_site_stats"
    key   = Column(String(50), primary_key=True)
    value = Column(Integer, default=0)
