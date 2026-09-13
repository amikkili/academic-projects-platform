from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.db import engine
from .database.models import Base
from .api import marks, resume, viva, ppt, payments, stats, company_exam

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AcademiCode API", version="2.0.0")

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://129-154-254-119.sslip.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(marks.router,    prefix="/api")
app.include_router(resume.router,   prefix="/api")
app.include_router(viva.router,     prefix="/api")
app.include_router(ppt.router,      prefix="/api")
app.include_router(payments.router, prefix="/api")
app.include_router(stats.router,         prefix="/api")
app.include_router(company_exam.router,  prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok", "version": "2.0.0"}
