from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.db import engine
from .database.models import Base
from .api import auth, marks, resume, viva, ppt

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AcademiCode API", version="1.0.0")

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://129-154-254-119.sslip.io",
    # Add your Vercel/Netlify frontend URL here when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,   prefix="/api")
app.include_router(marks.router,  prefix="/api")
app.include_router(resume.router, prefix="/api")
app.include_router(viva.router,   prefix="/api")
app.include_router(ppt.router,    prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
