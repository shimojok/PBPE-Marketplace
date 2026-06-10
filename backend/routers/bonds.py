from fastapi import APIRouter
from backend.models.bonds import (
    Bond,
    BondListResponse,
    BondPriceResponse,
    BondPortfolioItem,
    BondPortfolioResponse,
)

router = APIRouter()

# Placeholder in-memory bond definition
SAMPLE_BOND = Bond(
    bond_id="PBPE-GLOBAL-2035",
    currency="USD",
    notional=1_500_000_000,
    maturity_year=2035,
    base_coupon_percent=2.0,
    pbpe_floor=400_000_000,
    pbpe_target=600_000_000,
    impact_floor_tco2e=300_000_000,
    coupon_min_percent=1.0,
    coupon_max_percent=6.0,
)


@router.get("/bonds", response_model=BondListResponse)
def list_bonds():
    return BondListResponse(bonds=[SAMPLE_BOND])


@router.get("/bonds/price", response_model=BondPriceResponse)
def get_bond_price(bond_id: str = "PBPE-GLOBAL-2035"):
    # Placeholder: flat yield and price
    return BondPriceResponse(
        bond_id=bond_id,
        yield_percent=4.2,
        price_percent_of_par=102.5,
    )


@router.get("/bonds/portfolio", response_model=BondPortfolioResponse)
def get_bond_portfolio():
    item = BondPortfolioItem(
        bond_id="PBPE-GLOBAL-2035",
        quantity=10_000_000,
        market_value_usd=10_250_000,
    )
    return BondPortfolioResponse(
        items=[item],
        total_value_usd=item.market_value_usd,
    )


@router.post("/bonds/price", response_model=BondPriceResponse)
def price_bond(req: BondPriceRequest):
    bonds = {b.bond_id: b for b in _sample_bonds()}
    bond = bonds.get(req.bond_id)
    if not bond:
        bond = _sample_bonds()[0]

    y = req.yield_percent / 100.0
    r0 = bond.coupon_percent / 100.0

    pbpe_actual = req.pbpe_actual or bond.pbpe_floor
    impact_actual = req.impact_actual or bond.impact_floor
    pbpe_floor = req.pbpe_floor or bond.pbpe_floor
    impact_floor = req.impact_floor or bond.impact_floor

    alpha = 0.5
    beta = 0.5

    coupon = (
        r0
        + alpha * (pbpe_actual - pbpe_floor) / max(pbpe_floor, 1.0)
        + beta * (impact_actual - impact_floor) / max(impact_floor, 1.0)
    )
    coupon = max(0.0, min(coupon, 0.12))  # 0–12%

    T = bond.maturity_year - 2025
    if T < 1:
        T = 1

    price = 0.0
    for t in range(1, T + 1):
        price += coupon / math.pow(1 + y, t)
    price += 1.0 / math.pow(1 + y, T)

    return BondPriceResponse(
        bond_id=bond.bond_id,
        yield_percent=req.yield_percent,
        price_percent_of_par=price * 100.0,
        coupon_percent_effective=coupon * 100.0,
    )
