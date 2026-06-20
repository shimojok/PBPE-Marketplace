from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PBPE Marketplace API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PBPE Marketplace API is running"}

@app.get("/dashboard/summary")
def get_summary():
    return {
        "ghg_reduction_tco2e_per_year": 510000000,
        "units": 54850,
        "pbpe_issued_per_year": 620000000,
        "pbpe_price_usd": 10.0,
        "pbpe_market_value_usd_per_year": 6200000000,
        "green_premium_jpy_per_year": -22500000000000,
        "roi_percent_per_year": 344,
        "payback_months": 3.5,
        "scope3_reduction_tco2e_per_year": 180000000,
        "companies_onboarded": 128,
        "countries": 22,
        "scope3_reports_linked": 74
    }

@app.get("/dashboard/ghg-breakdown")
def get_ghg_breakdown():
    return {
        "total_tco2e_per_year": 510000000,
        "sources": [
            {"name": "Waste Avoidance", "value": 180},
            {"name": "Food Loss", "value": 110},
            {"name": "Soil Carbon", "value": 70},
            {"name": "Fertilizer Reduction", "value": 40},
            {"name": "Livestock Methane", "value": 30},
            {"name": "Rice Methane", "value": 20},
            {"name": "Biomass Increase", "value": 15}
        ]
    }

@app.get("/dashboard/credits/market")
def get_credits_market():
    return {
        "credits": [
            {"type": "Carbon", "volume": 510000000, "price": 10.00, "value": 5100000000},
            {"type": "Biosecurity", "volume": 30000000, "price": 14.00, "value": 420000000},
            {"type": "Food Loss", "volume": 40000000, "price": 9.00, "value": 360000000},
            {"type": "Quality", "volume": 40000000, "price": 8.00, "value": 320000000}
        ]
    }

@app.get("/dashboard/finance/bonds")
def get_bonds():
    return {
        "bonds": [
            {
                "id": "PBPE-GLOBAL-2035",
                "outstanding_usd": 1500000000,
                "coupon_percent": 4.2,
                "linked_to": {"pbpe_floor": 400000000},
                "maturity_year": 2035
            }
        ]
    }

@app.get("/dashboard/enterprise/usage")
def get_enterprise_usage():
    return {
        "companies_onboarded": 128,
        "countries": 22,
        "sectors": ["food", "retail", "finance", "logistics"],
        "scope3_reports_linked": 74,
        "scope3_reduction_tco2e_per_year": 180000000
    }

@app.get("/dashboard/pbpe")
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