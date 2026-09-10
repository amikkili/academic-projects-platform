from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from typing import Optional

from ..ml.ppt_gen import build_ppt
from ..ml.slide_content import SLIDE_CONTENT

router = APIRouter(prefix="/ppt", tags=["ppt"])

SUPPORTED = list(SLIDE_CONTENT.keys())


@router.get("/{project_id}")
def download_ppt(
    project_id: str,
    name: Optional[str] = "",
    branch: Optional[str] = "",
    year: Optional[str] = "",
):
    """
    Generate and stream a .pptx file for the given project.

    Query params (all optional):
      name   — student name (shown on title slide)
      branch — e.g. B.Tech – CSE
      year   — e.g. 2024-25
    """
    if project_id not in SUPPORTED:
        raise HTTPException(
            status_code=404,
            detail=f"No PPT template for '{project_id}'. Supported: {SUPPORTED}",
        )

    try:
        buf = build_ppt(
            project_id=project_id,
            student_name=name or "",
            branch=branch or "",
            year=year or "",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

    safe_name = project_id.replace("-", "_")
    filename  = f"{safe_name}_project_ppt.pptx"

    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/")
def list_supported():
    """Return all project IDs that have PPT templates."""
    return {"supported": SUPPORTED, "count": len(SUPPORTED)}
