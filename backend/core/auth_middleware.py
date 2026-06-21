from fastapi import Header, HTTPException
from core.security import verify_token

def require_auth(token: str = Header(None)):
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user_id
