"""
PBPE Credits API Router
(PBPE Marketplace – Credits Layer)

This router handles:
- PBPE Credit issuance
- PBPE Credit retirement
- PBPE Credit balance tracking
- Automatic Registry + Blockchain recording
- Double-counting prevention

This is the backbone of PBPE Marketplace.
"""

from __future__ import annotations

import time
from typing import Dict, List

from fastapi import APIRouter, HTTPException

from utils.identifier import generate_pbpe_id, IdKind
from blockchain.ledger import registry_ledger

router = APIRouter(
    prefix="/credits",
    tags=["credits"],
)

# In-memory store (replace with DB later)
CREDITS: Dict[str, Dict] = {}  # CRD-ID → { amount_issued, amount_retired, owner, kpi_id }


# ---------------------------------------------------------
# Utility
# ---------------------------------------------------------

def get_credit_or_404(crd_id: str) -> Dict:
    if crd_id not in CREDITS:
        raise HTTPException(status_code=404, detail="Credit not found")
    return CREDITS[crd_id]


# ---------------------------------------------------------
# Issue PBPE Credit
# ---------------------------------------------------------

@router.post("/issue", response_model=dict)
def issue_credit(
    kpi_id: str,
    amount_pbpe: float,
    owner: str,
):
    """
    Issue PBPE Credits from a KPI result.

    Double-counting prevention:
    - A KPI-ID can only be used once to issue PBPE Credits.
    """

    # Check if KPI-ID already used
    for crd in CREDITS.values():
        if crd["kpi_id"] == kpi_id:
            raise HTTPException(
                status_code=400,
                detail="PBPE Credits already issued for this KPI-ID (double issuance prevented)",
            )

    # Generate CRD-ID
    crd_id = generate_pbpe_id(IdKind.CRD)

    # Store credit
    CREDITS[crd_id] = {
        "kpi_id": kpi_id,
        "amount_issued": amount_pbpe,
        "amount_retired": 0.0,
        "owner": owner,
        "created_at": time.time(),
    }

    # Record in Registry + Blockchain
    entry = registry_ledger.create_and_record(
        kind="credit_issuance",
        subject_id=crd_id,
        actor=owner,
        amount=amount_pbpe,
        unit="PBPE",
        timestamp=time.time(),
    )

    return {
        "crd_id": crd_id,
        "kpi_id": kpi_id,
        "amount_issued": amount_pbpe,
        "owner": owner,
        "registry_entry": entry.id,
        "chain_hash": entry.chain_hash,
    }


# ---------------------------------------------------------
# Retire PBPE Credit
# ---------------------------------------------------------

@router.post("/retire", response_model=dict)
def retire_credit(
    crd_id: str,
    amount: float,
    actor: str,
):
    """
    Retire PBPE Credits.

    Double-counting prevention:
    - Cannot retire more than issued - already retired.
    """

    credit = get_credit_or_404(crd_id)

    available = credit["amount_issued"] - credit["amount_retired"]
    if amount > available:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot retire {amount}. Only {available} PBPE available (double retirement prevented).",
        )

    # Update retirement
    credit["amount_retired"] += amount

    # Record in Registry + Blockchain
    entry = registry_ledger.create_and_record(
        kind="credit_retirement",
        subject_id=crd_id,
        actor=actor,
        amount=amount,
        unit="PBPE",
        timestamp=time.time(),
    )

    return {
        "crd_id": crd_id,
        "retired": amount,
        "retired_total": credit["amount_retired"],
        "registry_entry": entry.id,
        "chain_hash": entry.chain_hash,
    }


# ---------------------------------------------------------
# Get Credit Info
# ---------------------------------------------------------

@router.get("/{crd_id}", response_model=dict)
def get_credit(crd_id: str):
    """
    Get PBPE Credit details.
    """
    credit = get_credit_or_404(crd_id)
    return {
        "crd_id": crd_id,
        **credit,
    }


# ---------------------------------------------------------
# List All Credits
# ---------------------------------------------------------

@router.get("/", response_model=List[dict])
def list_credits():
    """
    List all PBPE Credits.
    """
    return [
        {"crd_id": crd_id, **data}
        for crd_id, data in CREDITS.items()
    ]
