import json
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database.db import get_db
from ..database.models import ResumeEntry, User
from ..ml.resume_gen import generate_bullets
from .auth import get_current_user, SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/resume", tags=["resume"])


# ── Optional auth helper ──────────────────────────────────────────────────────

def _optional_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """Return the logged-in User if a valid Bearer token is present, else None."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization[7:]
    try:
        return get_current_user(token=token, db=db)
    except Exception:
        return None


# ── Schemas ───────────────────────────────────────────────────────────────────

class GenerateIn(BaseModel):
    skills: list[str]
    years_exp: float = 0.0
    max_bullets: Optional[int] = 10

class GenerateOut(BaseModel):
    tier: str
    matched: list[str]
    unmatched: list[str]
    bullets: list[str]
    summary: str

class SaveResumeIn(BaseModel):
    title: str
    mode: str = "fresher"
    skills: list[str]
    years_exp: float = 0.0
    input_data: dict
    bullets: list[str]
    summary: str = ""

class ResumeOut(BaseModel):
    id: int
    title: str
    mode: str
    skills: list[str]
    years_exp: float
    bullets: list[str]
    summary: str

    class Config:
        from_attributes = True


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/generate", response_model=GenerateOut)
def generate(
    body: GenerateIn,
    user: Optional[User] = Depends(_optional_user),
):
    """
    Generate resume bullets.
    When the user is logged in, their user ID seeds the bullet shuffler so
    two users with the same skills get different (but reproducible) bullet subsets.
    Anonymous requests use random shuffling.
    """
    seed = user.id if user else None
    result = generate_bullets(
        body.skills,
        body.years_exp,
        body.max_bullets or 10,
        user_seed=seed,
    )
    return GenerateOut(**result)


@router.get("/", response_model=list[ResumeOut])
def list_resumes(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    entries = (
        db.query(ResumeEntry)
        .filter(ResumeEntry.user_id == user.id)
        .order_by(ResumeEntry.updated_at.desc())
        .all()
    )
    return [_to_out(e) for e in entries]


@router.post("/", response_model=ResumeOut, status_code=201)
def save_resume(
    body: SaveResumeIn,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    entry = ResumeEntry(
        user_id=user.id,
        title=body.title,
        mode=body.mode,
        skills=",".join(body.skills),
        years_exp=str(body.years_exp),
        input_json=json.dumps(body.input_data),
        bullets_json=json.dumps(body.bullets),
        summary=body.summary,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return _to_out(entry)


@router.get("/{entry_id}", response_model=ResumeOut)
def get_resume(
    entry_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    entry = (
        db.query(ResumeEntry)
        .filter(ResumeEntry.id == entry_id, ResumeEntry.user_id == user.id)
        .first()
    )
    if not entry:
        raise HTTPException(status_code=404, detail="Not found")
    return _to_out(entry)


@router.delete("/{entry_id}", status_code=204)
def delete_resume(
    entry_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    entry = (
        db.query(ResumeEntry)
        .filter(ResumeEntry.id == entry_id, ResumeEntry.user_id == user.id)
        .first()
    )
    if not entry:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(entry)
    db.commit()


def _to_out(e: ResumeEntry) -> ResumeOut:
    return ResumeOut(
        id=e.id,
        title=e.title,
        mode=e.mode,
        skills=[s.strip() for s in e.skills.split(",") if s.strip()],
        years_exp=float(e.years_exp or 0),
        bullets=json.loads(e.bullets_json or "[]"),
        summary=e.summary or "",
    )
