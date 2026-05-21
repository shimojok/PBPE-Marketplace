from fastapi import FastAPI
from routers import credits, impact, users, products

app = FastAPI(
    title="PBPE Marketplace API",
    version="1.0.0",
    description="PBPE Credits, Impact, and Marketplace API"
)

app.include_router(credits.router, prefix="/credits", tags=["credits"])
app.include_router(impact.router, prefix="/impact", tags=["impact"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
