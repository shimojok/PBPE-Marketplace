from fastapi import APIRouter
from models.products import Product, ProductListResponse

router = APIRouter()

@router.get("/list", response_model=ProductListResponse)
def list_products():
    products = [
        Product(
            id="BSC",
            name="Biosecurity Credits",
            description="Credits for disease suppression and biosecurity improvements.",
            category="Credits",
        ),
        Product(
            id="PCC",
            name="PBPE Carbon Credits",
            description="Credits for CO2e reduction and soil carbon increase.",
            category="Credits",
        ),
    ]
    return ProductListResponse(products=products)
