# backend/engines/registry_engine.py
"""
PBPE Registry Engine - Double Counting Prevention & Blockchain Integration

Layer 5 of PBPE Planetary OS
Features:
- 7-digit code generation (PBPE Identifier Engine)
- Double counting prevention
- Blockchain integration (immutable ledger)
- Audit trail for ESG reporting
"""

import hashlib
import json
import random
import string
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from enum import Enum


class RegistryEntryKind(Enum):
    """Registryエントリ種別"""
    CREDIT_ISSUANCE = "credit_issuance"
    CREDIT_RETIREMENT = "credit_retirement"
    CREDIT_TRADE = "credit_trade"
    BOND_COUPON = "bond_coupon"
    SCOPE3_REPORT = "scope3_report"
    INSURANCE_CLAIM = "insurance_claim"
    VERIFICATION = "verification"


@dataclass
class RegistryEntry:
    """Registryエントリのデータ構造"""
    registry_id: str           # RPT-XXXXXXX
    kind: str                  # エントリ種別
    subject_id: str            # CRD-ID / BND-ID / TRD-ID
    actor: str                 # 企業・団体名
    amount: float              # PBPE / tCO₂e / USD
    unit: str                  # "PBPE" / "tCO₂e" / "USD"
    timestamp: str             # ISO format
    metadata: Dict[str, Any]   # 追加情報
    chain_hash: Optional[str] = None  # ブロックチェーンハッシュ


class Block:
    """ブロックチェーンブロック"""
    def __init__(self, index: int, previous_hash: str, timestamp: str, data: Dict, hash_value: str = None):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash_value or self.calculate_hash()
    
    def calculate_hash(self) -> str:
        """ブロックのハッシュ計算"""
        block_string = json.dumps({
            "index": self.index,
            "previous_hash": self.previous_hash,
            "timestamp": self.timestamp,
            "data": self.data
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def to_dict(self) -> Dict:
        return {
            "index": self.index,
            "previous_hash": self.previous_hash,
            "timestamp": self.timestamp,
            "data": self.data,
            "hash": self.hash
        }


class RegistryEngine:
    """
    PBPE Registry Engine - Layer 5 of PBPE Planetary OS
    
    機能:
    1. 7桁コード発行 (PBPE Identifier Engine)
    2. 二重計上防止チェック
    3. ブロックチェーン連携 (改ざん不可台帳)
    4. 監査証跡の提供
    """
    
    def __init__(self):
        # Registryストレージ
        self.entries: List[RegistryEntry] = []
        
        # ブロックチェーン
        self.chain: List[Block] = []
        self._init_blockchain()
        
        # 二重計上防止のためのセット
        self.issued_credit_ids: set = set()
        self.retired_credit_ids: set = set()
        self.used_kpi_ids: set = set()
        self.reported_scope3_ids: set = set()
        
        # 7桁コード管理
        self.generated_codes: set = set()
        
        # 発行済みPBPE残高管理
        self.balances: Dict[str, float] = {}
    
    def _init_blockchain(self):
        """ジェネシスブロックの作成"""
        genesis_block = Block(
            index=0,
            previous_hash="0",
            timestamp=datetime.now().isoformat(),
            data={"message": "PBPE Registry Genesis Block"}
        )
        self.chain.append(genesis_block)
    
    def _generate_seven_digit_code(self, prefix: str = "RPT") -> str:
        """
        7桁コード生成 (PBPE Identifier Engine)
        
        Format: XXX-XXXXXXX (例: RPT-4F9A2C1)
        使用可能文字: A-Z, 2-9 (0,1,I,O は除外)
        """
        # 除外: 見間違えやすい文字
        characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        
        code = ''.join(random.choices(characters, k=7))
        full_code = f"{prefix}-{code}"
        
        # 重複チェック
        while full_code in self.generated_codes:
            code = ''.join(random.choices(characters, k=7))
            full_code = f"{prefix}-{code}"
        
        self.generated_codes.add(full_code)
        return full_code
    
    def _add_to_blockchain(self, entry: RegistryEntry) -> str:
        """Registryエントリをブロックチェーンに追加"""
        previous_hash = self.chain[-1].hash
        
        block = Block(
            index=len(self.chain),
            previous_hash=previous_hash,
            timestamp=datetime.now().isoformat(),
            data=asdict(entry)
        )
        
        self.chain.append(block)
        return block.hash
    
    def _check_double_issuance(self, kpi_id: str) -> bool:
        """KPI-IDの二重発行チェック"""
        if kpi_id in self.used_kpi_ids:
            return False  # 二重発行エラー
        self.used_kpi_ids.add(kpi_id)
        return True
    
    def _check_double_retirement(self, credit_id: str, amount: float) -> bool:
        """クレジットの二重償却チェック"""
        # 発行量確認
        issued_amount = self.balances.get(credit_id, 0)
        
        # 既に償却済みか確認
        if credit_id in self.retired_credit_ids:
            return False
        
        # 償却量が発行量を超えていないか
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
        """
        PBPEクレジット発行の記録
        
        Args:
            credit_id: CRD-XXXXXXX
            kpi_id: KPI-ID (二重発行防止用)
            owner: 所有者
            amount_pbpe: 発行量
            components: 内訳 (carbon/soil/water/health)
            metadata: 追加情報
        
        Returns:
            Registryエントリとブロックチェーン情報
        """
        # 二重発行チェック
        if not self._check_double_issuance(kpi_id):
            return {
                "success": False,
                "error": "Double issuance detected: KPI already used",
                "kpi_id": kpi_id
            }
        
        # 残高更新
        self.balances[credit_id] = self.balances.get(credit_id, 0) + amount_pbpe
        
        # Registryエントリ作成
        entry = RegistryEntry(
            registry_id=self._generate_seven_digit_code("RPT"),
            kind=RegistryEntryKind.CREDIT_ISSUANCE.value,
            subject_id=credit_id,
            actor=owner,
            amount=amount_pbpe,
            unit="PBPE",
            timestamp=datetime.now().isoformat(),
            metadata={
                "kpi_id": kpi_id,
                "components": components,
                **(metadata or {})
            }
        )
        
        # ブロックチェーン登録
        chain_hash = self._add_to_blockchain(entry)
        entry.chain_hash = chain_hash
        
        # ストレージに保存
        self.entries.append(entry)
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "block": self.chain[-1].to_dict(),
            "credit_id": credit_id,
            "amount_pbpe": amount_pbpe
        }
    
    def record_retirement(self,
                         credit_id: str,
                         owner: str,
                         amount_pbpe: float,
                         purpose: str = "offset") -> Dict[str, Any]:
        """
        PBPEクレジット償却の記録
        """
        # 二重償却チェック
        if not self._check_double_retirement(credit_id, amount_pbpe):
            return {
                "success": False,
                "error": "Double retirement detected or insufficient balance",
                "credit_id": credit_id
            }
        
        # 残高更新
        self.balances[credit_id] = self.balances.get(credit_id, 0) - amount_pbpe
        
        # Registryエントリ作成
        entry = RegistryEntry(
            registry_id=self._generate_seven_digit_code("RPT"),
            kind=RegistryEntryKind.CREDIT_RETIREMENT.value,
            subject_id=credit_id,
            actor=owner,
            amount=amount_pbpe,
            unit="PBPE",
            timestamp=datetime.now().isoformat(),
            metadata={"purpose": purpose}
        )
        
        chain_hash = self._add_to_blockchain(entry)
        entry.chain_hash = chain_hash
        self.entries.append(entry)
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "block": self.chain[-1].to_dict(),
            "credit_id": credit_id,
            "retired_amount": amount_pbpe,
            "remaining_balance": self.balances.get(credit_id, 0)
        }
    
    def record_scope3_report(self,
                            credit_id: str,
                            company: str,
                            amount_tco2e: float,
                            reporting_period: str) -> Dict[str, Any]:
        """
        Scope 3報告の記録
        """
        # 二重主張チェック
        if not self._check_double_scope3_claim(credit_id, company):
            return {
                "success": False,
                "error": "Double Scope 3 claim detected",
                "credit_id": credit_id,
                "company": company
            }
        
        entry = RegistryEntry(
            registry_id=self._generate_seven_digit_code("RPT"),
            kind=RegistryEntryKind.SCOPE3_REPORT.value,
            subject_id=credit_id,
            actor=company,
            amount=amount_tco2e,
            unit="tCO₂e",
            timestamp=datetime.now().isoformat(),
            metadata={"reporting_period": reporting_period}
        )
        
        chain_hash = self._add_to_blockchain(entry)
        entry.chain_hash = chain_hash
        self.entries.append(entry)
        
        return {
            "success": True,
            "registry_entry": asdict(entry),
            "block": self.chain[-1].to_dict(),
            "credit_id": credit_id,
            "company": company,
            "verified_amount": amount_tco2e
        }
    
    def get_entry_by_id(self, registry_id: str) -> Optional[Dict]:
        """Registry IDでエントリを検索"""
        for entry in self.entries:
            if entry.registry_id == registry_id:
                return asdict(entry)
        return None
    
    def get_entries_by_subject(self, subject_id: str) -> List[Dict]:
        """対象ID(CRD-ID/BND-ID等)でエントリを検索"""
        return [asdict(e) for e in self.entries if e.subject_id == subject_id]
    
    def get_entries_by_actor(self, actor: str) -> List[Dict]:
        """アクター(企業名)でエントリを検索"""
        return [asdict(e) for e in self.entries if e.actor == actor]
    
    def verify_credit_authenticity(self, credit_id: str) -> Dict[str, Any]:
        """
        クレジットの真正性検証
        
        Returns:
            発行履歴、償却状況、ブロックチェーン証明
        """
        entries = self.get_entries_by_subject(credit_id)
        
        issuance = [e for e in entries if e["kind"] == RegistryEntryKind.CREDIT_ISSUANCE.value]
        retirements = [e for e in entries if e["kind"] == RegistryEntryKind.CREDIT_RETIREMENT.value]
        
        is_valid = len(issuance) > 0 and len(retirements) == 0
        
        return {
            "credit_id": credit_id,
            "is_valid": is_valid,
            "total_issued": sum(e["amount"] for e in issuance),
            "total_retired": sum(e["amount"] for e in retirements),
            "issuance_history": issuance,
            "retirement_history": retirements,
            "blockchain_proof": self.chain[-1].hash if self.chain else None
        }
    
    def get_chain_status(self) -> Dict[str, Any]:
        """ブロックチェーン状態"""
        return {
            "block_count": len(self.chain),
            "genesis_hash": self.chain[0].hash if self.chain else None,
            "latest_hash": self.chain[-1].hash if self.chain else None,
            "chain_valid": self._is_chain_valid()
        }
    
    def _is_chain_valid(self) -> bool:
        """ブロックチェーン整合性検証"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            
            if current.hash != current.calculate_hash():
                return False
            if current.previous_hash != previous.hash:
                return False
        return True
    
    def get_registry_summary(self) -> Dict[str, Any]:
        """Registryサマリー"""
        by_kind = {}
        for entry in self.entries:
            kind = entry.kind
            by_kind[kind] = by_kind.get(kind, 0) + 1
        
        return {
            "total_entries": len(self.entries),
            "total_codes_generated": len(self.generated_codes),
            "entries_by_kind": by_kind,
            "blockchain_status": self.get_chain_status(),
            "active_credits": len(self.balances) - len(self.retired_credit_ids)
        }
    
    def get_engine_status(self) -> Dict[str, Any]:
        """エンジン状態"""
        return {
            "engine_name": "PBPE Registry Engine (Layer 5)",
            "version": "1.0.0",
            "blockchain_height": len(self.chain),
            "total_registry_entries": len(self.entries),
            "unique_actors": len(set(e.actor for e in self.entries)),
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
    print(f"  Registry ID: {result.get('registry_entry', {}).get('registry_id')}")
    
    print("\n--- Credit Retirement ---")
    result2 = registry_engine.record_retirement(
        credit_id="CRD-TEST123",
        owner="BioNexus Agri",
        amount_pbpe=500000,
        purpose="scope3_offset"
    )
    print(f"  Success: {result2['success']}")
    print(f"  Remaining: {result2.get('remaining_balance', 0)}")
    
    print("\n--- Double Issuance Prevention Test ---")
    result3 = registry_engine.record_issuance(
        credit_id="CRD-TEST456",
        kpi_id="KPI-AGRIX-001",  # 同じKPI-ID
        owner="BioNexus Agri",
        amount_pbpe=100000,
        components={}
    )
    print(f"  Success: {result3['success']}")
    print(f"  Error: {result3.get('error', 'none')}")
    
    print("\n--- Credit Authenticity Verification ---")
    print(registry_engine.verify_credit_authenticity("CRD-TEST123"))
    
    print("\n--- Blockchain Status ---")
    print(registry_engine.get_chain_status())
    
    print("\n--- Registry Summary ---")
    print(registry_engine.get_registry_summary())


if __name__ == "__main__":
    test_engine()
