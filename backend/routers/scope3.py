from fastapi import APIRouter, Depends
from backend.core.auth_middleware import require_auth

router = APIRouter(prefix="/scope3")

@router.post("/convert")
def convert_scope3(req: dict, user_id: str = Depends(require_auth)):
    return {"message": "OK", "user": user_id}
