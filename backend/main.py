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