from pydantic import BaseModel

class UserRegisterRequest(BaseModel):
    company_name: str
    email: str

class AuthRequest(BaseModel):
    api_key: str

class AuthResponse(BaseModel):
    token: str
