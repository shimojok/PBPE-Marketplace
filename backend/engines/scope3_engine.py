# backend/engines/scope3_engine.py
"""
Scope 3 Conversion Engine - PBPE Automatic Conversion

Converts Scope 3 emissions to PBPE credits
Integrates with MBT55 and AGRIX engines
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum


class Scope3Category(Enum):
    """Scope 3 カテゴリ定義"""
    PURCHASED_GOODS = "purchased_goods"
    CAPITAL_GOODS = "capital_goods"
    FUEL_ENERGY = "fuel_energy"
    TRANSPORT_UPSTREAM = "transport_upstream"
    WASTE = "waste"
    BUSINESS_TRAVEL = "business_travel"
    EMPLOYEE_COMMUTE = "employee_commute"
    TRANSPORT_DOWNSTREAM = "transport_downstream"
    SOLD_PRODUCTS = "sold_products"
    OTHER = "other"


class Scope3Engine:
    """
    Scope 3 to PBPE Conversion Engine
    
    Features:
    - Category-wise emission to PBPE conversion
    - Real-time reduction tracking
    - ESG report generation
    - Integration with MBT55 carbon reduction
    """
    
    def __init__(self):
        # PBPE換算レート (1 PBPE = 1 tCO₂e)
        self.conversion_rate = 1.0
        
        # カテゴリ別デフォルト排出係数 (参考値)
        self.category_factors = {
            Scope3Category.PURCHASED_GOODS: {"factor": 1.0, "unit": "tCO₂e/百万円"},
            Scope3Category.TRANSPORT_UPSTREAM: {"factor": 0.12, "unit": "tCO₂e/t·km"},
            Scope3Category.WASTE: {"factor": 0.5, "unit": "tCO₂e/t"},
            Scope3Category.BUSINESS_TRAVEL: {"factor": 0.15, "unit": "tCO₂e/人·km"},
            Scope3Category.EMPLOYEE_COMMUTE: {"factor": 0.08, "unit": "tCO₂e/人·km"},
        }
        
        # MBT55削減効果の適用係数 (MB001より)
        self.mbt_reduction_factors = {
            "waste": 0.82,      # 廃棄物由来メタン82%削減
            "transport": 0.30,   # 輸送効率30%改善
            "purchased": 0.40,   # 購入品の環境負荷40%削減
        }
        
        # 業種別デフォルトScope 3構成比
        self.industry_profiles = {
            "manufacturing": {
                Scope3Category.PURCHASED_GOODS: 0.45,
                Scope3Category.TRANSPORT_UPSTREAM: 0.15,
                Scope3Category.WASTE: 0.10,
                Scope3Category.OTHER: 0.30,
            },
            "retail": {
                Scope3Category.PURCHASED_GOODS: 0.60,
                Scope3Category.TRANSPORT_DOWNSTREAM: 0.15,
                Scope3Category.WASTE: 0.10,
                Scope3Category.OTHER: 0.15,
            },
            "logistics": {
                Scope3Category.TRANSPORT_UPSTREAM: 0.40,
                Scope3Category.TRANSPORT_DOWNSTREAM: 0.40,
                Scope3Category.FUEL_ENERGY: 0.10,
                Scope3Category.OTHER: 0.10,
            },
            "agriculture": {
                Scope3Category.PURCHASED_GOODS: 0.30,
                Scope3Category.TRANSPORT_UPSTREAM: 0.20,
                Scope3Category.WASTE: 0.25,
                Scope3Category.SOLD_PRODUCTS: 0.15,
                Scope3Category.OTHER: 0.10,
            },
            "default": {
                Scope3Category.PURCHASED_GOODS: 0.35,
                Scope3Category.TRANSPORT_UPSTREAM: 0.20,
                Scope3Category.WASTE: 0.15,
                Scope3Category.OTHER: 0.30,
            }
        }
    
    def convert_to_pbpe(self, emissions_tco2e: float) -> Dict[str, float]:
        """
        Scope 3排出量をPBPEに変換
        
        Args:
            emissions_tco2e: Scope 3排出量 (tCO₂e)
        
        Returns:
            PBPE変換結果
        """
        pbpe_amount = emissions_tco2e * self.conversion_rate
        
        return {
            "emissions_tco2e": emissions_tco2e,
            "pbpe_amount": round(pbpe_amount, 0),
            "conversion_rate": self.conversion_rate,
            "unit": "PBPE"
        }
    
    def calculate_category_breakdown(self,
                                     total_emissions: float,
                                     industry: str = "default") -> Dict[str, any]:
        """
        カテゴリ別排出量内訳の計算
        
        Args:
            total_emissions: 総Scope 3排出量 (tCO₂e)
            industry: 業種
        
        Returns:
            カテゴリ別内訳
        """
        profile = self.industry_profiles.get(industry, self.industry_profiles["default"])
        
        category_breakdown = {}
        for category, ratio in profile.items():
            emissions = total_emissions * ratio
            pbpe = emissions * self.conversion_rate
            
            category_breakdown[category.value] = {
                "emissions_tco2e": round(emissions, 0),
                "pbpe_amount": round(pbpe, 0),
                "ratio": ratio
            }
        
        return {
            "total_emissions_tco2e": total_emissions,
            "total_pbpe": round(total_emissions * self.conversion_rate, 0),
            "industry": industry,
            "categories": category_breakdown
        }
    
    def apply_mbt_reduction(self,
                           emissions_tco2e: float,
                           category: str = "waste") -> Dict[str, float]:
        """
        MBT55削減効果の適用
        
        Args:
            emissions_tco2e: 対象排出量 (tCO₂e)
            category: 削減対象カテゴリ
        
        Returns:
            削減効果適用後の値
        """
        reduction_factor = self.mbt_reduction_factors.get(category, 0.30)
        reduced_emissions = emissions_tco2e * (1 - reduction_factor)
        reduction_amount = emissions_tco2e - reduced_emissions
        
        return {
            "original_emissions_tco2e": emissions_tco2e,
            "reduction_factor": reduction_factor,
            "reduction_amount_tco2e": round(reduction_amount, 0),
            "reduced_emissions_tco2e": round(reduced_emissions, 0),
            "pbpe_reduction": round(reduction_amount, 0),
            "category": category
        }
    
    def calculate_enterprise_portfolio(self,
                                      company_name: str,
                                      pbpe_credits: float,
                                      bond_investment_usd: float,
                                      insurance_coverage_usd: float) -> Dict[str, any]:
        """
        企業ポートフォリオ計算
        
        Returns:
            企業のPBPE関連資産ポートフォリオ
        """
        # BondのPBPE換算 (簡易: 投資額の10%がPBPE価値)
        bond_pbpe_value = bond_investment_usd * 0.10
        
        # InsuranceのPBPE換算 (簡易)
        insurance_pbpe_value = insurance_coverage_usd * 0.05
        
        total_pbpe = pbpe_credits + bond_pbpe_value + insurance_pbpe_value
        
        return {
            "company_name": company_name,
            "pbpe_credits": round(pbpe_credits, 0),
            "bond_investment_usd": bond_investment_usd,
            "bond_pbpe_value": round(bond_pbpe_value, 0),
            "insurance_coverage_usd": insurance_coverage_usd,
            "insurance_pbpe_value": round(insurance_pbpe_value, 0),
            "total_pbpe_portfolio": round(total_pbpe, 0),
            "estimated_market_value_usd": round(total_pbpe * 10, 0)  # $10/PBPE想定
        }
    
    def generate_esg_report(self,
                           company_name: str,
                           total_scope3_emissions: float,
                           mbt_reduction_applied: float = 0,
                           pbpe_credits_retired: float = 0) -> Dict[str, any]:
        """
        ESGレポート生成
        
        Returns:
            ESG報告用データ
        """
        # ネット排出量
        net_emissions = total_scope3_emissions - mbt_reduction_applied - pbpe_credits_retired
        
        # 削減率
        reduction_rate = (mbt_reduction_applied + pbpe_credits_retired) / total_scope3_emissions if total_scope3_emissions > 0 else 0
        
        # オフセットステータス
        if net_emissions <= 0:
            offset_status = "Carbon Negative"
        elif reduction_rate >= 0.5:
            offset_status = "Significant Reduction"
        elif reduction_rate >= 0.2:
            offset_status = "In Progress"
        else:
            offset_status = "Need Acceleration"
        
        return {
            "company_name": company_name,
            "reporting_period": "FY2026",
            "total_scope3_emissions_tco2e": round(total_scope3_emissions, 0),
            "mbt_reduction_tco2e": round(mbt_reduction_applied, 0),
            "pbpe_credits_retired_tco2e": round(pbpe_credits_retired, 0),
            "net_emissions_tco2e": round(max(0, net_emissions), 0),
            "reduction_rate_percent": round(reduction_rate * 100, 1),
            "offset_status": offset_status,
            "recommendation": self._get_recommendation(offset_status)
        }
    
    def _get_recommendation(self, status: str) -> str:
        """ステータスに応じた推奨事項"""
        recommendations = {
            "Carbon Negative": "Continue current strategy; consider carbon credit sales",
            "Significant Reduction": "Expand MBT55 adoption to achieve carbon negative",
            "In Progress": "Accelerate PBPE credit acquisition",
            "Need Acceleration": "Immediate MBT55 integration recommended"
        }
        return recommendations.get(status, "Review carbon reduction strategy")
    
    def integrate_with_mbt55(self,
                            waste_emissions_tco2e: float,
                            mbt55_engine) -> Dict[str, any]:
        """
        MBT55エンジンとの連携
        
        Args:
            waste_emissions_tco2e: 廃棄物由来排出量
            mbt55_engine: MBT55エンジンインスタンス
        
        Returns:
            統合計算結果
        """
        # MBT55エンジンでGHG削減計算
        ghg_result = mbt55_engine.calculate_ghg_reduction(waste_emissions_tco2e / 2.8, "mixed")
        
        # Scope 3削減として適用
        reduction_amount = ghg_result["total_co2e_reduction"]
        
        # PBPE変換
        pbpe_result = self.convert_to_pbpe(reduction_amount)
        
        return {
            "waste_emissions_tco2e": waste_emissions_tco2e,
            "mbt55_reduction_tco2e": reduction_amount,
            "reduction_rate": round(reduction_amount / waste_emissions_tco2e * 100, 1) if waste_emissions_tco2e > 0 else 0,
            "pbpe_credits_generated": pbpe_result["pbpe_amount"],
            "unit": "tCO₂e / PBPE"
        }
    
    def get_engine_status(self) -> Dict[str, any]:
        """エンジンの状態を返す"""
        return {
            "engine_name": "Scope 3 Conversion Engine",
            "version": "1.0.0",
            "conversion_rate": f"{self.conversion_rate} PBPE/tCO₂e",
            "supported_categories": [c.value for c in Scope3Category],
            "supported_industries": list(self.industry_profiles.keys()),
            "mbt_integration": True
        }


# エンジンインスタンス
scope3_engine = Scope3Engine()


def test_engine():
    print("=" * 60)
    print("Scope 3 Engine Test Results")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(scope3_engine.get_engine_status())
    
    print("\n--- PBPE Conversion (1000 tCO₂e) ---")
    print(scope3_engine.convert_to_pbpe(1000))
    
    print("\n--- Category Breakdown (5000 tCO₂e, agriculture) ---")
    print(scope3_engine.calculate_category_breakdown(5000, "agriculture"))
    
    print("\n--- MBT Reduction Application (100 tCO₂e, waste) ---")
    print(scope3_engine.apply_mbt_reduction(100, "waste"))
    
    print("\n--- Enterprise Portfolio ---")
    print(scope3_engine.calculate_enterprise_portfolio("Example Corp", 500000, 1000000, 500000))
    
    print("\n--- ESG Report ---")
    print(scope3_engine.generate_esg_report("Example Corp", 10000, 2000, 3000))


if __name__ == "__main__":
    test_engine()
