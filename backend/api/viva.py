from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional

from ..ml.viva_gen import generate_viva, PROJECT_CONCEPTS

router = APIRouter(prefix="/viva", tags=["viva"])


class VivaRequest(BaseModel):
    project_id: str
    difficulty: str = Field(default="easy", pattern="^(easy|medium|hard)$")
    count: int = Field(default=8, ge=1, le=20)
    user_seed: Optional[str] = "anonymous"


class VivaQuestion(BaseModel):
    q: str
    a: str
    concept: str
    difficulty: str


class VivaResponse(BaseModel):
    project_id: str
    difficulty: str
    questions: list[VivaQuestion]


@router.post("/generate", response_model=VivaResponse)
def generate_questions(body: VivaRequest):
    seed = body.user_seed or "anonymous"
    questions = generate_viva(
        project_id=body.project_id,
        difficulty=body.difficulty,
        count=body.count,
        user_seed=seed,
    )
    return VivaResponse(
        project_id=body.project_id,
        difficulty=body.difficulty,
        questions=[VivaQuestion(**q) for q in questions],
    )


@router.get("/concepts/{project_id}")
def list_concepts(project_id: str):
    """Return the concept list for a given project (for debugging / UI display)."""
    concepts = PROJECT_CONCEPTS.get(project_id)
    if concepts is None:
        return {"project_id": project_id, "concepts": [], "supported": False}
    return {
        "project_id": project_id,
        "concepts": [c for c, _ in concepts],
        "supported": True,
    }
