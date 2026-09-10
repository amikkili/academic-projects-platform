import json
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.db import get_db
from ..database.models import MarksEntry, User
from .auth import get_current_user

router = APIRouter(prefix="/marks", tags=["marks"])


# ── Schemas ────────────────────────────────────────────────────────────────────

class MarksIn(BaseModel):
    subject: str
    data: dict
    total_marks: Optional[int] = 50

class MarksOut(BaseModel):
    id: int
    subject: str
    data: dict
    total_marks: int

    class Config:
        from_attributes = True


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[MarksOut])
def list_marks(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    entries = db.query(MarksEntry).filter(MarksEntry.user_id == user.id).all()
    return [
        MarksOut(id=e.id, subject=e.subject, data=json.loads(e.data_json), total_marks=e.total_marks)
        for e in entries
    ]


@router.post("/", response_model=MarksOut, status_code=201)
def upsert_marks(body: MarksIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    existing = (
        db.query(MarksEntry)
        .filter(MarksEntry.user_id == user.id, MarksEntry.subject == body.subject)
        .first()
    )
    if existing:
        existing.data_json = json.dumps(body.data)
        existing.total_marks = body.total_marks
        db.commit()
        db.refresh(existing)
        return MarksOut(id=existing.id, subject=existing.subject, data=body.data, total_marks=existing.total_marks)

    entry = MarksEntry(
        user_id=user.id,
        subject=body.subject,
        data_json=json.dumps(body.data),
        total_marks=body.total_marks,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return MarksOut(id=entry.id, subject=entry.subject, data=body.data, total_marks=entry.total_marks)


@router.delete("/{entry_id}", status_code=204)
def delete_marks(entry_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    entry = db.query(MarksEntry).filter(MarksEntry.id == entry_id, MarksEntry.user_id == user.id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(entry)
    db.commit()
