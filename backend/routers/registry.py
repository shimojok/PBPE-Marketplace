"""
PBPE Registry API Router

Exposes endpoints to:
- record registry entries (issuance, retirement, trade, coupon, scope3_report)
- query registry entries
- inspect blockchain status for entries
"""

from __future__ import annotations

import time
from typing import Optional, List

from fastapi import APIRouter, HTTPException, Query

from backend.blockchain.chain import blockchain
from backend.blockchain.ledger import registry_ledger, RegistryEntry

router = APIRouter(
    prefix="/registry",
    tags=["registry"],
)

# 以下はそのまま（省略）

@router.post("/record", response_model=dict)
def record_registry_entry(
    kind: str,
    subject_id: str,
    actor: str,
    amount: float,
    unit: str,
):
    """
    Record a new registry entry and write it to the blockchain.

    This is the core endpoint used by:
      - credits issuance / retirement
      - trades
      - bond coupons
      - scope3 reports
    """
    ts = time.time()
    entry = registry_ledger.create_and_record(
        kind=kind,
        subject_id=subject_id,
        actor=actor,
        amount=amount,
        unit=unit,
        timestamp=ts,
    )
    return {
        "id": entry.id,
        "kind": entry.kind,
        "subject_id": entry.subject_id,
        "actor": entry.actor,
        "amount": entry.amount,
        "unit": entry.unit,
        "timestamp": entry.timestamp,
        "chain_hash": entry.chain_hash,
    }


@router.get("/{rpt_id}", response_model=dict)
def get_registry_entry(rpt_id: str):
    """
    Get a single registry entry by RPT-ID.
    """
    entry = registry_ledger.find_by_id(rpt_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Registry entry not found")

    return {
        "id": entry.id,
        "kind": entry.kind,
        "subject_id": entry.subject_id,
        "actor": entry.actor,
        "amount": entry.amount,
        "unit": entry.unit,
        "timestamp": entry.timestamp,
        "chain_hash": entry.chain_hash,
    }


@router.get("/by-subject/{subject_id}", response_model=List[dict])
def get_registry_entries_by_subject(subject_id: str):
    """
    Get all registry entries related to a specific subject_id
    (e.g., CRD-ID, BND-ID, TRD-ID, KPI-ID).
    """
    entries = registry_ledger.find_by_subject(subject_id)
    return registry_ledger.to_dict_list(entries)


@router.get("/search", response_model=List[dict])
def search_registry_entries(
    actor: Optional[str] = Query(default=None),
    kind: Optional[str] = Query(default=None),
):
    """
    Search registry entries by actor and/or kind.
    """
    entries = registry_ledger.search(actor=actor, kind=kind)
    return registry_ledger.to_dict_list(entries)


@router.get("/chain/status", response_model=dict)
def get_chain_status():
    """
    Inspect blockchain status (length, validity).
    """
    return {
        "length": len(blockchain.chain),
        "is_valid": blockchain.is_valid(),
    }


@router.get("/chain/block/{block_hash}", response_model=dict)
def get_block(block_hash: str):
    """
    Get a single block by its hash.
    """
    block = blockchain.get_block_by_hash(block_hash)
    if block is None:
        raise HTTPException(status_code=404, detail="Block not found")

    return {
        "index": block.index,
        "previous_hash": block.previous_hash,
        "timestamp": block.timestamp,
        "payload": block.payload,
        "hash": block.hash,
    }
