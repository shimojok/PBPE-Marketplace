# PBPE Credit Market – Price Formation Model

PBPE Credits:

- Carbon
- Biosecurity
- Food Loss
- Quality
- Stability

---

## 1. Price Formation

$$
\text{Price} = \theta_1 \cdot \text{ImpactQuality}+ \theta_2 \cdot \text{Demand}+ \theta_3 \cdot \text{Liquidity}+ \theta_4 \cdot \text{VerificationLevel}
$$

Where:

- ImpactQuality: PBPE Credits Specification KPIs  
- Demand: enterprise Scope 3 demand  
- Liquidity: traded volume  
- VerificationLevel: MBT55 evidence + KPI + audit  

---

## 2. API Integration

- `GET /credits/price`
- `GET /dashboard/credits/market`

---

## 3. Dynamic Adjustment

Let:

- DemandIndex: 0–1 (enterprise demand)
- LiquidityIndex: 0–1 (volume / depth)
- VolatilityIndex: 0–1 (price stability)

Then:

$$
\text{AdjFactor} = 1+ 0.3 \cdot \text{DemandIndex}+ 0.2 \cdot \text{LiquidityIndex}- 0.2 \cdot \text{VolatilityIndex}
$$

Final price:

$$
\text{Price}_{\text{final}} = \text{BasePrice} \times \text{AdjFactor}
$$

---

## 4. Dynamic Adjustment (Implemented)

API:

- `GET /credits/price?demand_index=&liquidity_index=&volatility_index=`

Adjustment:

$$
\text{AdjFactor} = 1+ 0.3 \cdot \text{DemandIndex}+ 0.2 \cdot \text{LiquidityIndex}- 0.2 \cdot \text{VolatilityIndex}
$$

Final price:

$$
\text{Price}_{\text{final}} = \text{BasePrice} \times \text{AdjFactor}
$$

---

This dynamic adjustment model is implemented in:

- backend/routers/credits.py (`GET /credits/price`)
- frontend MarketView (dynamic price UI)

This ensures PBPE Credits behave as a real market asset with:
- demand-driven pricing
- liquidity sensitivity
- volatility penalty

---
PBPE Credit Market turns verified impact into a transparent, priceable asset class.
