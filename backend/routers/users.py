from fastapi import APIRouter
from backend.models.users import UserRegisterRequest, AuthRequest, AuthResponse

router = APIRouter()

@router.post("/register")
def register_user(req: UserRegisterRequest):
    return {"status": "ok", "company": req.company_name}

@router.post("/auth", response_model=AuthResponse)
def authenticate(req: AuthRequest):
    # placeholder token
    return AuthResponse(token="pbpe-sample-token")
