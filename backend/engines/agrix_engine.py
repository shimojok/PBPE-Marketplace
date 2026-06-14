# backend/engines/agrix_engine.py
"""
AGRIX Engine - Agricultural Impact Quantification

Functions:
- Yield prediction with MBT55 fertilizer
- Nutritional value calculation (lycopene, polyphenols)
- Soil carbon integration with MBT55
- Quality scoring
"""

from typing import Dict, Optional
import math


class AGRIXEngine:
    """
    AGRIX Engine for crop yield and nutrition impact quantification
    
    Integrates with MBT55 Engine for soil carbon and fertilizer effects
    """
    
    def __init__(self):
        # 作物別ベース収量 (ton/ha)
        self.base_yields = {
            "rice": 5.2,
            "tomato": 45.0,
            "soybean": 2.8,
            "maize": 6.5,
            "wheat": 3.5,
            "coffee": 1.2,
            "default": 5.0
        }
        
        # MBT肥料による増収効果 (MB004より)
        self.mbt_yield_improvement = {
            "rice": 1.05,      # +5%
            "tomato": 1.08,    # +8%
            "soybean": 1.07,   # +7%
            "maize": 1.12,     # +12%
            "wheat": 1.06,     # +6%
            "coffee": 1.15,    # +15%
            "default": 1.05
        }
        
        # 栄養価ベースライン (index)
        self.nutrition_baseline = {
            "rice": {"protein": 7.5, "minerals": 1.2},
            "tomato": {"lycopene": 2.5, "polyphenols": 1.8, "vitamin_c": 14.0},
            "soybean": {"protein": 36.0, "isoflavones": 1.5},
            "coffee": {"chlorogenic_acid": 6.5, "antioxidant": 85.0},
            "default": {"protein": 10.0, "minerals": 1.0}
        }
        
        # MBT施肥による栄養価改善率 (MB004より)
        self.mbt_nutrition_improvement = {
            "rice": 1.12,       # +12%
            "tomato": 1.31,     # +31% (MB004: リコピン・ポリフェノール)
            "soybean": 1.18,    # +18%
            "coffee": 1.25,     # +25%
            "default": 1.10
        }
        
        # 土壌炭素連携パラメータ
        self.soc_to_yield_factor = 0.15  # SOC 1t/haあたり収量増加率
    
    def predict_yield(self,
                     crop_type: str,
                     area_ha: float,
                     mbt_applied: bool = True,
                     soc_increase: Optional[float] = None) -> Dict[str, float]:
        """
        収量予測
        
        Args:
            crop_type: 作物種別
            area_ha: 面積 (ヘクタール)
            mbt_applied: MBT肥料施用の有無
            soc_increase: 土壌炭素増加量 (tCO₂e/ha) - MBT55エンジンから連携
        
        Returns:
            収量予測結果
        """
        base_yield = self.base_yields.get(crop_type, self.base_yields["default"])
        
        # MBT肥料効果
        mbt_factor = self.mbt_yield_improvement.get(crop_type, self.mbt_yield_improvement["default"])
        yield_with_mbt = base_yield * mbt_factor if mbt_applied else base_yield
        
        # 土壌炭素効果 (MBT55エンジンからの連携)
        soc_factor = 1.0
        if soc_increase is not None:
            # SOC増加 → 収量増加 (線形モデル)
            soc_factor = 1.0 + (soc_increase / 100) * self.soc_to_yield_factor
        
        final_yield_per_ha = yield_with_mbt * soc_factor
        total_yield = final_yield_per_ha * area_ha
        
        return {
            "crop_type": crop_type,
            "base_yield_t_per_ha": base_yield,
            "mbt_factor": mbt_factor if mbt_applied else 1.0,
            "soc_factor": soc_factor,
            "final_yield_t_per_ha": round(final_yield_per_ha, 2),
            "total_yield_t": round(total_yield, 2),
            "area_ha": area_ha,
            "mbt_applied": mbt_applied
        }
    
    def calculate_nutrition(self,
                           crop_type: str,
                           yield_ton: float,
                           mbt_applied: bool = True) -> Dict[str, any]:
        """
        栄養価計算
        
        Returns:
            栄養価スコアと機能性成分含有量
        """
        baseline = self.nutrition_baseline.get(crop_type, self.nutrition_baseline["default"])
        improvement = self.mbt_nutrition_improvement.get(crop_type, self.mbt_nutrition_improvement["default"])
        
        # MBTによる栄養価改善
        factor = improvement if mbt_applied else 1.0
        
        nutrition_values = {}
        for component, value in baseline.items():
            nutrition_values[component] = round(value * factor, 2)
        
        # 総合栄養スコア (0-100)
        if crop_type == "tomato":
            # リコピン + ポリフェノールの加重平均
            lycopene_score = min(100, nutrition_values.get("lycopene", 0) / 5.0 * 100)
            polyphenol_score = min(100, nutrition_values.get("polyphenols", 0) / 3.0 * 100)
            nutrition_score = round((lycopene_score + polyphenol_score) / 2, 1)
        elif crop_type == "coffee":
            # クロロゲン酸 + 抗酸化能
            chlorogenic_score = min(100, nutrition_values.get("chlorogenic_acid", 0) / 10.0 * 100)
            nutrition_score = round(chlorogenic_score, 1)
        else:
            # タンパク質ベース
            nutrition_score = round(min(100, nutrition_values.get("protein", 0) / 40.0 * 100), 1)
        
        return {
            "crop_type": crop_type,
            "nutrition_components": nutrition_values,
            "nutrition_score": nutrition_score,
            "improvement_factor": factor if mbt_applied else 1.0,
            "mbt_applied": mbt_applied
        }
    
    def calculate_soil_health_index(self,
                                   soc_tco2e_per_ha: float,
                                   microbial_diversity: float = 0.7,
                                   ph: float = 6.5) -> Dict[str, float]:
        """
        土壌健康指数 (SHEスコア) の計算
        
        Args:
            soc_tco2e_per_ha: 土壌有機炭素量 (tCO₂e/ha)
            microbial_diversity: 微生物多様性指数 (0-1)
            ph: 土壌pH
        
        Returns:
            土壌健康指数
        """
        # SOCスコア (目標: 100 tCO₂e/haで100点)
        soc_score = min(100, (soc_tco2e_per_ha / 100) * 100)
        
        # 微生物多様性スコア
        diversity_score = microbial_diversity * 100
        
        # pHスコア (最適範囲: 6.0-7.0)
        if 6.0 <= ph <= 7.0:
            ph_score = 100
        elif 5.0 <= ph < 6.0:
            ph_score = 70
        elif 7.0 < ph <= 8.0:
            ph_score = 70
        else:
            ph_score = 50
        
        # 総合SHEスコア (加重平均)
        she_score = round(soc_score * 0.5 + diversity_score * 0.3 + ph_score * 0.2, 1)
        
        return {
            "she_score": she_score,
            "soc_score": round(soc_score, 1),
            "diversity_score": round(diversity_score, 1),
            "ph_score": ph_score,
            "components": {
                "soc_tco2e_per_ha": soc_tco2e_per_ha,
                "microbial_diversity": microbial_diversity,
                "ph": ph
            }
        }
    
    def calculate_quality_score(self,
                               crop_type: str,
                               mbt_applied: bool = True,
                               freshness_days: int = 1) -> Dict[str, any]:
        """
        品質スコア計算 (鮮度・糖度・外観)
        
        Returns:
            品質スコアと詳細
        """
        # ベース品質 (MBTなし)
        base_scores = {
            "rice": {"taste": 75, "appearance": 80, "freshness_retention": 70},
            "tomato": {"sugar": 70, "appearance": 75, "freshness_retention": 65},
            "coffee": {"aroma": 80, "acidity": 75, "body": 75},
            "default": {"quality": 70}
        }
        
        base = base_scores.get(crop_type, base_scores["default"])
        
        # MBT品質改善効果 (MBT55による鮮度保持)
        if mbt_applied:
            # MBT55による鮮度保持効果 (MB003, MB018より)
            freshness_factor = 1.5  # 鮮度保持期間1.5倍
            sugar_improvement = 1.12  # 糖度12%向上
        else:
            freshness_factor = 1.0
            sugar_improvement = 1.0
        
        # 経過日数による鮮度低下
        freshness_decay = math.exp(-0.1 * freshness_days / freshness_factor)
        
        quality_scores = {}
        for metric, value in base.items():
            if metric == "freshness_retention":
                quality_scores[metric] = round(min(100, value * freshness_decay), 1)
            elif metric == "sugar" and mbt_applied:
                quality_scores[metric] = round(min(100, value * sugar_improvement), 1)
            else:
                quality_scores[metric] = round(value, 1)
        
        # 総合品質スコア
        overall = round(sum(quality_scores.values()) / len(quality_scores), 1)
        
        return {
            "crop_type": crop_type,
            "quality_scores": quality_scores,
            "overall_quality_score": overall,
            "freshness_days": freshness_days,
            "mbt_applied": mbt_applied
        }
    
    def calculate_agri_impact(self,
                             crop_type: str,
                             area_ha: float,
                             mbt_applied: bool = True,
                             soc_increase: Optional[float] = None) -> Dict[str, any]:
        """
        AGRIX統合インパクト計算
        
        収量・栄養・品質・土壌健康を統合した総合評価
        """
        # 収量予測
        yield_result = self.predict_yield(crop_type, area_ha, mbt_applied, soc_increase)
        
        # 栄養価計算
        nutrition_result = self.calculate_nutrition(crop_type, yield_result["total_yield_t"], mbt_applied)
        
        # 品質スコア
        quality_result = self.calculate_quality_score(crop_type, mbt_applied)
        
        # 土壌健康指数 (SOC情報があれば)
        soil_health = None
        if soc_increase is not None:
            # SOCから土壌炭素量を推定 (1tCO₂e ≈ 0.27tC)
            soc_t_per_ha = soc_increase * 0.27
            soil_health = self.calculate_soil_health_index(soc_t_per_ha)
        
        # 総合AGRインパクトスコア (0-100)
        impact_components = {
            "yield": min(100, (yield_result["final_yield_t_per_ha"] / 10) * 100),
            "nutrition": nutrition_result["nutrition_score"],
            "quality": quality_result["overall_quality_score"]
        }
        
        if soil_health:
            impact_components["soil_health"] = soil_health["she_score"]
        
        agri_score = round(sum(impact_components.values()) / len(impact_components), 1)
        
        return {
            "crop_type": crop_type,
            "area_ha": area_ha,
            "agri_impact_score": agri_score,
            "yield": yield_result,
            "nutrition": nutrition_result,
            "quality": quality_result,
            "soil_health": soil_health,
            "impact_components": impact_components
        }
    
    def get_engine_status(self) -> Dict[str, any]:
        """エンジンの状態を返す"""
        return {
            "engine_name": "AGRIX Engine",
            "version": "1.0.0",
            "supported_crops": list(self.base_yields.keys()),
            "mbt_integration": True,
            "soc_integration": True
        }


# エンジンインスタンス
agrix_engine = AGRIXEngine()


def test_engine():
    print("=" * 60)
    print("AGRIX Engine Test Results")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(agrix_engine.get_engine_status())
    
    print("\n--- Yield Prediction (Tomato, 1ha, MBT applied) ---")
    print(agrix_engine.predict_yield("tomato", 1.0, True))
    
    print("\n--- Nutrition Calculation (Tomato, MBT applied) ---")
    print(agrix_engine.calculate_nutrition("tomato", 50, True))
    
    print("\n--- Soil Health Index (SOC: 50 tCO₂e/ha) ---")
    print(agrix_engine.calculate_soil_health_index(50, 0.85, 6.5))
    
    print("\n--- Quality Score (Coffee, MBT applied) ---")
    print(agrix_engine.calculate_quality_score("coffee", True, 3))
    
    print("\n--- Integrated AGRI Impact ---")
    print(agrix_engine.calculate_agri_impact("tomato", 1.0, True, 50))


if __name__ == "__main__":
    test_engine()
