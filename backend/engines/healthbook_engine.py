# backend/engines/healthbook_engine.py
"""
HealthBook Engine for PBPE Marketplace - Extended Version v2.0

Integrates:
- Estrobolome (Gut-hormone metabolism)
- AcetylCoA (Metabolic hub capacity)
- MBT55 strain-specific effects
- Health Deviation Codes (D301-D350)
- Health PBPE calculation with improved accuracy
"""

from typing import Dict, Optional, List, Any
from dataclasses import dataclass
from enum import Enum


class HealthDeviationCode(Enum):
    """健康関連Deviation Codes（D301〜D350）"""
    ESTROGEN_DEFICIENCY_MILD = "D301"
    ESTROGEN_DEFICIENCY_MODERATE = "D302"
    ESTROGEN_DEFICIENCY_SEVERE = "D303"
    ADRENAL_FATIGUE_MILD = "D321"
    ADRENAL_FATIGUE_MODERATE = "D322"
    ADRENAL_FATIGUE_SEVERE = "D323"
    MITOCHONDRIA_ATP_LOW = "D121"
    ACETYLCOA_LOW_MILD = "D101"
    ACETYLCOA_LOW_MODERATE = "D102"
    ACETYLCOA_LOW_SEVERE = "D103"
    INFLAMMATION_HIGH = "D141"
    ENDOCRINE_DOWNSHIFT = "D350"


@dataclass
class EstrobolomeProfile:
    """エストロボロームプロファイル"""
    activity_score: float          # 0-100
    estrogen_recycling_rate: float # 0-100
    beta_glucuronidase_activity: float  # 0-100
    gut_health_status: str         # "optimal" / "moderate" / "poor"
    risk_level: str                # "low" / "medium" / "high"


@dataclass
class AcetylCoAProfile:
    """アセチルCoA生成能力プロファイル"""
    capacity_score: float          # 0-100
    glucose_contribution: float    # 0-100
    lipid_contribution: float      # 0-100
    protein_contribution: float    # 0-100
    scfa_contribution: float       # 0-100
    bottleneck: Optional[str]      # 律速段階


@dataclass
class MBT55StrainEffect:
    """MBT55菌株別効果"""
    strain_id: str
    strain_name: str
    gut_health_improvement: float  # 0-100
    hormone_balance_improvement: float  # 0-100
    inflammation_reduction: float  # 0-100
    atp_improvement: float         # 0-100
    recommended_dosage_cfu: int


class HealthBookEngine:
    """
    HealthBook Engine for PBPE Marketplace - Extended Version
    
    Features:
    1. Estrobolome activity calculation (gut-hormone axis)
    2. AcetylCoA capacity calculation (metabolic hub)
    3. MBT55 strain-specific effect mapping
    4. Health PBPE calculation with improved accuracy
    5. Health Deviation Codes generation (D301-D350)
    """
    
    def __init__(self):
        # エストロボローム計算パラメータ
        self.estrobolome_params = {
            "fiber_weight": 0.35,
            "fermented_food_weight": 0.25,
            "bowel_movement_weight": 0.20,
            "processed_food_penalty": 0.30,
            "dysbiosis_penalty": 0.40
        }
        
        # アセチルCoA計算パラメータ
        self.acetylcoa_params = {
            "glucose_weight": 0.25,
            "lipid_weight": 0.20,
            "protein_weight": 0.15,
            "scfa_weight": 0.25,
            "mineral_weight": 0.10,
            "cold_penalty": 0.15,
            "stress_penalty": 0.10
        }
        
        # MBT55菌株ライブラリ
        self.mbt55_strains = {
            "MBT55-001": {
                "name": "Actinobacteria (放線菌株)",
                "gut_health_improvement": 85,
                "hormone_improvement": 75,
                "inflammation_reduction": 80,
                "atp_improvement": 60,
                "recommended_cfu": 2_000_000_000
            },
            "MBT55-002": {
                "name": "Bifidobacterium strain",
                "gut_health_improvement": 90,
                "hormone_improvement": 60,
                "inflammation_reduction": 85,
                "atp_improvement": 50,
                "recommended_cfu": 5_000_000_000
            },
            "MBT55-003": {
                "name": "Yeast (酵母株)",
                "gut_health_improvement": 70,
                "hormone_improvement": 85,
                "inflammation_reduction": 65,
                "atp_improvement": 75,
                "recommended_cfu": 1_000_000_000
            },
            "MBT55-004": {
                "name": "Lactobacillus strain",
                "gut_health_improvement": 80,
                "hormone_improvement": 70,
                "inflammation_reduction": 75,
                "atp_improvement": 55,
                "recommended_cfu": 10_000_000_000
            },
            "MBT55-005": {
                "name": "Bile-acid metabolizing bacteria",
                "gut_health_improvement": 75,
                "hormone_improvement": 90,
                "inflammation_reduction": 70,
                "atp_improvement": 80,
                "recommended_cfu": 3_000_000_000
            }
        }
        
        # Deviation Codesの閾値
        self.deviation_thresholds = {
            "D301": {"min": 40, "max": 60, "name": "Estrogen Deficiency (Mild)"},
            "D302": {"min": 20, "max": 40, "name": "Estrogen Deficiency (Moderate)"},
            "D303": {"min": 0, "max": 20, "name": "Estrogen Deficiency (Severe)"},
            "D321": {"min": 40, "max": 60, "name": "Adrenal Fatigue (Mild)"},
            "D322": {"min": 20, "max": 40, "name": "Adrenal Fatigue (Moderate)"},
            "D323": {"min": 0, "max": 20, "name": "Adrenal Fatigue (Severe)"},
            "D121": {"min": 0, "max": 50, "name": "Mitochondria ATP Low"},
            "D101": {"min": 40, "max": 60, "name": "AcetylCoA Low (Mild)"},
            "D102": {"min": 20, "max": 40, "name": "AcetylCoA Low (Moderate)"},
            "D103": {"min": 0, "max": 20, "name": "AcetylCoA Low (Severe)"},
            "D141": {"min": 60, "max": 100, "name": "Chronic Inflammation High"},
            "D350": {"min": 0, "max": 30, "name": "Endocrine Downshift"},
        }
    
    # ============================================================
    # 1. エストロボローム計算
    # ============================================================
    
    def calculate_estrobolome(self,
                             fiber_grams: float,
                             fermented_food_servings: float,
                             bowel_movement_count: float,
                             processed_food_score: float,
                             dysbiosis_score: float = 0.5,
                             stool_form_score: float = 4.0) -> EstrobolomeProfile:
        """
        エストロボローム活性を計算（腸内→ホルモン代謝）
        
        Args:
            fiber_grams: 食物繊維摂取量 (g/day)
            fermented_food_servings: 発酵食品摂取量 (servings/day)
            bowel_movement_count: 便通回数 (/day)
            processed_food_score: 加工食品スコア (0-1)
            dysbiosis_score: 腸内細菌バランススコア (0-1)
            stool_form_score: ブリストルスコア (1-7)
        
        Returns:
            EstrobolomeProfile
        """
        # ポジティブ要因
        positive_score = 0
        positive_score += min(30, fiber_grams / 10 * 30)
        positive_score += min(25, fermented_food_servings / 3 * 25)
        positive_score += min(20, (bowel_movement_count / 1.5) * 20)
        
        # ネガティブ要因
        negative_score = 0
        negative_score += processed_food_score * 30
        negative_score += dysbiosis_score * 40
        negative_score += abs(stool_form_score - 4) / 3 * 20
        
        # 総合スコア
        total_score = max(0, min(100, positive_score + (100 - negative_score) - 50))
        
        # エストロゲン再活性化率
        estrogen_recycling = total_score * 0.8 + (1 - processed_food_score) * 20
        
        # β-グルクロニダーゼ活性推定
        beta_glucuronidase = 50 + (fermented_food_servings / 3 * 30) - (processed_food_score * 40)
        beta_glucuronidase = max(0, min(100, beta_glucuronidase))
        
        # 腸内健康状態
        if total_score >= 70:
            gut_status = "optimal"
            risk = "low"
        elif total_score >= 40:
            gut_status = "moderate"
            risk = "medium"
        else:
            gut_status = "poor"
            risk = "high"
        
        return EstrobolomeProfile(
            activity_score=round(total_score, 1),
            estrogen_recycling_rate=round(estrogen_recycling, 1),
            beta_glucuronidase_activity=round(beta_glucuronidase, 1),
            gut_health_status=gut_status,
            risk_level=risk
        )
    
    # ============================================================
    # 2. アセチルCoA生成能力計算
    # ============================================================
    
    def calculate_acetylcoa_capacity(self,
                                    glucose_stability: float,
                                    lipid_quality: float,
                                    protein_intake: float,
                                    scfa_level: float,
                                    magnesium_score: float,
                                    cold_sensitivity: float,
                                    stress_level: float) -> AcetylCoAProfile:
        """
        アセチルCoA生成能力を計算（代謝ハブ）
        
        Args:
            glucose_stability: 糖代謝安定性 (0-100)
            lipid_quality: 脂質の質 (0-100)
            protein_intake: タンパク質摂取量 (g/day, 正規化)
            scfa_level: 短鎖脂肪酸レベル (0-100)
            magnesium_score: Mg充足度 (0-100)
            cold_sensitivity: 冷え感 (0-100)
            stress_level: ストレスレベル (0-100)
        
        Returns:
            AcetylCoAProfile
        """
        # 各経路の貢献
        glucose_contrib = glucose_stability * 0.25
        lipid_contrib = lipid_quality * 0.20
        protein_contrib = min(100, protein_intake * 2) * 0.15
        scfa_contrib = scfa_level * 0.25
        
        # 補助因子
        mineral_contrib = magnesium_score * 0.10
        
        total_supply = glucose_contrib + lipid_contrib + protein_contrib + scfa_contrib + mineral_contrib
        
        # 阻害要因
        cold_penalty = cold_sensitivity * 0.15
        stress_penalty = stress_level * 0.10
        
        capacity = max(0, min(100, total_supply - cold_penalty - stress_penalty))
        
        # 律速段階の特定
        contributions = {
            "glucose": glucose_contrib,
            "lipid": lipid_contrib,
            "protein": protein_contrib,
            "scfa": scfa_contrib,
            "mineral": mineral_contrib
        }
        bottleneck = min(contributions, key=contributions.get)
        
        return AcetylCoAProfile(
            capacity_score=round(capacity, 1),
            glucose_contribution=round(glucose_contrib, 1),
            lipid_contribution=round(lipid_contrib, 1),
            protein_contribution=round(protein_contrib, 1),
            scfa_contribution=round(scfa_contrib, 1),
            bottleneck=bottleneck
        )
    
    # ============================================================
    # 3. MBT55菌株別効果計算
    # ============================================================
    
    def get_mbt55_strain_effect(self, strain_id: str) -> Optional[MBT55StrainEffect]:
        """MBT55菌株別の効果を取得"""
        if strain_id not in self.mbt55_strains:
            return None
        
        strain = self.mbt55_strains[strain_id]
        return MBT55StrainEffect(
            strain_id=strain_id,
            strain_name=strain["name"],
            gut_health_improvement=strain["gut_health_improvement"],
            hormone_balance_improvement=strain["hormone_improvement"],
            inflammation_reduction=strain["inflammation_reduction"],
            atp_improvement=strain["atp_improvement"],
            recommended_dosage_cfu=strain["recommended_cfu"]
        )
    
    def recommend_optimal_strains(self,
                                  estrobolome_score: float,
                                  acetylcoa_score: float,
                                  inflammation_score: float) -> List[MBT55StrainEffect]:
        """代謝プロファイルに基づく最適なMBT55菌株を推薦"""
        recommendations = []
        
        # エストロボローム低下時
        if estrobolome_score < 50:
            recommendations.append(self.get_mbt55_strain_effect("MBT55-005"))  # 胆汁酸代謝菌
        
        # アセチルCoA低下時
        if acetylcoa_score < 50:
            recommendations.append(self.get_mbt55_strain_effect("MBT55-003"))  # 酵母株
        
        # 炎症高値時
        if inflammation_score > 60:
            recommendations.append(self.get_mbt55_strain_effect("MBT55-002"))  # Bifidobacterium
        
        # デフォルトで腸内健康維持
        if len(recommendations) == 0:
            recommendations.append(self.get_mbt55_strain_effect("MBT55-001"))  # 放線菌株
            recommendations.append(self.get_mbt55_strain_effect("MBT55-004"))  # Lactobacillus
        
        return recommendations[:3]  # 最大3菌株
    
    # ============================================================
    # 4. Deviation Codes生成
    # ============================================================
    
    def generate_health_deviation_codes(self,
                                       estrobolome_score: float,
                                       acetylcoa_score: float,
                                       inflammation_score: float,
                                       sleep_quality: float,
                                       stress_level: float,
                                       fatigue_score: float) -> List[Dict[str, Any]]:
        """
        健康状態からDeviation Codesを生成
        
        Returns:
            Deviationコードのリスト
        """
        deviations = []
        
        # エストロゲン関連
        if estrobolome_score < 60:
            if estrobolome_score >= 40:
                deviations.append({
                    "code": HealthDeviationCode.ESTROGEN_DEFICIENCY_MILD.value,
                    "name": self.deviation_thresholds["D301"]["name"],
                    "severity": "mild",
                    "score": estrobolome_score
                })
            elif estrobolome_score >= 20:
                deviations.append({
                    "code": HealthDeviationCode.ESTROGEN_DEFICIENCY_MODERATE.value,
                    "name": self.deviation_thresholds["D302"]["name"],
                    "severity": "moderate",
                    "score": estrobolome_score
                })
            else:
                deviations.append({
                    "code": HealthDeviationCode.ESTROGEN_DEFICIENCY_SEVERE.value,
                    "name": self.deviation_thresholds["D303"]["name"],
                    "severity": "severe",
                    "score": estrobolome_score
                })
        
        # アセチルCoA関連
        if acetylcoa_score < 60:
            if acetylcoa_score >= 40:
                deviations.append({
                    "code": HealthDeviationCode.ACETYLCOA_LOW_MILD.value,
                    "name": self.deviation_thresholds["D101"]["name"],
                    "severity": "mild",
                    "score": acetylcoa_score
                })
            elif acetylcoa_score >= 20:
                deviations.append({
                    "code": HealthDeviationCode.ACETYLCOA_LOW_MODERATE.value,
                    "name": self.deviation_thresholds["D102"]["name"],
                    "severity": "moderate",
                    "score": acetylcoa_score
                })
            else:
                deviations.append({
                    "code": HealthDeviationCode.ACETYLCOA_LOW_SEVERE.value,
                    "name": self.deviation_thresholds["D103"]["name"],
                    "severity": "severe",
                    "score": acetylcoa_score
                })
        
        # 炎症関連
        if inflammation_score > 60:
            deviations.append({
                "code": HealthDeviationCode.INFLAMMATION_HIGH.value,
                "name": self.deviation_thresholds["D141"]["name"],
                "severity": "moderate" if inflammation_score < 80 else "severe",
                "score": inflammation_score
            })
        
        # 副腎疲労関連
        adrenal_score = (stress_level + (100 - sleep_quality) + fatigue_score) / 3
        if adrenal_score < 60:
            if adrenal_score >= 40:
                deviations.append({
                    "code": HealthDeviationCode.ADRENAL_FATIGUE_MILD.value,
                    "name": self.deviation_thresholds["D321"]["name"],
                    "severity": "mild",
                    "score": adrenal_score
                })
            elif adrenal_score >= 20:
                deviations.append({
                    "code": HealthDeviationCode.ADRENAL_FATIGUE_MODERATE.value,
                    "name": self.deviation_thresholds["D322"]["name"],
                    "severity": "moderate",
                    "score": adrenal_score
                })
            else:
                deviations.append({
                    "code": HealthDeviationCode.ADRENAL_FATIGUE_SEVERE.value,
                    "name": self.deviation_thresholds["D323"]["name"],
                    "severity": "severe",
                    "score": adrenal_score
                })
        
        # 総合内分泌低下
        endocrine_score = (estrobolome_score + acetylcoa_score + (100 - inflammation_score) + adrenal_score) / 4
        if endocrine_score < 30:
            deviations.append({
                "code": HealthDeviationCode.ENDOCRINE_DOWNSHIFT.value,
                "name": self.deviation_thresholds["D350"]["name"],
                "severity": "severe",
                "score": endocrine_score
            })
        
        return deviations
    
    # ============================================================
    # 5. 改善版Health PBPE計算
    # ============================================================
    
    def calculate_health_pbpe_enhanced(self,
                                       population: int,
                                       estrobolome_score: float,
                                       acetylcoa_score: float,
                                       inflammation_score: float,
                                       medical_cost_saving_usd: float = 0,
                                       mbt55_strain_effects: List[MBT55StrainEffect] = None) -> Dict[str, float]:
        """
        拡張版Health PBPE計算
        
        Health PBPE = (Estrobolome効果 × AcetylCoA効果 × 抗炎症効果) × 人口 × 換算係数
        """
        # 基本健康スコア（Estrobolome + AcetylCoA + 抗炎症の複合）
        anti_inflammatory_score = max(0, 100 - inflammation_score)
        base_health_score = (estrobolome_score * 0.3 + acetylcoa_score * 0.4 + anti_inflammatory_score * 0.3)
        
        # MBT55菌株効果による補正
        mbt_boost = 1.0
        if mbt55_strain_effects:
            avg_gut = sum(e.gut_health_improvement for e in mbt55_strain_effects) / len(mbt55_strain_effects)
            avg_hormone = sum(e.hormone_balance_improvement for e in mbt55_strain_effects) / len(mbt55_strain_effects)
            avg_inflammation = sum(e.inflammation_reduction for e in mbt55_strain_effects) / len(mbt55_strain_effects)
            mbt_boost = 1.0 + (avg_gut * 0.3 + avg_hormone * 0.4 + avg_inflammation * 0.3) / 100
        
        # 総合健康スコア
        overall_health = base_health_score * mbt_boost
        
        # Health PBPE換算（スコア10点 = 1000 PBPE）
        health_pbpe = (overall_health / 10) * 1000 * population
        
        # 医療費削減からの換算（$1 = 0.1 PBPE）
        from_medical = medical_cost_saving_usd * 0.1 * population
        
        total_pbpe = health_pbpe + from_medical
        
        return {
            "estrobolome_score": round(estrobolome_score, 1),
            "acetylcoa_score": round(acetylcoa_score, 1),
            "anti_inflammatory_score": round(anti_inflammatory_score, 1),
            "base_health_score": round(base_health_score, 1),
            "mbt_boost_factor": round(mbt_boost, 2),
            "overall_health_score": round(overall_health, 1),
            "health_pbpe_calculated": round(health_pbpe, 0),
            "medical_saving_pbpe": round(from_medical, 0),
            "total_health_pbpe": round(total_pbpe, 0),
            "population_served": population
        }
    
    # ============================================================
    # 6. 統合健康評価（拡張版）
    # ============================================================
    
    def comprehensive_health_assessment(self,
                                       fiber_grams: float = 15,
                                       fermented_food_servings: float = 1,
                                       bowel_movement_count: float = 1.2,
                                       processed_food_score: float = 0.3,
                                       glucose_stability: float = 70,
                                       lipid_quality: float = 60,
                                       protein_intake: float = 60,
                                       scfa_level: float = 65,
                                       magnesium_score: float = 70,
                                       cold_sensitivity: float = 40,
                                       stress_level: float = 40,
                                       sleep_quality: float = 70,
                                       fatigue_score: float = 35,
                                       population: int = 1,
                                       medical_cost_saving_usd: float = 0) -> Dict[str, Any]:
        """
        統合健康評価（拡張版）
        
        Returns:
            エストロボローム、アセチルCoA、Deviation Codes、Health PBPEを含む完全な評価
        """
        # 1. エストロボローム計算
        estrobolome = self.calculate_estrobolome(
            fiber_grams, fermented_food_servings, bowel_movement_count,
            processed_food_score
        )
        
        # 2. アセチルCoA計算
        acetylcoa = self.calculate_acetylcoa_capacity(
            glucose_stability, lipid_quality, protein_intake, scfa_level,
            magnesium_score, cold_sensitivity, stress_level
        )
        
        # 3. 炎症スコア
        inflammation_score = min(100, processed_food_score * 100 + (100 - sleep_quality) * 0.5 + stress_level * 0.3)
        
        # 4. MBT55菌株推薦
        recommended_strains = self.recommend_optimal_strains(
            estrobolome.activity_score, acetylcoa.capacity_score, inflammation_score
        )
        
        # 5. Deviation Codes
        deviations = self.generate_health_deviation_codes(
            estrobolome.activity_score, acetylcoa.capacity_score,
            inflammation_score, sleep_quality, stress_level, fatigue_score
        )
        
        # 6. Health PBPE計算
        health_pbpe = self.calculate_health_pbpe_enhanced(
            population, estrobolome.activity_score, acetylcoa.capacity_score,
            inflammation_score, medical_cost_saving_usd, recommended_strains
        )
        
        return {
            "estrobolome_profile": {
                "activity_score": estrobolome.activity_score,
                "estrogen_recycling_rate": estrobolome.estrogen_recycling_rate,
                "beta_glucuronidase_activity": estrobolome.beta_glucuronidase_activity,
                "gut_health_status": estrobolome.gut_health_status,
                "risk_level": estrobolome.risk_level
            },
            "acetylcoa_profile": {
                "capacity_score": acetylcoa.capacity_score,
                "bottleneck": acetylcoa.bottleneck,
                "glucose_contribution": acetylcoa.glucose_contribution,
                "lipid_contribution": acetylcoa.lipid_contribution,
                "protein_contribution": acetylcoa.protein_contribution,
                "scfa_contribution": acetylcoa.scfa_contribution
            },
            "inflammation_score": round(inflammation_score, 1),
            "recommended_mbt55_strains": [
                {"strain_id": s.strain_id, "strain_name": s.strain_name, "recommended_cfu": s.recommended_dosage_cfu}
                for s in recommended_strains
            ],
            "health_deviation_codes": deviations,
            "health_pbpe": health_pbpe,
            "summary": {
                "overall_health_grade": "A" if health_pbpe["overall_health_score"] >= 80 else
                                       "B" if health_pbpe["overall_health_score"] >= 60 else
                                       "C" if health_pbpe["overall_health_score"] >= 40 else "D",
                "primary_concern": deviations[0]["name"] if deviations else "None",
                "recommended_action": self._get_recommended_action(deviations, estrobolome.activity_score)
            }
        }
    
    def _get_recommended_action(self, deviations: List[Dict], estrobolome_score: float) -> str:
        """推奨アクションを生成"""
        if not deviations:
            return "Continue current healthy lifestyle"
        
        codes = [d["code"] for d in deviations]
        if "D301" in codes or "D302" in codes or "D303" in codes:
            return "Increase fiber and fermented foods intake for Estrobolome support"
        elif "D101" in codes or "D102" in codes or "D103" in codes:
            return "Focus on metabolic support: balanced nutrition, Mg supplementation, reduce cold exposure"
        elif "D141" in codes:
            return "Anti-inflammatory lifestyle: reduce processed foods, improve sleep quality"
        elif "D321" in codes or "D322" in codes or "D323" in codes:
            return "Stress management and sleep optimization recommended"
        else:
            return "Comprehensive metabolic assessment recommended"
    
    def get_engine_status(self) -> Dict[str, Any]:
        """エンジン状態を返す"""
        return {
            "engine_name": "HealthBook Engine for PBPE Marketplace",
            "version": "2.0.0",
            "features": [
                "Estrobolome activity calculation",
                "AcetylCoA capacity calculation",
                "MBT55 strain recommendation",
                "Health Deviation Codes (D301-D350)",
                "Enhanced Health PBPE calculation"
            ],
            "supported_strains": list(self.mbt55_strains.keys()),
            "deviation_codes_supported": list(self.deviation_thresholds.keys())
        }


# エンジンインスタンス
healthbook_engine = HealthBookEngine()


def test_engine():
    print("=" * 60)
    print("HealthBook Engine v2.0 - PBPE Marketplace Test")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(healthbook_engine.get_engine_status())
    
    print("\n--- Estrobolome Calculation (Standard diet) ---")
    result = healthbook_engine.calculate_estrobolome(
        fiber_grams=20, fermented_food_servings=2,
        bowel_movement_count=1.2, processed_food_score=0.3
    )
    print(f"  Activity Score: {result.activity_score}")
    print(f"  Estrogen Recycling: {result.estrogen_recycling_rate}%")
    print(f"  Gut Status: {result.gut_health_status}")
    
    print("\n--- AcetylCoA Capacity Calculation ---")
    result2 = healthbook_engine.calculate_acetylcoa_capacity(
        glucose_stability=75, lipid_quality=70, protein_intake=70,
        scfa_level=65, magnesium_score=70, cold_sensitivity=35, stress_level=40
    )
    print(f"  Capacity Score: {result2.capacity_score}")
    print(f"  Bottleneck: {result2.bottleneck}")
    
    print("\n--- MBT55 Strain Recommendation ---")
    strains = healthbook_engine.recommend_optimal_strains(45, 55, 65)
    for s in strains:
        print(f"  {s.strain_id}: {s.strain_name} (CFU: {s.recommended_dosage_cfu:,})")
    
    print("\n--- Health Deviation Codes ---")
    deviations = healthbook_engine.generate_health_deviation_codes(45, 55, 65, 65, 40, 35)
    for d in deviations:
        print(f"  {d['code']}: {d['name']} ({d['severity']})")
    
    print("\n--- Comprehensive Health Assessment ---")
    assessment = healthbook_engine.comprehensive_health_assessment(population=1000)
    print(f"  Overall Health Grade: {assessment['summary']['overall_health_grade']}")
    print(f"  Primary Concern: {assessment['summary']['primary_concern']}")
    print(f"  Health PBPE: {assessment['health_pbpe']['total_health_pbpe']:,}")


if __name__ == "__main__":
    test_engine()
