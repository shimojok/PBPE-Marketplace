import jwt
from datetime import datetime, timedelta

SECRET_KEY = "PBPE-MARKETPLACE-SECRET"
ALGORITHM = "HS256"

def create_token(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(hours=12),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded["sub"]
    except Exception:
        return None
