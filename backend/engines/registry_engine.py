"""
PBPE Registry Engine - Double Counting Prevention

Layer 5 of PBPE Planetary OS
Features:
- 7-digit code generation (PBPE Identifier Engine)
- Double counting prevention
- Registry entry management
- Audit trail for ESG reporting
"""

import random
import string
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from enum import Enum

from backend.blockchain.ledger import registry_ledger, RegistryEntry


class RegistryEntryKind(Enum):
    """Registryエントリ種別"""
    CREDIT_ISSUANCE = "credit_issuance"
    CREDIT_RETIREMENT = "credit_retirement"
    CREDIT_TRADE = "credit_trade"
    BOND_COUPON = "bond_coupon"
    SCOPE3_REPORT = "scope3_report"
    INSURANCE_CLAIM = "insurance_claim"
    VERIFICATION = "verification"


class RegistryEngine:
    """
    PBPE Registry Engine - Layer 5 of PBPE Planetary OS
    
    機能:
    1. 7桁コード発行 (PBPE Identifier Engine)
    2. 二重計上防止チェック
    3. レジストリエントリ管理
    4. 監査証跡の提供
    """
    
    def __init__(self):
        # 二重計上防止のためのセット
        self.issued_credit_ids: set = set()
        self.retired_credit_ids: set = set()
        self.used_kpi_ids: set = set()
        self.reported_scope3_ids: set = set()
        
        # 発行済みPBPE残高管理
        self.balances: Dict[str, float] = {}
    
    def _generate_seven_digit_code(self, prefix: str = "RPT") -> str:
        """7桁コード生成"""
        characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        code = ''.join(random.choices(characters, k=7))
        return f"{prefix}-{code}"
    
    def _check_double_issuance(self, kpi_id: str) -> bool:
        """KPI-IDの二重発行チェック"""
        if kpi_id in self.used_kpi_ids:
            return False
        self.used_kpi_ids.add(kpi_id)
        return True
    
    def _check_double_retirement(self, credit_id: str, amount: float) -> bool:
        """クレジットの二重償却チェック"""
        issued_amount = self.balances.get(credit_id, 0)
        
        if credit_id in self.retired_credit_ids:
            return False
        
        if amount > issued_amount:
            return False
        
        self.retired_credit_ids.add(credit_id)
        return True
    
    def _check_double_scope3_claim(self, credit_id: str, company: str) -> bool:
        """Scope 3の二重主張チェック"""
        claim_key = f"{credit_id}:{company}"
        if claim_key in self.reported_scope3_ids:
            return False
        self.reported_scope3_ids.add(claim_key)
        return True
    
    def record_issuance(self,
                       credit_id: str,
                       kpi_id: str,
                       owner: str,
                       amount_pbpe: float,
                       components: Dict[str, float],
                       metadata: Optional[Dict] = None) -> Dict[str, Any]:
        """PBPEクレジット発行の記録"""
        if not self._check_double_issuance(kpi_id):
            return {
                "success": False,
                "error": "Double issuance detected: KPI already used",
                "kpi_id": kpi_id
            }
        
        self.balances[credit_id] = self.balances.get(credit_id, 0) + amount_pbpe
        
        import time
        entry = registry_ledger.create_and_record(
            kind=RegistryEntryKind.CREDIT_ISSUANCE.value,
            subject_id=credit_id,
            actor=owner,
            amount=amount_pbpe,
            unit="PBPE",
            timestamp=time.time()
        )
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "credit_id": credit_id,
            "amount_pbpe": amount_pbpe
        }
    
    def record_retirement(self,
                         credit_id: str,
                         owner: str,
                         amount_pbpe: float,
                         purpose: str = "offset") -> Dict[str, Any]:
        """PBPEクレジット償却の記録"""
        if not self._check_double_retirement(credit_id, amount_pbpe):
            return {
                "success": False,
                "error": "Double retirement detected or insufficient balance",
                "credit_id": credit_id
            }
        
        self.balances[credit_id] = self.balances.get(credit_id, 0) - amount_pbpe
        
        import time
        entry = registry_ledger.create_and_record(
            kind=RegistryEntryKind.CREDIT_RETIREMENT.value,
            subject_id=credit_id,
            actor=owner,
            amount=amount_pbpe,
            unit="PBPE",
            timestamp=time.time()
        )
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "credit_id": credit_id,
            "retired_amount": amount_pbpe,
            "remaining_balance": self.balances.get(credit_id, 0)
        }
    
    def record_scope3_report(self,
                            credit_id: str,
                            company: str,
                            amount_tco2e: float,
                            reporting_period: str) -> Dict[str, Any]:
        """Scope 3報告の記録"""
        if not self._check_double_scope3_claim(credit_id, company):
            return {
                "success": False,
                "error": "Double Scope 3 claim detected",
                "credit_id": credit_id,
                "company": company
            }
        
        import time
        entry = registry_ledger.create_and_record(
            kind=RegistryEntryKind.SCOPE3_REPORT.value,
            subject_id=credit_id,
            actor=company,
            amount=amount_tco2e,
            unit="tCO₂e",
            timestamp=time.time()
        )
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "credit_id": credit_id,
            "company": company,
            "verified_amount": amount_tco2e
        }
    
    def get_entry_by_id(self, registry_id: str) -> Optional[Dict]:
        """Registry IDでエントリを検索"""
        entry = registry_ledger.find_by_id(registry_id)
        return asdict(entry) if entry else None
    
    def get_entries_by_subject(self, subject_id: str) -> List[Dict]:
        """対象IDでエントリを検索"""
        entries = registry_ledger.find_by_subject(subject_id)
        return registry_ledger.to_dict_list(entries)
    
    def get_entries_by_actor(self, actor: str) -> List[Dict]:
        """アクターでエントリを検索"""
        entries = registry_ledger.search(actor=actor)
        return registry_ledger.to_dict_list(entries)
    
    def search_entries(self, actor: str = None, kind: str = None, subject_id: str = None) -> List[Dict]:
        """条件でエントリを検索"""
        results = registry_ledger.entries
        if actor:
            results = [e for e in results if actor.lower() in e.actor.lower()]
        if kind:
            results = [e for e in results if kind.lower() in e.kind.lower()]
        if subject_id:
            results = [e for e in results if subject_id.lower() in e.subject_id.lower()]
        return registry_ledger.to_dict_list(results)
    
    def verify_credit_authenticity(self, credit_id: str) -> Dict[str, Any]:
        """クレジットの真正性検証"""
        entries = self.get_entries_by_subject(credit_id)
        
        issuance = [e for e in entries if e["kind"] == RegistryEntryKind.CREDIT_ISSUANCE.value]
        retirements = [e for e in entries if e["kind"] == RegistryEntryKind.CREDIT_RETIREMENT.value]
        
        is_valid = len(issuance) > 0 and len(retirements) == 0
        
        from backend.blockchain.chain import blockchain
        
        return {
            "credit_id": credit_id,
            "is_valid": is_valid,
            "total_issued": sum(e["amount"] for e in issuance),
            "total_retired": sum(e["amount"] for e in retirements),
            "issuance_history": issuance,
            "retirement_history": retirements,
            "blockchain_proof": blockchain.chain[-1].hash if blockchain.chain else None
        }
    
    def get_chain_status(self) -> Dict[str, Any]:
        """ブロックチェーン状態"""
        from backend.blockchain.chain import blockchain
        
        return {
            "block_count": len(blockchain.chain),
            "genesis_hash": blockchain.chain[0].hash if blockchain.chain else None,
            "latest_hash": blockchain.chain[-1].hash if blockchain.chain else None,
            "chain_valid": blockchain.is_valid()
        }
    
    def get_registry_summary(self) -> Dict[str, Any]:
        """Registryサマリー"""
        entries = registry_ledger.entries
        
        by_kind = {}
        for entry in entries:
            by_kind[entry.kind] = by_kind.get(entry.kind, 0) + 1
        
        return {
            "total_entries": len(entries),
            "entries_by_kind": by_kind,
            "blockchain_status": self.get_chain_status(),
            "active_credits": len(self.balances) - len(self.retired_credit_ids)
        }
    
    def get_engine_status(self) -> Dict[str, Any]:
        """エンジン状態"""
        return {
            "engine_name": "PBPE Registry Engine (Layer 5)",
            "version": "1.0.0",
            "total_registry_entries": len(registry_ledger.entries),
            "unique_actors": len(set(e.actor for e in registry_ledger.entries)),
            "prevention_features": [
                "double_issuance_prevention",
                "double_retirement_prevention",
                "double_scope3_claim_prevention"
            ]
        }


# エンジンインスタンス
registry_engine = RegistryEngine()


def test_engine():
    print("=" * 60)
    print("PBPE Registry Engine Test Results")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(registry_engine.get_engine_status())
    
    print("\n--- Credit Issuance ---")
    result = registry_engine.record_issuance(
        credit_id="CRD-TEST123",
        kpi_id="KPI-AGRIX-001",
        owner="BioNexus Agri",
        amount_pbpe=1000000,
        components={"carbon": 800000, "soil": 200000}
    )
    print(f"  Success: {result['success']}")
    print(f"  Registry ID: {result.get('registry_entry', {}).get('id')}")
    
    print("\n--- Credit Authenticity Verification ---")
    print(registry_engine.verify_credit_authenticity("CRD-TEST123"))
    
    print("\n--- Blockchain Status ---")
    print(registry_engine.get_chain_status())
    
    print("\n--- Registry Summary ---")
    print(registry_engine.get_registry_summary())


if __name__ == "__main__":
    test_engine()
