"""
PBPE Ledger (Registry ↔ Blockchain bridge)

This module connects PBPE Registry entries to the internal blockchain.
Each RegistryEntry is summarized and written as a Block payload.
"""

from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Optional, List

from blockchain.chain import blockchain
from utils.identifier import generate_pbpe_id, IdKind


@dataclass
class RegistryEntry:
    id: str              # RPT-ID (Reporting ID, 7-character code with prefix)
    kind: str            # "credit_issuance" | "credit_retirement" | "trade" | "bond_coupon" | "scope3_report" | ...
    subject_id: str      # CRD-ID / BND-ID / TRD-ID / KPI-ID
    actor: str           # company / government / individual identifier
    amount: float        # PBPE / tCO2e / USD
    unit: str            # "PBPE" | "tCO2e" | "USD" | ...
    timestamp: float     # Unix time
    chain_hash: Optional[str] = None


class RegistryLedger:
    def __init__(self) -> None:
        self._entries: List[RegistryEntry] = []

    @property
    def entries(self) -> List[RegistryEntry]:
        return self._entries

    def record_entry(self, entry: RegistryEntry) -> RegistryEntry:
        """
        Record a RegistryEntry and write it to the blockchain.
        Returns the updated entry with chain_hash set.
        """
        payload = {
            "rpt_id": entry.id,
            "kind": entry.kind,
            "subject_id": entry.subject_id,
            "actor": entry.actor,
            "amount": entry.amount,
            "unit": entry.unit,
            "timestamp": entry.timestamp,
        }
        block = blockchain.add_block(payload=payload)
        entry.chain_hash = block.hash
        self._entries.append(entry)
        return entry

    def create_and_record(
        self,
        kind: str,
        subject_id: str,
        actor: str,
        amount: float,
        unit: str,
        timestamp: float,
    ) -> RegistryEntry:
        """
        Convenience method: generate RPT-ID, create entry, record it.
        """
        rpt_id = generate_pbpe_id(IdKind.RPT)
        entry = RegistryEntry(
            id=rpt_id,
            kind=kind,
            subject_id=subject_id,
            actor=actor,
            amount=amount,
            unit=unit,
            timestamp=timestamp,
        )
        return self.record_entry(entry)

    def find_by_id(self, rpt_id: str) -> Optional[RegistryEntry]:
        for e in self._entries:
            if e.id == rpt_id:
                return e
        return None

    def find_by_subject(self, subject_id: str) -> List[RegistryEntry]:
        return [e for e in self._entries if e.subject_id == subject_id]

    def search(self, actor: Optional[str] = None, kind: Optional[str] = None) -> List[RegistryEntry]:
        results = self._entries
        if actor is not None:
            results = [e for e in results if e.actor == actor]
        if kind is not None:
            results = [e for e in results if e.kind == kind]
        return results

    def to_dict_list(self, entries: Optional[List[RegistryEntry]] = None) -> List[dict]:
        if entries is None:
            entries = self._entries
        return [asdict(e) for e in entries]


# Singleton instance
registry_ledger = RegistryLedger()
