from pydantic import BaseModel
from typing import List


class InsuranceProduct(BaseModel):
    id: str
    name: str
    description: str
    coverage_type: str  # "biosecurity", "yield", "climate"


class InsuranceProductList(BaseModel):
    products: List[InsuranceProduct]


class InsuranceQuoteRequest(BaseModel):
    farm_id: str
    region: str
    biosecurity_risk: float
    yield_volatility: float
    stability_index: float
    coverage_type: str


class InsuranceQuoteResponse(BaseModel):
    premium_usd_per_year: float
    coverage_limit_usd: float
    deductible_usd: float


class InsurancePolicy(BaseModel):
    policy_id: str
    product_id: str
    premium_usd_per_year: float
    coverage_limit_usd: float
    status: str


class InsurancePolicyList(BaseModel):
    policies: List[InsurancePolicy]
