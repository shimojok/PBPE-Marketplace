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
        base = 1.0  # placeholder: 1 credit per request type
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
    total_value = sum(
        v for v in holdings.values()
    )  # placeholder, not price-weighted
    return PortfolioResponse(holdings=holdings, total_value_usd=total_value)
