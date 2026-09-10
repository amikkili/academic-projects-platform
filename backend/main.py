from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.db import engine
from .database.models import Base
from .api import auth, marks, resume

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AcademiCode API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,   prefix="/api")
app.include_router(marks.router,  prefix="/api")
app.include_router(resume.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
