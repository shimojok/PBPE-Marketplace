# backend/engines/healthbook_engine.py
"""
HealthBook Engine - Human Health Impact Quantification

Integrates with MBT55 and AGRIX to calculate Health PBPE
"""

from typing import Dict, Optional, List
from dataclasses import dataclass
from enum import Enum


class HealthMetric(Enum):
    """健康指標種別"""
    NUTRITION = "nutrition"
    GUT_HEALTH = "gut_health"
    ANTIOXIDANT = "antioxidant"
    INFLAMMATION = "inflammation"
    LONGEVITY = "longevity"


@dataclass
class HealthImpact:
    """健康インパクトデータ"""
    nutrition_score: float      # 栄養スコア (0-100)
    gut_health_score: float     # 腸内環境スコア (0-100)
    antioxidant_score: float    # 抗酸化スコア (0-100)
    inflammation_reduction: float  # 炎症抑制率 (%)
    medical_cost_saving_usd: float  # 医療費削減 (USD)


class HealthBookEngine:
    """
    HealthBook Engine for human health impact
    
    Features:
    - Nutritional value quantification
    - Gut microbiome improvement
    - Disease risk reduction
    - Medical cost saving calculation
    """
    
    def __init__(self):
        # MBT55農産物の栄養強化係数（MB004より）
        self.mbt_nutrition_boost = {
            "lycopene": 1.31,      # +31%
            "polyphenols": 1.31,   # +31%
            "vitamin_c": 1.15,     # +15%
            "minerals": 1.12,      # +12%
            "protein": 1.10,       # +10%
        }
        
        # 疾病リスク低減効果（MBT55プロバイオティクス実績より）
        self.disease_risk_reduction = {
            "chalkbrood": 0.95,     # チョーク病防御率95%
            "gut_inflammation": 0.70,  # 腸内炎症70%抑制
            "oral_health": 0.85,    # 口内環境85%改善
            "hemorrhoids": 0.90,    # 痔90%改善（実績）
        }
        
        # ベースライン健康データ
        self.baseline_health = {
            "nutrition_score": 50.0,
            "gut_health_score": 50.0,
            "antioxidant_score": 50.0,
            "inflammation_level": 50.0,
            "annual_medical_cost_jpy": 100000  # 平均10万円/年
        }
        
        # 医療費削減換算レート
        self.medical_cost_rate = 1000  # 1スコアポイント = 1000円削減
    
    def calculate_nutrition_impact(self,
                                   crop_type: str,
                                   consumption_kg: float,
                                   mbt_cultivated: bool = True) -> Dict[str, float]:
        """
        栄養摂取による健康インパクト計算
        
        Args:
            crop_type: 作物種別
            consumption_kg: 摂取量 (kg/年)
            mbt_cultivated: MBT栽培かどうか
        
        Returns:
            栄養インパクト
        """
        # ベース栄養価（作物別）
        base_nutrition = {
            "tomato": {"lycopene": 2.5, "polyphenols": 1.8, "vitamin_c": 14.0},
            "rice": {"protein": 7.5, "minerals": 1.2},
            "soybean": {"protein": 36.0, "isoflavones": 1.5},
            "coffee": {"chlorogenic_acid": 6.5, "antioxidant": 85.0},
            "default": {"protein": 10.0, "minerals": 1.0}
        }
        
        nutrients = base_nutrition.get(crop_type, base_nutrition["default"])
        
        # MBT栽培による栄養強化
        factor = 1.0
        if mbt_cultivated:
            # 各栄養素に個別の強化係数を適用
            for nutrient, boost in self.mbt_nutrition_boost.items():
                if nutrient in nutrients:
                    nutrients[nutrient] = nutrients[nutrient] * boost
            factor = 1.31  # 平均31%向上
        
        # 栄養スコア計算（摂取量ベース）
        nutrition_score = min(100, sum(nutrients.values()) * consumption_kg * 0.5)
        
        return {
            "crop_type": crop_type,
            "consumption_kg_per_year": consumption_kg,
            "mbt_cultivated": mbt_cultivated,
            "nutritional_values": nutrients,
            "nutrition_score": round(nutrition_score, 1),
            "improvement_factor": factor
        }
    
    def calculate_gut_health_impact(self,
                                   mbt_probiotics_consumed: bool = True,
                                   duration_months: int = 6) -> Dict[str, float]:
        """
        腸内環境改善効果の計算（MBT55プロバイオティクス実績ベース）
        
        Args:
            mbt_probiotics_consumed: MBT55プロバイオティクス摂取有無
            duration_months: 摂取期間（月）
        
        Returns:
            腸内環境改善効果
        """
        if not mbt_probiotics_consumed:
            return {
                "gut_health_score": self.baseline_health["gut_health_score"],
                "improvement_rate": 0,
                "constipation_relief": 0,
                "diarrhea_relief": 0
            }
        
        # 実績ベースの改善効果（MB016より）
        # - 便秘・下痢の解消
        # - ポリープ消滅
        # - 痔の完治（1週間）
        
        # 期間による効果の飽和
        effect_factor = min(1.0, duration_months / 3)  # 3ヶ月で最大効果
        
        # 腸内環境スコア改善（ベース50 → 最大85）
        gut_score = min(85, self.baseline_health["gut_health_score"] + 35 * effect_factor)
        improvement_rate = (gut_score - self.baseline_health["gut_health_score"]) / self.baseline_health["gut_health_score"] * 100
        
        return {
            "gut_health_score": round(gut_score, 1),
            "improvement_rate": round(improvement_rate, 1),
            "constipation_relief": round(85 * effect_factor, 1),
            "diarrhea_relief": round(85 * effect_factor, 1),
            "hemorrhoids_cure_rate": round(90 * effect_factor, 1) if duration_months >= 1 else 0,
            "duration_months": duration_months
        }
    
    def calculate_antioxidant_impact(self,
                                    mbt_food_consumed: bool = True,
                                    daily_servings: float = 1.0) -> Dict[str, float]:
        """
        抗酸化効果の計算
        
        Args:
            mbt_food_consumed: MBT農産物摂取有無
            daily_servings: 1日あたりの摂取量（サービング）
        
        Returns:
            抗酸化インパクト
        """
        base_antioxidant = self.baseline_health["antioxidant_score"]
        
        if not mbt_food_consumed:
            return {
                "antioxidant_score": base_antioxidant,
                "orsac_value": 0,  # Oxygen Radical Absorbance Capacity
                "inflammation_reduction": 0
            }
        
        # MBT農産物の抗酸化力向上（ポリフェノール+31%、MB004より）
        antioxidant_boost = 1.31
        serving_effect = min(1.5, 1.0 + (daily_servings - 1) * 0.2)
        
        antioxidant_score = min(95, base_antioxidant * antioxidant_boost * serving_effect)
        
        # 炎症抑制効果（抗酸化 → 炎症低減）
        inflammation_reduction = (antioxidant_score - base_antioxidant) * 0.8
        
        return {
            "antioxidant_score": round(antioxidant_score, 1),
            "improvement_rate": round((antioxidant_score - base_antioxidant) / base_antioxidant * 100, 1),
            "inflammation_reduction_percent": round(min(70, inflammation_reduction), 1),
            "daily_servings": daily_servings
        }
    
    def calculate_medical_cost_saving(self,
                                     health_impact: HealthImpact,
                                     age_group: str = "adult",
                                     household_size: int = 1) -> Dict[str, float]:
        """
        医療費削減効果の計算
        
        Args:
            health_impact: 健康インパクトデータ
            age_group: 年齢層（child, adult, senior）
            household_size: 世帯人数
        
        Returns:
            医療費削減額
        """
        # 年齢層別ベース医療費（年間、日本平均）
        base_medical_cost = {
            "child": 50000,
            "adult": 80000,
            "senior": 250000,
        }.get(age_group, 80000)
        
        # 健康スコアの総合値
        total_health_score = (
            health_impact.nutrition_score +
            health_impact.gut_health_score +
            health_impact.antioxidant_score
        ) / 3
        
        # 健康スコアと医療費の関係（線形モデル）
        # スコア100で医療費50%削減
        reduction_rate = (total_health_score / 100) * 0.5
        
        # 炎症抑制による追加削減
        inflammation_effect = health_impact.inflammation_reduction / 100 * 0.2
        
        total_reduction_rate = min(0.7, reduction_rate + inflammation_effect)
        
        saving_per_person = base_medical_cost * total_reduction_rate
        total_saving = saving_per_person * household_size
        
        return {
            "base_medical_cost_jpy": base_medical_cost,
            "reduction_rate_percent": round(total_reduction_rate * 100, 1),
            "saving_per_person_jpy": round(saving_per_person, 0),
            "household_size": household_size,
            "total_saving_jpy": round(total_saving, 0)
        }
    
    def calculate_health_pbpe(self,
                             health_impact: HealthImpact,
                             population_served: int = 1) -> Dict[str, float]:
        """
        Health PBPEの計算
        
        Health PBPE = 健康スコア × 人口 × 換算係数
        """
        # 総合健康スコア
        overall_health_score = (
            health_impact.nutrition_score * 0.3 +
            health_impact.gut_health_score * 0.3 +
            health_impact.antioxidant_score * 0.2 +
            (100 - health_impact.inflammation_reduction) * 0.2
        )
        
        # PBPE換算（健康スコア10点 = 1000 PBPE）
        health_pbpe = (overall_health_score / 10) * 1000 * population_served
        
        # 医療費削減からの換算（$1 = 0.1 PBPE）
        from_medical = health_impact.medical_cost_saving_usd * 0.1 * population_served
        
        total_pbpe = health_pbpe + from_medical
        
        return {
            "overall_health_score": round(overall_health_score, 1),
            "health_pbpe_calculated": round(health_pbpe, 0),
            "medical_saving_pbpe": round(from_medical, 0),
            "total_health_pbpe": round(total_pbpe, 0),
            "population_served": population_served
        }
    
    def integrate_with_agrix(self,
                            crop_type: str,
                            consumption_kg: float,
                            mbt_cultivated: bool = True,
                            mbt_probiotics: bool = True,
                            duration_months: int = 6,
                            population: int = 1) -> Dict[str, any]:
        """
        AGRIXと連携した総合健康インパクト計算
        """
        # 栄養インパクト
        nutrition = self.calculate_nutrition_impact(crop_type, consumption_kg, mbt_cultivated)
        
        # 腸内環境インパクト
        gut = self.calculate_gut_health_impact(mbt_probiotics, duration_months)
        
        # 抗酸化インパクト
        antioxidant = self.calculate_antioxidant_impact(mbt_cultivated, consumption_kg / 365)
        
        # 健康インパクト統合
        health_impact = HealthImpact(
            nutrition_score=nutrition["nutrition_score"],
            gut_health_score=gut["gut_health_score"],
            antioxidant_score=antioxidant["antioxidant_score"],
            inflammation_reduction=antioxidant["inflammation_reduction_percent"],
            medical_cost_saving_usd=0  # 後で計算
        )
        
        # 医療費削減
        medical = self.calculate_medical_cost_saving(health_impact, "adult", population)
        health_impact.medical_cost_saving_usd = medical["total_saving_jpy"] / 150  # JPY→USD簡易換算
        
        # Health PBPE
        pbpe = self.calculate_health_pbpe(health_impact, population)
        
        # 疾病リスク低減
        disease_risks = {
            "gut_inflammation_risk_reduction": self.disease_risk_reduction["gut_inflammation"],
            "oral_health_improvement": self.disease_risk_reduction["oral_health"]
        }
        
        return {
            "crop_type": crop_type,
            "population_served": population,
            "nutrition_impact": nutrition,
            "gut_health_impact": gut,
            "antioxidant_impact": antioxidant,
            "medical_cost_saving": medical,
            "health_pbpe": pbpe,
            "disease_risk_reduction": disease_risks,
            "total_health_score": pbpe["overall_health_score"]
        }
    
    def get_engine_status(self) -> Dict[str, any]:
        """エンジンの状態を返す"""
        return {
            "engine_name": "HealthBook Engine",
            "version": "1.0.0",
            "mbt_nutrition_boost_factors": self.mbt_nutrition_boost,
            "disease_risk_reduction": self.disease_risk_reduction,
            "supported_features": [
                "nutrition_impact",
                "gut_health_impact",
                "antioxidant_impact",
                "medical_cost_saving",
                "health_pbpe_calculation"
            ]
        }


# エンジンインスタンス
healthbook_engine = HealthBookEngine()


def test_engine():
    print("=" * 60)
    print("HealthBook Engine Test Results")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(healthbook_engine.get_engine_status())
    
    print("\n--- Nutrition Impact (Tomato, 100kg/year, MBT) ---")
    print(healthbook_engine.calculate_nutrition_impact("tomato", 100, True))
    
    print("\n--- Gut Health Impact (6 months MBT probiotics) ---")
    print(healthbook_engine.calculate_gut_health_impact(True, 6))
    
    print("\n--- Antioxidant Impact (MBT food, 2 servings/day) ---")
    print(healthbook_engine.calculate_antioxidant_impact(True, 2))
    
    print("\n--- Medical Cost Saving (Adult, 4 person household) ---")
    health_impact = HealthImpact(
        nutrition_score=75,
        gut_health_score=80,
        antioxidant_score=70,
        inflammation_reduction=40,
        medical_cost_saving_usd=0
    )
    print(healthbook_engine.calculate_medical_cost_saving(health_impact, "adult", 4))
    
    print("\n--- Health PBPE Calculation ---")
    print(healthbook_engine.calculate_health_pbpe(health_impact, 1000))
    
    print("\n--- Integrated with AGRIX (Tomato, 100kg, population 100) ---")
    result = healthbook_engine.integrate_with_agrix("tomato", 100, True, True, 12, 100)
    print(f"  Overall Health Score: {result['total_health_score']}")
    print(f"  Health PBPE: {result['health_pbpe']['total_health_pbpe']}")


if __name__ == "__main__":
    test_engine()
