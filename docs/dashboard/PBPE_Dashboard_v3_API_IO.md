# PBPE Dashboard v3 – API I/O Specification

This document defines the input/output contracts for PBPE Dashboard v3,  
based on existing PBPE Marketplace and Finance APIs.

---

## 1. Endpoints Used by Dashboard v3

- `GET /dashboard/summary`
- `GET /dashboard/ghg-breakdown`
- `GET /dashboard/pbpe`
- `GET /dashboard/flywheel`
- `GET /dashboard/credits/market`
- `GET /dashboard/finance/bonds`
- `GET /dashboard/enterprise/usage`
- `GET /impact/scope3`
- `GET /finance/bonds`
- `GET /finance/bonds/price`

---

## 2. Response Schemas (Dashboard Layer)

### 2.1 GET `/dashboard/summary`

```json
{
  "units": 54850,
  "waste_processed_t_per_year": 200000000,
  "ghg_reduction_tco2e_per_year": 510000000,
  "pbpe_issued_per_year": 620000000,
  "pbpe_price_usd": 10.0,
  "pbpe_market_value_usd_per_year": 6200000000,
  "green_premium_jpy_per_year": -22500000000000,
  "roi_percent_per_year": 344,
  "payback_months": 3.5,
  "scope3_reduction_tco2e_per_year": 180000000
}
````

### 2.2 GET `/dashboard/ghg-breakdown`

```json
{
  "total_tco2e_per_year": 510000000,
  "sources": [
    { "name": "waste_avoidance", "tco2e_per_year": 180000000 },
    { "name": "food_loss", "tco2e_per_year": 110000000 },
    { "name": "soil_carbon", "tco2e_per_year": 70000000 },
    { "name": "fertilizer_reduction", "tco2e_per_year": 40000000 },
    { "name": "livestock_methane", "tco2e_per_year": 30000000 },
    { "name": "rice_methane", "tco2e_per_year": 20000000 },
    { "name": "biomass_increase", "tco2e_per_year": 15000000 },
    { "name": "others", "tco2e_per_year": 5000000 }
  ]
}
```

### 2.3 GET `/dashboard/pbpe`

```json
{
  "total_pbpe_per_year": 620000000,
  "components": {
    "carbon_pbpe": 510000000,
    "soil_pbpe": 60000000,
    "water_pbpe": 30000000,
    "health_pbpe": 20000000
  }
}
```

### 2.4 GET `/dashboard/flywheel`

```json
{
  "investment_jpy_per_year": 2740000000000,
  "ecosystem_improvement_index": 0.82,
  "productivity_index": 1.9,
  "pbpe_issued_per_year": 620000000,
  "value_distribution": {
    "farmers_jpy": 800000000000,
    "enterprises_jpy": 1200000000000,
    "governments_jpy": 600000000000
  },
  "economic_return_jpy_per_year": 9400000000000,
  "reinvestment_rate": 0.35
}
```

### 2.5 GET `/dashboard/credits/market`

```json
{
  "credits": [
    {
      "type": "carbon",
      "volume_pbpe": 510000000,
      "price_usd": 10.0,
      "value_usd": 5100000000
    },
    {
      "type": "biosecurity",
      "volume_pbpe": 30000000,
      "price_usd": 14.0,
      "value_usd": 420000000
    },
    {
      "type": "food_loss",
      "volume_pbpe": 40000000,
      "price_usd": 9.0,
      "value_usd": 360000000
    },
    {
      "type": "quality",
      "volume_pbpe": 40000000,
      "price_usd": 8.0,
      "value_usd": 320000000
    }
  ]
}
```

### 2.6 GET `/dashboard/finance/bonds`

```json
{
  "bonds": [
    {
      "id": "PBPE-GLOBAL-2035",
      "outstanding_usd": 1500000000,
      "coupon_percent": 4.2,
      "linked_to": {
        "pbpe_floor": 400000000,
        "ghg_reduction_floor_tco2e": 300000000
      },
      "maturity_year": 2035
    }
  ]
}
```

### 2.7 GET `/dashboard/enterprise/usage`

```json
{
  "companies_onboarded": 128,
  "countries": 22,
  "sectors": ["food", "retail", "finance", "logistics"],
  "scope3_reports_linked": 74
}
```

---

## 3. Supporting Endpoints (Finance / Impact)

### 3.1 GET `/impact/scope3`

```json
{
  "scope3_reduction_tco2e": 180000000,
  "delta_c_tc": 12000000,
  "verification_level": "Level 3 – Evidence + KPI + Marketplace Audit"
}
```

### 3.2 GET `/finance/bonds`

```json
{
  "bonds": [
    {
      "bond_id": "PBPE-GLOBAL-2035",
      "currency": "USD",
      "notional": 1500000000,
      "maturity_year": 2035,
      "base_coupon_percent": 2.0,
      "pbpe_floor": 400000000,
      "pbpe_target": 600000000,
      "impact_floor_tco2e": 300000000,
      "coupon_min_percent": 1.0,
      "coupon_max_percent": 6.0
    }
  ]
}
```

### 3.3 GET `/finance/bonds/price`

```json
{
  "bond_id": "PBPE-GLOBAL-2035",
  "yield_percent": 4.2,
  "price_percent_of_par": 102.5
}
```

---

## 4. Frontend Integration Notes

- All responses are **read‑only** for Dashboard v3.
- Authentication:
    - API key or token from `/users/auth`
- Recommended polling:
    - Dashboard: 1–5 minutes for market data
    - Impact: hourly or daily

---

PBPE Dashboard v3 consumes PBPE Marketplace and Finance APIs  
to render a unified planetary value view.

