from fastapi import APIRouter
from models.credits import (
    KPIPayload,
    CreditPriceResponse,
    CreditPurchaseRequest,
    CreditPurchaseResponse,
    CreditSellRequest,
    CreditSellResponse,
    CreditPortfolio,
)

router = APIRouter()


def _impact_quality(kpi: KPIPayload) -> float:
    # シンプルな重み付きスコア（必要に応じて調整）
    return (
        0.25 * (kpi.ghg_reduction_tco2e or 0)
        + 0.15 * (kpi.delta_c_tc or 0)
        + 0.15 * (kpi.disease_reduction_pct or 0)
        + 0.15 * (kpi.food_loss_reduction_t or 0)
        + 0.15 * (kpi.quality_score or 0)
        + 0.15 * (kpi.stability_index or 0)
    )


def _base_prices() -> CreditPriceResponse:
    # デフォルト価格（USD）
    return CreditPriceResponse(
        Biosecurity=14.0,
        Carbon=10.0,
        FoodLoss=9.0,
        Quality=8.0,
        Stability=7.0,
    )


@router.get("/price", response_model=CreditPriceResponse)
def get_credit_prices(
    demand_index: float = 0.5,
    liquidity_index: float = 0.5,
    volatility_index: float = 0.3,
):
    base = _base_prices()
    adj = 1.0 + 0.3 * demand_index + 0.2 * liquidity_index - 0.2 * volatility_index

    return CreditPriceResponse(
        Biosecurity=base.Biosecurity * adj,
        Carbon=base.Carbon * adj,
        FoodLoss=base.FoodLoss * adj,
        Quality=base.Quality * adj,
        Stability=base.Stability * adj,
    )


@router.post("/buy", response_model=CreditPurchaseResponse)
def buy_credits(req: CreditPurchaseRequest):
    prices = _base_prices()
    impact_q = _impact_quality(req.kpi)

    # Price = θ1 * ImpactQuality + θ2 * Demand + θ3 * Liquidity + θ4 * VerificationLevel
    # ここでは ImpactQuality のみを簡易反映（スケールを圧縮）
    factor = 1.0 + min(impact_q / 1_000_000.0, 0.5)

    issued = {}
    total_cost = 0.0

    for ctype in req.credit_types:
        if ctype.lower() == "carbon":
            price = prices.Carbon * factor
        elif ctype.lower() == "biosecurity":
            price = prices.Biosecurity * factor
        elif ctype.lower() == "food_loss":
            price = prices.FoodLoss * factor
        elif ctype.lower() == "quality":
            price = prices.Quality * factor
        elif ctype.lower() == "stability":
            price = prices.Stability * factor
        else:
            continue

        amount = impact_q / 1000.0  # 仮の発行量ロジック
        issued[ctype] = amount
        total_cost += amount * price

    return CreditPurchaseResponse(
        credits_issued=issued,
        total_cost_usd=total_cost,
    )


@router.post("/sell", response_model=CreditSellResponse)
def sell_credits(req: CreditSellRequest):
    prices = _base_prices()
    if req.type.lower() == "carbon":
        price = prices.Carbon
    elif req.type.lower() == "biosecurity":
        price = prices.Biosecurity
    elif req.type.lower() == "food_loss":
        price = prices.FoodLoss
    elif req.type.lower() == "quality":
        price = prices.Quality
    elif req.type.lower() == "stability":
        price = prices.Stability
    else:
        price = 0.0

    total_return = req.amount_pbpe * price
    return CreditSellResponse(
        transaction_id="TX-CRED-0001",
        total_return_usd=total_return,
    )


@router.get("/portfolio", response_model=CreditPortfolio)
def get_credit_portfolio():
    return CreditPortfolio(
        credits=[
            {"type": "carbon", "amount_pbpe": 100000.0, "value_usd": 1_000_000.0},
            {"type": "biosecurity", "amount_pbpe": 50000.0, "value_usd": 700_000.0},
        ]
    )
