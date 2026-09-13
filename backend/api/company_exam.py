# -*- coding: utf-8 -*-
"""
company_exam.py  —  FastAPI router for company exam endpoints.
==============================================================
Endpoints:
  GET  /api/company-exam/exams                          list available exams
  POST /api/company-exam/generate                       generate full paper
  GET  /api/company-exam/tcs-nqt/section/{section_id}  one section only
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Relative import works when running via uvicorn from project root
from ..company_exams.assembler import build_paper, _EXAM_REGISTRY

router = APIRouter(tags=["Company Exams"])


# ── Request / Response models ─────────────────────────────────────────────────

class GenerateRequest(BaseModel):
    exam_id:     str = "tcs_nqt"
    master_seed: str                   # unique per student, e.g. roll number


class SectionRequest(BaseModel):
    master_seed: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/company-exam/exams")
def list_exams():
    """List all available company exams."""
    return {
        "exams": [
            {
                "id":    exam_id,
                "name":  cfg["name"],
                "body":  cfg["body"],
                "total_questions": cfg["total_questions"],
                "total_time_mins": cfg["total_time_mins"],
                "sections": [
                    {"id": s["id"], "label": s["label"], "time_mins": s["time_mins"],
                     "question_count": sum(t["count"] for t in s["topics"])}
                    for s in cfg["sections"]
                ],
            }
            for exam_id, cfg in _EXAM_REGISTRY.items()
        ]
    }


@router.post("/company-exam/generate")
def generate_paper(req: GenerateRequest):
    """
    Generate a complete exam paper for one student.
    Same master_seed always returns the same paper (deterministic).
    Different students → different seeds → different questions.
    """
    try:
        paper = build_paper(exam_id=req.exam_id, master_seed=req.master_seed)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Paper generation failed: {e}")
    return paper


@router.post("/company-exam/{exam_id}/section/{section_id}")
def generate_section(exam_id: str, section_id: str, req: SectionRequest):
    """
    Return only one section of a paper (useful for section-by-section delivery).
    """
    try:
        paper = build_paper(exam_id=exam_id, master_seed=req.master_seed)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    section = next((s for s in paper["sections"] if s["id"] == section_id), None)
    if not section:
        raise HTTPException(
            status_code=404,
            detail=f"Section '{section_id}' not found in exam '{exam_id}'."
        )
    return {
        "exam_id":      paper["exam_id"],
        "master_seed":  paper["master_seed"],
        "section":      section,
        "correct_marks":  paper["correct_marks"],
        "negative_marks": paper["negative_marks"],
    }
