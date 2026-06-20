from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ---------- FastAPIアプリケーションの初期化 ----------
app = FastAPI(
    title="PBPE Marketplace API",
    description="Backend API for PBPE Marketplace Dashboard",
    version="1.0.0"
)

# ---------- CORS設定（Vercelなどからのアクセスを許可） ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切なオリジンに制限すること
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- ルートエンドポイント ----------
@app.get("/")
def root():
    return {"message": "PBPE Marketplace API is running"}

# ---------- ダッシュボード用KPIエンドポイント ----------
@app.get("/dashboard/summary")
def get_dashboard_summary():
    """
    KPIサマリーデータを返すエンドポイント
    """
    return {
        "ghg_reduction_tco2e_per_year": 465000000,
        "units": 54850,
        "pbpe_issued_per_year": 620000000,
        "pbpe_price_usd": 10.0,
        "pbpe_market_value_usd_per_year": 6200000000,
        "green_premium_jpy_per_year": -9430000000000,
        "roi_percent_per_year": 344,
        "payback_months": 4,
        "scope3_reduction_tco2e_per_year": 200000000,
        "companies_onboarded": 120,
        "countries": 15,
        "scope3_reports_linked": 85
    }