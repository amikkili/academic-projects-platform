# Backend – Quick Start

## 1. Create a virtual environment (first time only)
```
cd backend
python -m venv venv
```

## 2. Activate it
Windows PowerShell:
```
.\venv\Scripts\Activate.ps1
```

Windows CMD:
```
venv\Scripts\activate.bat
```

## 3. Install dependencies (first time only)
```
pip install -r requirements.txt
```

## 4. Run the server
From the project root (one level above backend/):
```
python -m uvicorn backend.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs
Health:   http://localhost:8000/api/health

## Notes
- SQLite database created automatically as `backend/academicode.db`
- Frontend must run on localhost:5173 (Vite default) for CORS to work
