from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.db import get_db
from ..database.models import SiteStat

router = APIRouter(prefix="/stats", tags=["stats"])

VISITOR_KEY = "visitor_count"

def _get_or_create(db: Session) -> SiteStat:
    row = db.query(SiteStat).filter(SiteStat.key == VISITOR_KEY).first()
    if not row:
        row = SiteStat(key=VISITOR_KEY, value=0)
        db.add(row)
        db.commit()
        db.refresh(row)
    return row


@router.get("/visitors")
def get_visitors(db: Session = Depends(get_db)):
    row = _get_or_create(db)
    return {"count": row.value}


@router.post("/visitors/ping")
def ping_visitor(db: Session = Depends(get_db)):
    """Increment visitor count. Frontend deduplicates via localStorage."""
    row = _get_or_create(db)
    row.value += 1
    db.commit()
    return {"count": row.value}
