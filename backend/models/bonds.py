from pydantic import BaseModel
from typing import List, Optional


class Bond(BaseModel):
    bond_id: str
    currency: str
    notional: float
    maturity_year: int
    base_coupon_percent: float
    pbpe_floor: float
    pbpe_target: float
    impact_floor_tco2e: float
    coupon_min_percent: float
    coupon_max_percent: float


class BondPerformance(BaseModel):
    bond_id: str
    pbpe_actual: float
    impact_actual_tco2e: float
    coupon_current_percent: float


class BondListResponse(BaseModel):
    bonds: List[Bond]


class BondPriceResponse(BaseModel):
    bond_id: str
    yield_percent: float
    price_percent_of_par: float


class BondPortfolioItem(BaseModel):
    bond_id: str
    quantity: float
    market_value_usd: float


class BondPortfolioResponse(BaseModel):
    items: List[BondPortfolioItem]
    total_value_usd: float
