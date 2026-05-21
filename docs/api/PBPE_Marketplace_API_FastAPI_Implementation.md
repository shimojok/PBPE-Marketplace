# PBPE Marketplace API – FastAPI Implementation  
Version 1.1 – English Edition  
(Updated to include all backend Python files)

This document describes the **complete backend implementation** for the PBPE Marketplace API using FastAPI.

It includes:

- Full directory structure  
- All required Python files  
- Routers  
- Models  
- Example responses  

---

# 1. Directory Structure (Complete)


backend/ ├── main.py ├── routers/ │ ├── credits.py │ ├── impact.py │ ├── users.py │ └── products.py └── models/ ├── credits.py ├── impact.py ├── users.py └── products.py


---

# 2. main.py

```python
from fastapi import FastAPI
from routers import credits, impact, users, products

app = FastAPI(
    title="PBPE Marketplace API",
    version="1.0.0",
    description="PBPE Credits, Impact, and Marketplace API"
)

app.include_router(credits.router, prefix="/credits", tags=["credits"])
app.include_router(impact.router, prefix="/impact", tags=["impact"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
````

---

# 3. Routers

## 3.1 credits.py

```python
from fastapi import APIRouter
from models.credits import (
    CreditPriceResponse,
    CreditPurchaseRequest,
    CreditPurchaseResponse,
    PortfolioResponse,
)

router = APIRouter()

@router.get("/price", response_model=CreditPriceResponse)
def get_credit_prices():
    return CreditPriceResponse(
        Biosecurity=12.5,
        Carbon=38.0,
        FoodLoss=22.0,
        Quality=15.0,
        Stability=9.5,
    )

@router.post("/buy", response_model=CreditPurchaseResponse)
def buy_credits(req: CreditPurchaseRequest):
    prices = get_credit_prices()
    price_map = prices.dict()
    credits_issued = {}
    total_cost = 0.0

    for ctype in req.credit_types:
        base = 1.0
        credits_issued[ctype] = base
        total_cost += base * price_map.get(ctype, 0.0)

    return CreditPurchaseResponse(
        credits_issued=credits_issued,
        total_cost_usd=total_cost,
    )

@router.get("/portfolio", response_model=PortfolioResponse)
def get_portfolio():
    holdings = {
        "Biosecurity": 12.4,
        "Carbon": 4.8,
        "FoodLoss": 1.2,
        "Quality": 3.4,
        "Stability": 2.1,
    }
    total_value = sum(holdings.values())
    return PortfolioResponse(holdings=holdings, total_value_usd=total_value)
```

---

## 3.2 impact.py

```python
from fastapi import APIRouter
from models.impact import Scope3Response

router = APIRouter()

@router.get("/scope3", response_model=Scope3Response)
def get_scope3():
    return Scope3Response(
        scope3_reduction_tco2e=4.2,
        delta_c_tc=1.1,
        verification_level="Level 3 – Evidence + KPI + Marketplace Audit",
    )
```

---

## 3.3 users.py

```python
from fastapi import APIRouter
from models.users import UserRegisterRequest, AuthRequest, AuthResponse

router = APIRouter()

@router.post("/register")
def register_user(req: UserRegisterRequest):
    return {"status": "ok", "company": req.company_name}

@router.post("/auth", response_model=AuthResponse)
def authenticate(req: AuthRequest):
    return AuthResponse(token="pbpe-sample-token")
```

---

## 3.4 products.py

```python
from fastapi import APIRouter
from models.products import Product, ProductListResponse

router = APIRouter()

@router.get("/list", response_model=ProductListResponse)
def list_products():
    products = [
        Product(
            id="BSC",
            name="Biosecurity Credits",
            description="Credits for disease suppression and biosecurity improvements.",
            category="Credits",
        ),
        Product(
            id="PCC",
            name="PBPE Carbon Credits",
            description="Credits for CO2e reduction and soil carbon increase.",
            category="Credits",
        ),
    ]
    return ProductListResponse(products=products)
```

---

# 4. Models

## 4.1 models/credits.py

```python
from pydantic import BaseModel
from typing import Dict, List

class KPIPayload(BaseModel):
    yield_t: float
    revenue_usd: float
    cost_usd: float
    pbpe_value_usd: float
    roi_pct: float
    delta_c_tc: float
    ghg_reduction_tco2e: float
    disease_reduction_pct: float
    food_loss_reduction_t: float
    quality_score: float
    stability_index: float

class CreditPriceResponse(BaseModel):
    Biosecurity: float
    Carbon: float
    FoodLoss: float
    Quality: float
    Stability: float

class CreditPurchaseRequest(BaseModel):
    kpi: KPIPayload
    credit_types: List[str]

class CreditPurchaseResponse(BaseModel):
    credits_issued: Dict[str, float]
    total_cost_usd: float

class PortfolioResponse(BaseModel):
    holdings: Dict[str, float]
    total_value_usd: float
```

---

## 4.2 models/impact.py

```python
from pydantic import BaseModel

class Scope3Response(BaseModel):
    scope3_reduction_tco2e: float
    delta_c_tc: float
    verification_level: str
```

---

## 4.3 models/users.py

```python
from pydantic import BaseModel

class UserRegisterRequest(BaseModel):
    company_name: str
    email: str

class AuthRequest(BaseModel):
    api_key: str

class AuthResponse(BaseModel):
    token: str
```

---

## 4.4 models/products.py

```python
from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: str
    name: str
    description: str
    category: str

class ProductListResponse(BaseModel):
    products: List[Product]
```

---

# ✔ Completed

This document now includes:

- All backend Python files
- Full directory structure
- Complete router & model definitions
- Corrected and expanded implementation
