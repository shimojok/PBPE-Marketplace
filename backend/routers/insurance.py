from fastapi import APIRouter
from backend.models.insurance import (
    InsuranceProduct,
    InsuranceProductList,
    InsuranceQuoteRequest,
    InsuranceQuoteResponse,
    InsurancePolicy,
    InsurancePolicyList,
)

router = APIRouter()


@router.get("/insurance/products", response_model=InsuranceProductList)
def list_insurance_products():
    products = [
        InsuranceProduct(
            id="BIOSECURE-01",
            name="Biosecurity Stability Cover",
            description="Covers losses from disease outbreaks mitigated by MBT55.",
            coverage_type="biosecurity",
        ),
        InsuranceProduct(
            id="YIELD-01",
            name="Yield Stability Cover",
            description="Covers yield volatility under climate and soil stress.",
            coverage_type="yield",
        ),
    ]
    return InsuranceProductList(products=products)


@router.post("/insurance/quote", response_model=InsuranceQuoteResponse)
def get_insurance_quote(req: InsuranceQuoteRequest):
    base = 10000.0
    premium = (
        base
        + 2000.0 * req.biosecurity_risk
        + 1500.0 * req.yield_volatility
        - 3000.0 * req.stability_index
    )
    premium = max(premium, 1000.0)
    return InsuranceQuoteResponse(
        premium_usd_per_year=premium,
        coverage_limit_usd=500000.0,
        deductible_usd=5000.0,
    )


@router.get("/insurance/policies", response_model=InsurancePolicyList)
def list_policies():
    policies = [
        InsurancePolicy(
            policy_id="POL-0001",
            product_id="BIOSECURE-01",
            premium_usd_per_year=12000.0,
            coverage_limit_usd=500000.0,
            status="active",
        )
    ]
    return InsurancePolicyList(policies=policies)
