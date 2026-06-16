# backend/engines/healthbook_extended_engine.py
"""
HealthBook Extended Engine - AI-based Kampo Recommendation System

Integrates:
- 200-question survey (eating habits, lifestyle, symptoms)
- 7 metabolic pathways (PATH_00 to PATH_06)
- 137 diseases × 293 Kampo formulas matrix
- MBT55 fermentation optimization
"""

import json
import os
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class MetabolicProfile:
    """代謝プロファイル（7つの代謝経路スコア）"""
    hydrolysis: float = 0.5      # PATH_00: 加水分解
    polyphenol: float = 0.5      # PATH_01: ポリフェノール活性化
    redox: float = 0.5           # PATH_02: 酸化還元
    lipid_signaling: float = 0.5 # PATH_03: 脂質シグナル
    neuroactive: float = 0.5     # PATH_04: 神経活性
    fermentation: float = 0.5    # PATH_05: 発酵・SCFA
    bioactive_peptide: float = 0.5 # PATH_06: 生理活性ペプチド
    
    def to_dict(self) -> Dict[str, float]:
        return {
            "hydrolysis": self.hydrolysis,
            "polyphenol": self.polyphenol,
            "redox": self.redox,
            "lipid_signaling": self.lipid_signaling,
            "neuroactive": self.neuroactive,
            "fermentation": self.fermentation,
            "bioactive_peptide": self.bioactive_peptide
        }
    
    def to_path_dict(self) -> Dict[str, float]:
        return {
            "PATH_00": self.hydrolysis,
            "PATH_01": self.polyphenol,
            "PATH_02": self.redox,
            "PATH_03": self.lipid_signaling,
            "PATH_04": self.neuroactive,
            "PATH_05": self.fermentation,
            "PATH_06": self.bioactive_peptide
        }


@dataclass
class KampoRecommendation:
    """漢方処方推薦結果"""
    formula_id: str
    name_ja: str
    name_en: str
    category_ja: str
    category_en: str
    score: float
    main_herbs_ja: List[str]
    main_herbs_en: List[str]
    indications_ja: List[str]
    indications_en: List[str]
    mbt55_enhanced: bool
    bioavailability_boost: float
    recommended_strains: List[str]


@dataclass
class HealthAssessment:
    """健康評価結果"""
    metabolic_profile: MetabolicProfile
    primary_diseases: List[Dict[str, Any]]  # 推定疾病と確度
    recommended_kampo: List[KampoRecommendation]
    lifestyle_advice_ja: List[str]
    lifestyle_advice_en: List[str]
    mbt55_probiotics_effect: Dict[str, float]


class HealthBookExtendedEngine:
    """
    HealthBook Extended Engine
    
    機能:
    1. 200問アンケートから代謝経路スコアを計算
    2. 137疾病マトリックスから推定疾病を特定
    3. 293処方から最適な漢方処方を推薦
    4. MBT55発酵による最適化提案
    """
    
    def __init__(self, data_dir: Optional[str] = None):
        self.data_dir = data_dir or Path(__file__).parent.parent / "data"
        
        # データ読み込み
        self.questionnaire_en = self._load_json("questionnaire_200_en.json")
        self.questionnaire_jp = self._load_json("questionnaire_200_jp.json")
        self.disease_matrix = self._load_json("disease_matrix_137.json")
        self.kampo_library = self._load_json("kampo_metabolic_library.json")
        self.animal_library = self._load_json("animal_metabolic_library.json")
        self.pathway_weights = self._load_json("questionnaire_pathway_matrix.json")
        self.pathway_definitions = self._load_json("pathway_definition.json")
        
        # 代謝経路のデフォルト重み
        self.pathway_default_weights = {
            "PATH_00": 0.5,
            "PATH_01": 0.5,
            "PATH_02": 0.5,
            "PATH_03": 0.5,
            "PATH_04": 0.5,
            "PATH_05": 0.5,
            "PATH_06": 0.5
        }
        
        # MBT55発酵によるバイオアベイラビリティ向上係数
        self.mbt_boost_factors = {
            "low": 1.5,
            "medium": 2.5,
            "high": 5.0
        }
    
    def _load_json(self, filename: str) -> Dict:
        """JSONファイルを読み込む"""
        filepath = Path(self.data_dir) / filename
        if filepath.exists():
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def calculate_metabolic_profile(self, 
                                   answers: Dict[str, int],
                                   language: str = "jp") -> MetabolicProfile:
        """
        アンケート回答から代謝経路スコアを計算
        
        Args:
            answers: {question_id: score} スコアは1-5（1:全然当てはまらない〜5:非常に当てはまる）
            language: "jp" or "en"
        
        Returns:
            MetabolicProfile（7つの代謝経路スコア、0-1範囲）
        """
        # 初期スコア
        scores = {pathway: 0.5 for pathway in self.pathway_default_weights.keys()}
        counts = {pathway: 1 for pathway in self.pathway_default_weights.keys()}
        
        # 各質問の重みを適用
        for q_id, answer_score in answers.items():
            q_key = f"Q{q_id:03d}"
            if q_key not in self.pathway_weights:
                continue
            
            weights = self.pathway_weights[q_key].get("weights", {})
            for pathway, weight in weights.items():
                if pathway in scores:
                    # 回答スコア（1-5）を-2〜2の範囲に変換
                    normalized_answer = (answer_score - 3) / 2
                    scores[pathway] += normalized_answer * weight
                    counts[pathway] += 1
        
        # 正規化（0-1範囲）
        for pathway in scores:
            scores[pathway] = max(0.0, min(1.0, (scores[pathway] + 1) / 2))
        
        return MetabolicProfile(
            hydrolysis=scores.get("PATH_00", 0.5),
            polyphenol=scores.get("PATH_01", 0.5),
            redox=scores.get("PATH_02", 0.5),
            lipid_signaling=scores.get("PATH_03", 0.5),
            neuroactive=scores.get("PATH_04", 0.5),
            fermentation=scores.get("PATH_05", 0.5),
            bioactive_peptide=scores.get("PATH_06", 0.5)
        )
    
    def identify_diseases(self, 
                         metabolic_profile: MetabolicProfile,
                         top_n: int = 5) -> List[Dict[str, Any]]:
        """
        代謝プロファイルから推定疾病を特定
        
        Args:
            metabolic_profile: 代謝プロファイル
            top_n: 返す疾病数
        
        Returns:
            推定疾病リスト（スコア順）
        """
        profile_dict = metabolic_profile.to_path_dict()
        disease_scores = []
        
        for disease in self.disease_matrix.get("disease_matrix", []):
            # 疾病に関連する処方の代謝経路を分析
            total_score = 0
            count = 0
            
            for kampo_id in disease.get("recommended_kampo", []):
                kampo = self._find_kampo_by_id(kampo_id)
                if kampo:
                    # 漢方の代謝経路プロファイルを推定
                    kampo_profile = self._estimate_kampo_pathway_profile(kampo)
                    for pathway, score in kampo_profile.items():
                        if pathway in profile_dict:
                            total_score += profile_dict[pathway] * score
                            count += 1
            
            if count > 0:
                avg_score = total_score / count
                disease_scores.append({
                    "disease_id": disease.get("disease_id"),
                    "disease_name_ja": disease.get("disease_name_ja"),
                    "disease_name_en": disease.get("disease_name_en"),
                    "category_ja": self.disease_matrix.get("disease_categories", {}).get(
                        disease.get("category", ""), disease.get("category", "")),
                    "confidence_score": round(avg_score, 3),
                    "evidence_level": disease.get("evidence_level", "C"),
                    "recommended_kampo": disease.get("recommended_kampo", [])[:3]
                })
        
        # スコア降順でソート
        disease_scores.sort(key=lambda x: x["confidence_score"], reverse=True)
        
        return disease_scores[:top_n]
    
    def recommend_kampo(self,
                       metabolic_profile: MetabolicProfile,
                       primary_diseases: List[Dict[str, Any]],
                       top_n: int = 3) -> List[KampoRecommendation]:
        """
        代謝プロファイルと推定疾病から漢方処方を推薦
        
        Returns:
            推薦処方リスト
        """
        profile_dict = metabolic_profile.to_path_dict()
        kampo_scores = []
        
        for kampo in self.kampo_library:
            # 漢方の代謝経路プロファイル
            kampo_profile = self._estimate_kampo_pathway_profile(kampo)
            
            # 代謝プロファイルとの一致度
            pathway_score = 0
            for pathway, target_score in kampo_profile.items():
                if pathway in profile_dict:
                    pathway_score += profile_dict[pathway] * target_score
            
            # 疾病との関連度
            disease_score = 0
            for disease in primary_diseases:
                if kampo["id"] in disease.get("recommended_kampo", []):
                    disease_score += disease.get("confidence_score", 0.5)
            
            # 総合スコア
            total_score = (pathway_score * 0.6) + (disease_score * 0.4)
            
            # MBT55最適化情報
            mbt_opt = kampo.get("mbt55_optimization", {})
            boost_level = mbt_opt.get("bioavailability_boost", "medium")
            boost_factor = self.mbt_boost_factors.get(boost_level, 2.5)
            
            kampo_scores.append({
                "formula": kampo,
                "score": total_score,
                "boost_factor": boost_factor,
                "boost_level": boost_level
            })
        
        # スコア降順でソート
        kampo_scores.sort(key=lambda x: x["score"], reverse=True)
        
        recommendations = []
        for ks in kampo_scores[:top_n]:
            kampo = ks["formula"]
            mbt_opt = kampo.get("mbt55_optimization", {})
            
            recommendations.append(KampoRecommendation(
                formula_id=kampo.get("id", ""),
                name_ja=kampo.get("name_ja", ""),
                name_en=kampo.get("name_en", ""),
                category_ja=kampo.get("category_ja", ""),
                category_en=kampo.get("category_en", ""),
                score=round(ks["score"], 3),
                main_herbs_ja=kampo.get("main_herbs_ja", []),
                main_herbs_en=kampo.get("main_herbs_en", []),
                indications_ja=kampo.get("indications", {}).get("primary_ja", []),
                indications_en=kampo.get("indications", {}).get("primary_en", []),
                mbt55_enhanced=mbt_opt.get("recommended_strains", []) != [],
                bioavailability_boost=ks["boost_factor"],
                recommended_strains=mbt_opt.get("recommended_strains", [])
            ))
        
        return recommendations
    
    def _find_kampo_by_id(self, kampo_id: str) -> Optional[Dict]:
        """IDから漢方処方を検索"""
        for kampo in self.kampo_library:
            if kampo.get("id") == kampo_id:
                return kampo
        return None
    
    def _estimate_kampo_pathway_profile(self, kampo: Dict) -> Dict[str, float]:
        """
        漢方処方の代謝経路プロファイルを推定
        
        含有成分の代謝経路から総合スコアを計算
        """
        profile = {f"PATH_{i:02d}": 0.0 for i in range(7)}
        phytochemicals = kampo.get("phytochemicals", [])
        
        if not phytochemicals:
            # デフォルトプロファイル
            return {"PATH_00": 0.4, "PATH_01": 0.3, "PATH_02": 0.2, 
                    "PATH_03": 0.1, "PATH_04": 0.0, "PATH_05": 0.0, "PATH_06": 0.0}
        
        for pc in phytochemicals:
            pathway = pc.get("pathway", "PATH_00")
            if pathway in profile:
                profile[pathway] += 0.2
        
        # 正規化
        total = sum(profile.values())
        if total > 0:
            for pathway in profile:
                profile[pathway] = min(1.0, profile[pathway] / total * 2)
        
        return profile
    
    def generate_lifestyle_advice(self,
                                 metabolic_profile: MetabolicProfile,
                                 language: str = "jp") -> List[str]:
        """
        代謝プロファイルに基づく生活習慣アドバイスを生成
        """
        advice_map_jp = {
            "hydrolysis": "消化酵素の分泌を高めるため、よく噛んでゆっくり食べることをお勧めします。",
            "polyphenol": "色の濃い野菜や果物を積極的に摂取し、抗酸化力を高めましょう。",
            "redox": "適度な運動で血流を促進し、酸化ストレスを軽減しましょう。",
            "lipid_signaling": "青魚などのオメガ3脂肪酸を意識して摂取しましょう。",
            "neuroactive": "規則正しい睡眠とストレス管理を心がけましょう。",
            "fermentation": "発酵食品や食物繊維を摂り、腸内環境を整えましょう。",
            "bioactive_peptide": "良質なタンパク質を適度に摂取しましょう。"
        }
        
        advice_map_en = {
            "hydrolysis": "Chew thoroughly and eat slowly to enhance digestive enzyme secretion.",
            "polyphenol": "Increase intake of colorful vegetables and fruits to boost antioxidants.",
            "redox": "Engage in moderate exercise to promote blood flow and reduce oxidative stress.",
            "lipid_signaling": "Consume omega-3 fatty acids from fish like mackerel and sardines.",
            "neuroactive": "Maintain regular sleep patterns and manage stress effectively.",
            "fermentation": "Incorporate fermented foods and dietary fiber to improve gut health.",
            "bioactive_peptide": "Consume moderate amounts of high-quality protein."
        }
        
        advice_map = advice_map_jp if language == "jp" else advice_map_en
        key_map = {
            "hydrolysis": "hydrolysis",
            "polyphenol": "polyphenol",
            "redox": "redox",
            "lipid_signaling": "lipid_signaling",
            "neuroactive": "neuroactive",
            "fermentation": "fermentation",
            "bioactive_peptide": "bioactive_peptide"
        }
        
        advice = []
        for attr, key in key_map.items():
            score = getattr(metabolic_profile, attr, 0.5)
            if score < 0.4:
                advice.append(advice_map.get(key, ""))
        
        return advice
    
    def assess_health(self,
                     answers: Dict[str, int],
                     language: str = "jp") -> HealthAssessment:
        """
        総合健康評価
        
        Args:
            answers: アンケート回答 {question_id: score}
            language: "jp" or "en"
        
        Returns:
            HealthAssessment（健康評価結果）
        """
        # 1. 代謝プロファイル計算
        metabolic_profile = self.calculate_metabolic_profile(answers, language)
        
        # 2. 疾病推定
        diseases = self.identify_diseases(metabolic_profile)
        
        # 3. 漢方推薦
        kampo_recommendations = self.recommend_kampo(metabolic_profile, diseases)
        
        # 4. 生活習慣アドバイス
        lifestyle_advice = self.generate_lifestyle_advice(metabolic_profile, language)
        
        # 5. MBT55プロバイオティクス効果推定
        mbt_effect = self._estimate_mbt55_effect(metabolic_profile)
        
        return HealthAssessment(
            metabolic_profile=metabolic_profile,
            primary_diseases=diseases,
            recommended_kampo=kampo_recommendations,
            lifestyle_advice_ja=lifestyle_advice if language == "jp" else [],
            lifestyle_advice_en=lifestyle_advice if language == "en" else [],
            mbt55_probiotics_effect=mbt_effect
        )
    
    def _estimate_mbt55_effect(self, 
                              metabolic_profile: MetabolicProfile) -> Dict[str, float]:
        """
        MBT55プロバイオティクスの効果推定
        """
        return {
            "gut_health_improvement": round(0.3 + metabolic_profile.fermentation * 0.5, 2),
            "immune_enhancement": round(0.2 + metabolic_profile.redox * 0.6, 2),
            "inflammation_reduction": round(0.25 + metabolic_profile.lipid_signaling * 0.5, 2),
            "nutrient_absorption": round(0.3 + metabolic_profile.hydrolysis * 0.4, 2),
            "estimated_health_score_improvement": round(
                (metabolic_profile.hydrolysis + metabolic_profile.fermentation) * 50, 1
            )
        }
    
    def get_engine_status(self) -> Dict[str, Any]:
        """エンジン状態を返す"""
        return {
            "engine_name": "HealthBook Extended Engine",
            "version": "2.0.0",
            "data_loaded": {
                "questionnaire_en": bool(self.questionnaire_en),
                "questionnaire_jp": bool(self.questionnaire_jp),
                "disease_matrix": bool(self.disease_matrix),
                "kampo_library": len(self.kampo_library),
                "animal_library": len(self.animal_library)
            },
            "pathways": self.pathway_definitions,
            "mbt_boost_factors": self.mbt_boost_factors
        }


# エンジンインスタンス
healthbook_engine = HealthBookExtendedEngine()


def test_engine():
    print("=" * 60)
    print("HealthBook Extended Engine Test")
    print("=" * 60)
    
    print("\n--- Engine Status ---")
    print(healthbook_engine.get_engine_status())
    
    # サンプル回答
    sample_answers = {
        "1": 4, "2": 4, "3": 3, "4": 4, "5": 4,  # 食習慣
        "51": 3, "52": 3, "53": 3, "54": 3, "55": 4,  # 生活習慣
        "101": 3, "102": 3, "103": 2  # 症状
    }
    
    print("\n--- Sample Assessment (Japanese) ---")
    assessment = healthbook_engine.assess_health(sample_answers, "jp")
    
    print(f"Metabolic Profile:")
    for key, value in assessment.metabolic_profile.to_dict().items():
        print(f"  {key}: {value}")
    
    print(f"\nPrimary Diseases:")
    for disease in assessment.primary_diseases:
        print(f"  {disease['disease_name_ja']} (confidence: {disease['confidence_score']})")
    
    print(f"\nRecommended Kampo:")
    for kampo in assessment.recommended_kampo[:3]:
        print(f"  {kampo.name_ja} (score: {kampo.score})")
        print(f"    MBT55 Boost: {kampo.bioavailability_boost}x")
        print(f"    Strains: {kampo.recommended_strains}")
    
    print(f"\nLifestyle Advice:")
    for advice in assessment.lifestyle_advice_ja:
        print(f"  • {advice}")
    
    print(f"\nMBT55 Estimated Effect:")
    for key, value in assessment.mbt55_probiotics_effect.items():
        print(f"  {key}: {value}")


if __name__ == "__main__":
    test_engine()
