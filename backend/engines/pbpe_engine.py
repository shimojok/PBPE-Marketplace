# backend/engines/pbpe_engine.py
"""
PBPE Calculation Engine - Central Issuance Engine

Integrates MBT55, AGRIX, and Scope3 engines to calculate PBPE issuance
PBPE = Carbon + Soil + Water + Health components
"""

from typing import Dict, Optional, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class PBPEComponents:
    """PBPE構成要素"""
    carbon: float      # Carbon PBPE (GHG削減・隔離)
    soil: float        # Soil PBPE (土壌炭素・重金属無害化)
    water: float       # Water PBPE (水質改善・節水)
    health: float      # Health PBPE (栄養価・品質)


class PBPEEngine:
    """
    PBPE Central Issuance Engine
    
    Integrates multiple engines to calculate PBPE credits
    """
    
    def __init__(self):
        # PBPEコンポーネントの加重係数
        self.component_weights = {
            "carbon": 1.0,
            "soil": 0.8,
            "water": 0.6,
            "health": 1.2
        }
        
        # 換算レート
        self.conversion_rates = {
            "ghg_to_pbpe": 1.0,        # 1 tCO₂e = 1 PBPE
            "carbon_seq_to_pbpe": 0.5,  # 1 tCO₂e隔離 = 0.5 PBPE
            "yield_to_pbpe": 100,       # 1 ton増収 = 100 PBPE
            "nutrition_to_pbpe": 1000,  # 栄養指数1 = 1000 PBPE
        }
        
        # PBPE価格モデル (動的)
        self.base_price_usd = 10.0
        self.demand_elasticity = 0.5
        self.liquidity_factor = 0.67
        
        # Registry連携用
        self.registry_entries = []
        self.seven_digit_codes = set()
    
    def calculate_carbon_pbpe(self,
                             ghg_reduction_tco2e: float = 0,
                             carbon_sequestration_tco2e: float = 0,
                             waste_processed_ton: float = 0) -> float:
        """
        Carbon PBPEの計算
        
        Sources:
        - GHG削減 (tCO₂e) → 1:1
        - 炭素隔離 (tCO₂e) → 0.5:1
        - 廃棄物処理 (ton) → 0.1 PBPE/ton
        """
        from_ghg = ghg_reduction_tco2e * self.conversion_rates["ghg_to_pbpe"]
        from_seq = carbon_sequestration_tco2e * self.conversion_rates["carbon_seq_to_pbpe"]
        from_waste = waste_processed_ton * 0.1
        
        total = from_ghg + from_seq + from_waste
        
        return round(total, 0)
    
    def calculate_soil_pbpe(self,
                           soc_increase_tco2e: float = 0,
                           heavy_metal_reduction_rate: float = 0,
                           microbial_diversity_improvement: float = 0) -> float:
        """
        Soil PBPEの計算
        
        Sources:
        - 土壌炭素増加 (tCO₂e)
        - 重金属無害化率 (%)
        - 微生物多様性改善
        """
        from_soc = soc_increase_tco2e * 0.3
        from_metal = heavy_metal_reduction_rate * 10000  # 1% = 10000 PBPE
        from_diversity = microbial_diversity_improvement * 50000  # 0.1改善 = 5000 PBPE
        
        total = from_soc + from_metal + from_diversity
        
        return round(total, 0)
    
    def calculate_water_pbpe(self,
                            water_saved_m3: float = 0,
                            water_quality_improvement: float = 0,
                            nutrient_runoff_reduction: float = 0) -> float:
        """
        Water PBPEの計算
        
        Sources:
        - 節水量 (m³)
        - 水質改善指数
        - 栄養塩流出削減率
        """
        from_saved = water_saved_m3 * 0.1      # 1 m³ = 0.1 PBPE
        from_quality = water_quality_improvement * 10000  # 指数1 = 10000 PBPE
        from_runoff = nutrient_runoff_reduction * 20000   # 10% = 20000 PBPE
        
        total = from_saved + from_quality + from_runoff
        
        return round(total, 0)
    
    def calculate_health_pbpe(self,
                             nutrition_score_improvement: float = 0,
                             yield_increase_ton: float = 0,
                             quality_score: float = 0,
                             medical_cost_reduction_usd: float = 0) -> float:
        """
        Health PBPEの計算
        
        Sources:
        - 栄養価改善 (MBT55効果: +31%)
        - 収量増加 (ton)
        - 品質スコア
        - 医療費削減 (USD)
        """
        from_nutrition = nutrition_score_improvement * 5000   # 10点 = 50000 PBPE
        from_yield = yield_increase_ton * self.conversion_rates["yield_to_pbpe"]
        from_quality = quality_score * 1000                   # 1点 = 1000 PBPE
        from_medical = medical_cost_reduction_usd * 0.1       # $10 = 1 PBPE
        
        total = from_nutrition + from_yield + from_quality + from_medical
        
        return round(total, 0)
    
    def calculate_total_pbpe(self,
                            carbon: float = 0,
                            soil: float = 0,
                            water: float = 0,
                            health: float = 0) -> Dict[str, float]:
        """
        総PBPE発行量の計算
        
        Returns:
            各コンポーネントと合計
        """
        weighted_carbon = carbon * self.component_weights["carbon"]
        weighted_soil = soil * self.component_weights["soil"]
        weighted_water = water * self.component_weights["water"]
        weighted_health = health * self.component_weights["health"]
        
        total = weighted_carbon + weighted_soil + weighted_water + weighted_health
        
        return {
            "carbon_pbpe": round(carbon, 0),
            "soil_pbpe": round(soil, 0),
            "water_pbpe": round(water, 0),
            "health_pbpe": round(health, 0),
            "weighted_carbon": round(weighted_carbon, 0),
            "weighted_soil": round(weighted_soil, 0),
            "weighted_water": round(weighted_water, 0),
            "weighted_health": round(weighted_health, 0),
            "total_pbpe": round(total, 0)
        }
    
    def integrate_engines(self,
                         mbt55_result: Dict[str, float],
                         agrix_result: Dict[str, float],
                         scope3_result: Dict[str, float],
                         area_ha: float = 1.0) -> Dict[str, any]:
        """
        全エンジンを統合してPBPEを計算
        
        Args:
            mbt55_result: MBT55エンジンの出力
            agrix_result: AGRIXエンジンの出力
            scope3_result: Scope3エンジンの出力
            area_ha: 対象面積
        
        Returns:
            統合PBPE計算結果
        """
        # Carbon PBPE
        carbon_pbpe = self.calculate_carbon_pbpe(
            ghg_reduction_tco2e=mbt55_result.get("total_co2e_reduction", 0),
            carbon_sequestration_tco2e=agrix_result.get("carbon_sequestration", 0),
            waste_processed_ton=mbt55_result.get("waste_processed_ton", 0)
        )
        
        # Soil PBPE
        soil_pbpe = self.calculate_soil_pbpe(
            soc_increase_tco2e=agrix_result.get("soc_increase", 0),
            heavy_metal_reduction_rate=mbt55_result.get("detoxification_rate", 0),
            microbial_diversity_improvement=mbt55_result.get("diversity_improvement", 0.1)
        )
        
        # Water PBPE
        water_pbpe = self.calculate_water_pbpe(
            water_saved_m3=agrix_result.get("water_saved_m3", 0),
            water_quality_improvement=agrix_result.get("water_quality", 0),
            nutrient_runoff_reduction=agrix_result.get("runoff_reduction", 0)
        )
        
        # Health PBPE
        health_pbpe = self.calculate_health_pbpe(
            nutrition_score_improvement=agrix_result.get("nutrition_improvement", 0),
            yield_increase_ton=agrix_result.get("yield_increase_ton", 0),
            quality_score=agrix_result.get("quality_score", 0),
            medical_cost_reduction_usd=agrix_result.get("medical_cost_reduction", 0)
        )
        
        # 総合計算
        total = self.calculate_total_pbpe(carbon_pbpe, soil_pbpe, water_pbpe, health_pbpe)
        
        # 7桁コード生成 (Registry連携)
        credit_id = self._generate_seven_digit_code("CRD")
        
        return {
            "credit_id": credit_id,
            "components": {
                "carbon_pbpe": carbon_pbpe,
                "soil_pbpe": soil_pbpe,
                "water_pbpe": water_pbpe,
                "health_pbpe": health_pbpe
            },
            "weighted_total": total,
            "area_ha": area_ha,
            "issuance_date": datetime.now().isoformat(),
            "unit": "PBPE"
        }
    
    def calculate_pbpe_price(self,
                            total_supply_pbpe: float,
                            total_demand_pbpe: float,
                            volatility_index: float = 0.23) -> Dict[str, float]:
        """
        動的PBPE価格の計算
        
        Args:
            total_supply_pbpe: 総供給量
            total_demand_pbpe: 総需要量
            volatility_index: ボラティリティ指数
        
        Returns:
            計算価格
        """
        # 需給バランス
        supply_demand_ratio = total_demand_pbpe / total_supply_pbpe if total_supply_pbpe > 0 else 1.0
        
        # 価格調整
        price = self.base_price_usd * (1 + self.demand_elasticity * (supply_demand_ratio - 1))
        
        # ボラティリティ調整
        adjusted_price = price * (1 + (volatility_index - 0.5) * 0.2)
        
        return {
            "base_price_usd": self.base_price_usd,
            "current_price_usd": round(adjusted_price, 2),
            "supply_demand_ratio": round(supply_demand_ratio, 3),
            "volatility_index": volatility_index,
            "market_cap_usd": round(adjusted_price * total_supply_pbpe, 0)
        }
    
    def _generate_seven_digit_code(self, prefix: str = "CRD") -> str:
        """
        7桁コード生成 (PBPE Identifier Engine)
        
        Format: XXX-XXXXXXX (例: CRD-4F9A2C1)
        """
        import random
        import string
        
        characters = string.ascii_uppercase + string.digits
        # 除外: 見間違えやすい文字 (0, O, I, 1)
        characters = characters.replace("0", "").replace("O", "").replace("I", "").replace("1", "")
        
        code = ''.join(random.choices(characters, k=7))
        full_code = f"{prefix}-{code}"
        
        # 重複チェック
        while full_code in self.seven_digit_codes:
            code = ''.join(random.choices(characters, k=7))
            full_code = f"{prefix}-{code}"
        
        self.seven_digit_codes.add(full_code)
        return full_code
    
    def issue_pbpe_credit(self,
                         mbt55_result: Dict[str, float],
                         agrix_result: Dict[str, float],
                         scope3_result: Dict[str, float],
                         area_ha: float = 1.0,
                         owner: str = "unknown") -> Dict[str, any]:
        """
        PBPEクレジット発行 (Registry登録付き)
        
        統合計算 + Registry登録 + 7桁コード発行
        """
        # 統合計算
        integrated = self.integrate_engines(mbt55_result, agrix_result, scope3_result, area_ha)
        
        # Registry登録エントリ作成
        registry_entry = {
            "registry_id": self._generate_seven_digit_code("RPT"),
            "credit_id": integrated["credit_id"],
            "kind": "credit_issuance",
            "owner": owner,
            "amount_pbpe": integrated["weighted_total"]["total_pbpe"],
            "components": integrated["components"],
            "timestamp": datetime.now().isoformat(),
            "area_ha": area_ha,
            "status": "issued"
        }
        
        self.registry_entries.append(registry_entry)
        
        return {
            "credit": integrated,
            "registry_entry": registry_entry,
            "status": "success"
        }
    
    def get_registry_summary(self) -> Dict[str, any]:
        """Registry登録サマリー"""
        total_issued = sum(entry["amount_pbpe"] for entry in self.registry_entries)
        
        return {
            "total_entries": len(self.registry_entries),
            "total_pbpe_issued": round(total_issued, 0),
            "unique_credit_codes": len(self.seven_digit_codes),
            "entries": self.registry_entries[-10:]  # 最新10件
        }
    
    def get_engine_status(self) -> Dict[str, any]:
        """エンジンの状態を返す"""
        return {
            "engine_name": "PBPE Calculation Engine",
            "version": "1.0.0",
            "component_weights": self.component_weights,
            "base_price_usd": self.base_price_usd,
            "registry_entries": len(self.registry_entries),
            "seven_digit_codes_issued": len(self.seven_digit_codes)
        }


# エンジンインスタンス
pbpe_engine = PBPEEngine()


def test_engine():
    print("=" * 60)
    print("PBPE Engine Test Results")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(pbpe_engine.get_engine_status())
    
    print("\n--- Carbon PBPE (1000 tCO₂e reduction) ---")
    print(pbpe_engine.calculate_carbon_pbpe(ghg_reduction_tco2e=1000))
    
    print("\n--- Soil PBPE (SOC +50 tCO₂e, 80% detox) ---")
    print(pbpe_engine.calculate_soil_pbpe(soc_increase_tco2e=50, heavy_metal_reduction_rate=80))
    
    print("\n--- Health PBPE (Nutrition +31%, Yield +5t) ---")
    print(pbpe_engine.calculate_health_pbpe(nutrition_score_improvement=31, yield_increase_ton=5))
    
    print("\n--- Total PBPE Calculation ---")
    print(pbpe_engine.calculate_total_pbpe(carbon=5000000, soil=500000, water=200000, health=300000))
    
    print("\n--- PBPE Price Calculation ---")
    print(pbpe_engine.calculate_pbpe_price(total_supply_pbpe=620000000, total_demand_pbpe=650000000))
    
    print("\n--- Mock Engine Integration ---")
    mock_mbt55 = {"total_co2e_reduction": 500, "detoxification_rate": 85}
    mock_agrix = {"carbon_sequestration": 300, "nutrition_improvement": 31, "yield_increase_ton": 5}
    mock_scope3 = {"reduction_amount_tco2e": 200}
    
    result = pbpe_engine.issue_pbpe_credit(mock_mbt55, mock_agrix, mock_scope3, area_ha=1.0, owner="Test Farm")
    print(f"  Credit ID: {result['credit']['credit_id']}")
    print(f"  Total PBPE: {result['credit']['weighted_total']['total_pbpe']}")
    print(f"  Registry ID: {result['registry_entry']['registry_id']}")
    
    print("\n--- Registry Summary ---")
    print(pbpe_engine.get_registry_summary())


if __name__ == "__main__":
    test_engine()
