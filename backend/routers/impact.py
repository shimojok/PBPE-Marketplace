from fastapi import APIRouter
from backend.models.impact import Scope3Response

router = APIRouter()

@router.get("/scope3", response_model=Scope3Response)
def get_scope3():
    return Scope3Response(
        scope3_reduction_tco2e=4.2,
        delta_c_tc=1.1,
        verification_level="Level 3 – Evidence + KPI + Marketplace Audit",
    )
