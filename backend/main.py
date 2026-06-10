from fastapi import FastAPI
from backend.routers import credits, impact, users, products, dashboard, bonds, insurance

app = FastAPI(
    title="PBPE Marketplace API",
    version="1.0.0",
    description="PBPE Credits, Impact, Marketplace, Bonds, and Dashboard API"
)

app.include_router(credits.router, prefix="/credits", tags=["credits"])
app.include_router(impact.router, prefix="/impact", tags=["impact"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(bonds.router, prefix="/finance", tags=["bonds"])
app.include_router(insurance.router, prefix="/finance", tags=["insurance"])

