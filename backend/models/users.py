from pydantic import BaseModel

# 実際のユーザー情報（DBに保存される想定）
class User(BaseModel):
    id: int | None = None
    email: str
    password: str  # 実運用ではハッシュ化

# 新規登録用
class UserRegisterRequest(BaseModel):
    company_name: str
    email: str

# 認証リクエスト
class AuthRequest(BaseModel):
    email: str
    password: str

# 認証レスポンス
class AuthResponse(BaseModel):
    token: str
