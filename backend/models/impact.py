from pydantic import BaseModel

class Scope3Response(BaseModel):
    scope3_reduction_tco2e: float
    delta_c_tc: float
    verification_level: str
