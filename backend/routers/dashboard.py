from fastapi import APIRouter

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)

# -----------------------------
# 1. KPI Summary
# -----------------------------
@router.get("/summary")
def get_summary():
    return {
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


# -----------------------------
# 2. GHG Breakdown
# -----------------------------
@router.get("/ghg-breakdown")
def get_ghg_breakdown():
    return {
        "total_tco2e_per_year": 510000000,
        "sources": [
            {"name": "waste_avoidance", "tco2e_per_year": 180000000},
            {"name": "food_loss", "tco2e_per_year": 110000000},
            {"name": "soil_carbon", "tco2e_per_year": 70000000},
            {"name": "fertilizer_reduction", "tco2e_per_year": 40000000},
            {"name": "livestock_methane", "tco2e_per_year": 30000000},
            {"name": "rice_methane", "tco2e_per_year": 20000000},
            {"name": "biomass_increase", "tco2e_per_year": 15000000},
            {"name": "others", "tco2e_per_year": 5000000}
        ]
    }


# -----------------------------
# 3. PBPE Issuance
# -----------------------------
@router.get("/pbpe")
def get_pbpe():
    return {
        "total_pbpe_per_year": 620000000,
        "components": {
            "carbon_pbpe": 510000000,
            "soil_pbpe": 60000000,
            "water_pbpe": 30000000,
            "health_pbpe": 20000000
        }
    }


# -----------------------------
# 4. PBPE Value Flywheel
# -----------------------------
@router.get("/flywheel")
def get_flywheel():
    return {
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


# -----------------------------
# 5. PBPE Credits Market
# -----------------------------
@router.get("/credits/market")
def get_credits_market():
    return {
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


# -----------------------------
# 6. PBPE-backed Bonds
# -----------------------------
@router.get("/finance/bonds")
def get_bonds():
    return {
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


# -----------------------------
# 7. Enterprise Usage
# -----------------------------
@router.get("/enterprise/usage")
def get_enterprise_usage():
    return {
        "companies_onboarded": 128,
        "countries": 22,
        "sectors": ["food", "retail", "finance", "logistics"],
        "scope3_reports_linked": 74
    }
