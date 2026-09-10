import os
import requests as _req
from types import SimpleNamespace
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

SUPABASE_URL         = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token", auto_error=False)


def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authenticated",
                            headers={"WWW-Authenticate": "Bearer"})
    try:
        resp = _req.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={"Authorization": f"Bearer {token}", "apikey": SUPABASE_SERVICE_KEY},
            timeout=5,
        )
    except _req.RequestException:
        raise HTTPException(status_code=503, detail="Auth service unavailable")

    if resp.status_code != 200:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid or expired token",
                            headers={"WWW-Authenticate": "Bearer"})

    data = resp.json()
    meta = data.get("user_metadata") or {}
    name = meta.get("name") or meta.get("full_name") or data.get("email", "").split("@")[0]
    return SimpleNamespace(id=str(data["id"]), email=data.get("email", ""), name=name)
