from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: str
    name: str
    description: str
    category: str

class ProductListResponse(BaseModel):
    products: List[Product]
