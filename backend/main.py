from fastapi import FastAPI
from routers import (
    credits,
    impact,
    users,
    products,
    dashboard,
    bonds,
    insurance,
    scope3,
    registry,   # ← PBPE Registry（Layer 5）
)

app = FastAPI(
    title="PBPE Marketplace API",
    version="1.0.0",
    description="PBPE Credits, Impact, Marketplace, Bonds, Insurance, Scope3, and Registry API"
)

# -----------------------------
# Routers (PBPE Marketplace)
# -----------------------------
app.include_router(credits.router,   prefix="/credits",   tags=["credits"])
app.include_router(impact.router,    prefix="/impact",    tags=["impact"])
app.include_router(users.router,     prefix="/users",     tags=["users"])
app.include_router(products.router,  prefix="/products",  tags=["products"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(bonds.router,     prefix="/finance",   tags=["bonds"])
app.include_router(insurance.router, prefix="/finance",   tags=["insurance"])
app.include_router(scope3.router,    prefix="/scope3",    tags=["scope3"])

# -----------------------------
# PBPE Registry（Layer 5）
# -----------------------------
app.include_router(registry.router, prefix="/registry", tags=["registry"])
