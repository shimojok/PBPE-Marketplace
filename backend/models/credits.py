from pydantic import BaseModel
from typing import Dict, List, Optional

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
