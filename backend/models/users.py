from pydantic import BaseModel

# 認証で使うユーザーモデル（統一版）
class User(BaseModel):
    id: int | None = None
    email: str
    password: str
