from pydantic import BaseModel

class User(BaseModel):
    user_id: str
    email: str
    password: str  # 実運用ではハッシュ化
    
class UserRegisterRequest(BaseModel):
    company_name: str
    email: str

class AuthRequest(BaseModel):
    api_key: str

class AuthResponse(BaseModel):
    token: str
