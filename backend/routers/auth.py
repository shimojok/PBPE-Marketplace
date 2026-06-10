from fastapi import APIRouter, HTTPException
from backend.models.user import User
from backend.utils.jwt import create_token


router = APIRouter()

# 仮ユーザー（MVP）
FAKE_USER = User(
    user_id="USER-001",
    email="test@example.com",
    password="password123"
)

class LoginRequest(User):
    pass

class LoginResponse(BaseModel):
    token: str
    user_id: str


@router.post("/auth/login", response_model=LoginResponse)
def login(req: LoginRequest):
    if req.email != FAKE_USER.email or req.password != FAKE_USER.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(FAKE_USER.user_id)
    return LoginResponse(token=token, user_id=FAKE_USER.user_id)
