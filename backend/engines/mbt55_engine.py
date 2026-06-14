# backend/engines/mbt55_engine.py
"""
MBT55 Ecological Hypercycle Engine - Complete Version
統合理論: M³-BioSynergy / PMH / MMVC / SOC Formation / Green Premium

統合ソース:
- MB001: Wilkinson's Planetary Ecology + GHG Reduction
- MB002: M³-BioSynergy Theory (120菌種共生ネットワーク)
- MB003: Humus Formation Mechanism
- MB004: Chemical Fertilizer Reduction & Heavy Metal Detoxification
- MB005: Planetary Metabolic Hypercycle (PMH) 数理モデル
- MB006: Pythonシミュレーション（ODE系）
- MB007: 代謝モジュール + 元素転換 + GHG削減定量化
- MB008: 新規性・実現性・インパクト評価
- MB009: AI統合AgriWareシステム
- MB010: フェーズ1実装プラン
- MB011: MBT Multi-Layered Value Cycle (MMVC)
- MB012: 炭素循環優位性 + 温暖化適応性
- MB013: グリーンプレミアム計算モデル（基本）
- MB014: グリーンプレミアム計算モデル（拡張・感度分析）
- MB015: SOC形成モデル（第2章）
"""

import math
import numpy as np
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum


# ============================================================
# データクラス定義
# ============================================================

@dataclass
class GreenPremiumInput:
    """グリーンプレミアム計算の入力パラメータ（MB013, MB014）"""
    C_mbt: float  # MBT肥料価格 ($/kgN)
    C_conv: float  # 従来肥料価格 ($/kgN)
    E_conv_prod: float  # 従来肥料生産排出 (kgCO₂e/kgN)
    E_mbt_prod: float  # MBT肥料生産排出 (kgCO₂e/kgN)
    n2o_reduction_rate: float  # N₂O削減率 (0-1)
    soil_carbon_sequestration: float  # 土壌炭素貯留 (kgCO₂e/kgN)
    carbon_price: float  # 炭素価格 ($/tCO₂)
    yield_benefit: float = 0.0  # 収量便益 ($/kgN)
    other_benefits: float = 0.0  # その他便益 ($/kgN)


@dataclass
class SOCSimulationResult:
    """SOC形成シミュレーション結果（MB015）"""
    years: List[float]
    carbon_sequestered: List[float]
    humus_formed: List[float]
    final_soc: float
    improvement_rate: float


# ============================================================
# MBT55エンジン本体（拡張完全版）
# ============================================================

class MBT55Engine:
    """
    MBT55 Ecological Hypercycle Engine - Complete Version
    
    コア機能:
    1. GHG削減計算（MB001, MB007, MB008）
    2. 炭素隔離計算（MB001, MB003, MB012, MB015）
    3. 化学肥料代替計算（MB004）
    4. 重金属無害化計算（MB004）
    5. ハイパーサイクル安定度計算（MB002, MB005）
    6. 腐植質形成計算（MB003, MB015）
    7. グリーンプレミアム計算（MB013, MB014）
    8. マルチレイヤー価値循環計算（MB011）
    9. 炭素循環効率計算（MB012）
    10. ODEシミュレーション（MB005, MB006）
    """
    
    def __init__(self):
        # 菌種構成パラメータ（MB002, MB004）
        self.microbial_diversity = 120
        self.aerobic_ratio = 0.55
        self.anaerobic_ratio = 0.45
        
        # 処理パラメータ
        self.temperature_range = (80, 100)
        self.processing_time_hours = 24
        
        # 数理モデルパラメータ（MB005）
        self.alpha_1 = 0.35   # 炭素代謝係数
        self.alpha_2 = 0.28   # 窒素代謝係数
        self.beta_1 = 0.05    # 微生物死滅率
        self.k1, self.k2, self.k3, self.k4, self.k5, self.k6 = 0.3, 0.5, 0.4, 0.2, 0.3, 0.2
        self.alpha, self.beta, self.gamma, self.delta, self.epsilon = 0.6, 0.5, 0.4, 0.3, 0.5
        self.rf, self.df = 0.4, 0.1
        
        # ハイパーサイクルパラメータ（MB002）
        self.hypercycle_threshold = 0.85
        
        # 温室効果ガス係数（MB001, MB007）
        self.gwp_ch4 = 28
        self.gwp_n2o = 265
        
        # 炭素循環パラメータ（MB012）
        self.k_h_mbt = 0.35      # 腐植化係数（MBT）
        self.k_h_trad = 0.12     # 腐植化係数（従来）
        self.lambda_mbt = 0.05   # 分解損失率（MBT）
        self.lambda_trad = 0.15  # 分解損失率（従来）
        
        # SOC形成パラメータ（MB015）
        self.humification_rate = 0.35
        self.carbon_retention_time = 15  # 年
    
    # ============================================================
    # 1. GHG削減計算（MB001, MB007, MB008）
    # ============================================================
    
    def calculate_ghg_reduction(self, 
                                waste_amount_ton: float,
                                waste_type: str = "mixed") -> Dict[str, float]:
        """温室効果ガス削減量の計算"""
        baseline_emissions = {
            "food_waste": {"CH4": 2.5, "N2O": 0.8, "CO2": 0.3},
            "livestock": {"CH4": 3.2, "N2O": 1.1, "CO2": 0.4},
            "mixed": {"CH4": 2.8, "N2O": 0.9, "CO2": 0.35},
        }
        
        base = baseline_emissions.get(waste_type, baseline_emissions["mixed"])
        
        # MBT55削減率（MB001より）
        ch4_reduction = base["CH4"] * 0.94 * waste_amount_ton
        n2o_reduction = base["N2O"] * 0.78 * waste_amount_ton
        co2_reduction = base["CO2"] * 0.60 * waste_amount_ton
        
        total_co2e = (ch4_reduction * self.gwp_ch4) + (n2o_reduction * self.gwp_n2o) + co2_reduction
        
        return {
            "ch4_reduction_ton": round(ch4_reduction, 2),
            "n2o_reduction_ton": round(n2o_reduction, 2),
            "co2_reduction_ton": round(co2_reduction, 2),
            "total_co2e_reduction": round(total_co2e, 2),
            "unit": "tCO₂e"
        }
    
    # ============================================================
    # 2. 炭素隔離計算（MB001, MB003, MB012, MB015）
    # ============================================================
    
    def calculate_carbon_sequestration(self, 
                                       area_ha: float,
                                       years: int = 10) -> Dict[str, float]:
        """炭素隔離量の計算（10年基準）"""
        base_sequestration_per_ha_10y = 310  # MB001より
        
        total_sequestration = base_sequestration_per_ha_10y * area_ha * (years / 10)
        
        return {
            "total_co2e_sequestered": round(total_sequestration, 2),
            "per_ha_per_year": round(base_sequestration_per_ha_10y / 10, 2),
            "humification_factor": self.humification_rate,
            "improvement_over_conventional": "+186%",
            "period_years": years,
            "unit": "tCO₂e"
        }
    
    def simulate_soc_accumulation(self, 
                                  years: int = 30,
                                  initial_soc: float = 30.0) -> SOCSimulationResult:
        """SOC形成シミュレーション（MB015）"""
        t = np.arange(0, years, 0.1)
        
        def carbon_accumulation(t_val, k_h, decay_rate):
            stable_c = 25 * k_h * t_val * np.exp(-decay_rate * t_val)
            biomass_c = 15 * (1 - np.exp(-0.25 * t_val))
            return stable_c + biomass_c
        
        mbt_soc = [carbon_accumulation(ti, self.k_h_mbt, self.lambda_mbt) for ti in t]
        trad_soc = [carbon_accumulation(ti, self.k_h_trad, self.lambda_trad) for ti in t]
        
        final_soc_mbt = mbt_soc[-1]
        final_soc_trad = trad_soc[-1]
        improvement = (final_soc_mbt - final_soc_trad) / final_soc_trad * 100
        
        return SOCSimulationResult(
            years=t.tolist(),
            carbon_sequestered=mbt_soc,
            humus_formed=[s * 0.58 for s in mbt_soc],
            final_soc=round(final_soc_mbt, 2),
            improvement_rate=round(improvement, 1)
        )
    
    # ============================================================
    # 3. 化学肥料代替計算（MB004）
    # ============================================================
    
    def calculate_fertilizer_replacement(self,
                                         crop_type: str = "rice",
                                         waste_input_ton: float = 1.0) -> Dict[str, any]:
        """化学肥料代替率の計算"""
        crop_replacement = {
            "rice": {"N": 60, "P": 60, "K": 50, "overall": 57},
            "tomato": {"N": 70, "P": 60, "K": 50, "overall": 60},
            "soybean": {"N": 50, "P": 100, "K": 50, "overall": 67},
            "default": {"N": 55, "P": 65, "K": 50, "overall": 57},
        }
        
        params = crop_replacement.get(crop_type, crop_replacement["default"])
        
        nutrient_conversion = {"N": 0.85, "P": 0.90, "K": 0.70}
        base_nutrients = {"N": 25, "P": 8, "K": 15}
        
        available_nutrients = {
            f"{nut}_kg": base_nutrients[nut] * nutrient_conversion[nut] * waste_input_ton
            for nut in ["N", "P", "K"]
        }
        
        return {
            "crop_type": crop_type,
            "replacement_rate_percent": params,
            "available_nutrients_kg": available_nutrients,
            "waste_input_ton": waste_input_ton
        }
    
    # ============================================================
    # 4. 重金属無害化計算（MB004）
    # ============================================================
    
    def calculate_heavy_metal_detoxification(self,
                                             metal_type: str,
                                             initial_concentration: float,
                                             treatment_hours: int = 24) -> Dict[str, any]:
        """重金属無害化率の計算"""
        detox_rates = {"Cd": 0.95, "Pb": 0.90, "As": 0.85}
        rate = detox_rates.get(metal_type.upper(), 0.80)
        
        time_factor = min(1.0, treatment_hours / 24)
        effective_rate = rate * time_factor
        
        return {
            "heavy_metal": metal_type.upper(),
            "detoxification_rate_percent": round(effective_rate * 100, 1),
            "initial_concentration_mg_kg": initial_concentration,
            "final_concentration_mg_kg": round(initial_concentration * (1 - effective_rate), 2),
            "treatment_hours": treatment_hours
        }
    
    # ============================================================
    # 5. ハイパーサイクル安定度計算（MB002, MB005）
    # ============================================================
    
    def calculate_hypercycle_stability(self,
                                       microbial_diversity: Optional[int] = None,
                                       temperature_c: float = 85.0) -> Dict[str, any]:
        """生態学的ハイパーサイクル安定度の計算"""
        diversity = microbial_diversity or self.microbial_diversity
        mei = min(0.98, 0.3 + 0.55 * (diversity / 120))
        
        optimal_temp = 90
        temp_factor = max(0.85, 1.0 - 0.007 * abs(temperature_c - optimal_temp))
        
        stability_index = mei * temp_factor
        hypercycle_active = stability_index >= self.hypercycle_threshold
        
        return {
            "microbial_emergence_index_mei": round(mei, 3),
            "temperature_factor": round(temp_factor, 3),
            "hypercycle_stability_index": round(stability_index, 3),
            "threshold": self.hypercycle_threshold,
            "hypercycle_active": hypercycle_active,
            "status": "ACTIVE" if hypercycle_active else "INACTIVE"
        }
    
    # ============================================================
    # 6. 腐植質形成計算（MB003, MB015）
    # ============================================================
    
    def calculate_humus_formation(self,
                                  organic_carbon_input_ton: float,
                                  soil_type: str = "default") -> Dict[str, float]:
        """腐植質形成量の計算"""
        soil_factors = {"andosol": 1.2, "gray_lowland": 1.0, "sand": 0.7, "default": 1.0}
        soil_factor = soil_factors.get(soil_type, 1.0)
        
        humus_formed = organic_carbon_input_ton * self.humification_rate * soil_factor
        carbon_sequestered = humus_formed * 0.58 * 3.67
        
        return {
            "humus_formed_ton": round(humus_formed, 2),
            "carbon_sequestered_co2e_ton": round(carbon_sequestered, 2),
            "humification_factor": self.humification_rate,
            "estimated_half_life_years": self.carbon_retention_time,
            "soil_type": soil_type
        }
    
    # ============================================================
    # 7. グリーンプレミアム計算（MB013, MB014）
    # ============================================================
    
    def calculate_green_premium(self, inputs: GreenPremiumInput) -> Dict[str, float]:
        """グリーンプレミアム計算（MB013, MB014の数式実装）"""
        # 圃場N₂O排出量計算（IPCC係数ベース）
        n2o_emission_factor = 0.01571428571  # kg N₂O/kgN
        n2o_gwp_factor = 265
        
        e_conv_field = n2o_emission_factor * n2o_gwp_factor
        e_mbt_field = e_conv_field * (1 - inputs.n2o_reduction_rate)
        
        e_conv_total = inputs.E_conv_prod + e_conv_field
        e_mbt_total = inputs.E_mbt_prod + e_mbt_field
        
        delta_e = e_conv_total - e_mbt_total
        
        # 炭素価格を$/kgに変換
        carbon_price_per_kg = inputs.carbon_price / 1000
        
        # GHG削減価値
        ghg_value = delta_e * carbon_price_per_kg
        
        # 土壌貯留価値
        soil_value = inputs.soil_carbon_sequestration * carbon_price_per_kg
        
        # グリーンプレミアム計算
        green_premium = (inputs.C_mbt - inputs.C_conv) - ghg_value - soil_value - inputs.yield_benefit - inputs.other_benefits
        
        return {
            "green_premium_usd_per_kgN": round(green_premium, 4),
            "e_conv_total_kgCO2e": round(e_conv_total, 2),
            "e_mbt_total_kgCO2e": round(e_mbt_total, 2),
            "ghg_reduction_kgCO2e": round(delta_e, 2),
            "ghg_reduction_value_usd": round(ghg_value, 4),
            "soil_carbon_value_usd": round(soil_value, 4),
            "carbon_price_assumed_usd_per_t": inputs.carbon_price
        }
    
    def green_premium_sensitivity_analysis(self, 
                                           base_inputs: GreenPremiumInput,
                                           carbon_prices: List[float] = None) -> List[Dict[str, float]]:
        """グリーンプレミアムの感度分析（MB014）"""
        if carbon_prices is None:
            carbon_prices = [0, 50, 100, 150, 200]
        
        results = []
        for cp in carbon_prices:
            inputs = GreenPremiumInput(
                C_mbt=base_inputs.C_mbt,
                C_conv=base_inputs.C_conv,
                E_conv_prod=base_inputs.E_conv_prod,
                E_mbt_prod=base_inputs.E_mbt_prod,
                n2o_reduction_rate=base_inputs.n2o_reduction_rate,
                soil_carbon_sequestration=base_inputs.soil_carbon_sequestration,
                carbon_price=cp,
                yield_benefit=base_inputs.yield_benefit,
                other_benefits=base_inputs.other_benefits
            )
            result = self.calculate_green_premium(inputs)
            results.append({
                "carbon_price_usd_per_t": cp,
                "green_premium_usd_per_kgN": result["green_premium_usd_per_kgN"]
            })
        
        return results
    
    # ============================================================
    # 8. マルチレイヤー価値循環計算（MB011）
    # ============================================================
    
    def calculate_mmvc_value(self,
                             product_price_usd_per_ton: float,
                             yield_ton_per_ha: float,
                             area_ha: float,
                             carbon_price_usd_per_t: float = 50) -> Dict[str, float]:
        """MBT Multi-Layered Value Cycle 価値計算"""
        # 生産者価値
        revenue = product_price_usd_per_ton * yield_ton_per_ha * area_ha
        
        # 環境価値（炭素隔離）
        carbon_seq = self.calculate_carbon_sequestration(area_ha, 10)
        carbon_revenue = carbon_seq["total_co2e_sequestered"] * (carbon_price_usd_per_t / 1000)
        
        # 購入者価値（健康便益：簡易推定）
        health_benefit_per_ha = 500  # USD/ha/年（仮定）
        health_value = health_benefit_per_ha * area_ha
        
        # 総合価値
        total_value = revenue + carbon_revenue + health_value
        
        return {
            "producer_revenue_usd": round(revenue, 0),
            "carbon_credit_revenue_usd": round(carbon_revenue, 0),
            "health_benefit_value_usd": round(health_value, 0),
            "total_value_created_usd": round(total_value, 0),
            "area_ha": area_ha
        }
    
    # ============================================================
    # 9. 炭素循環効率計算（MB012）
    # ============================================================
    
    def calculate_carbon_cycling_efficiency(self,
                                            energy_input_kwh: float = 0.15,
                                            carbon_input_kg: float = 100) -> Dict[str, float]:
        """炭素循環効率の計算"""
        # 炭素出力（固定量）の推定
        carbon_output = carbon_input_kg * self.k_h_mbt * 0.58 * 3.67
        
        # エネルギー効率
        energy_efficiency = 0.92  # MBT55: 92%
        
        # 総合炭素循環効率
        cce = (carbon_output / (energy_input_kwh + carbon_input_kg)) * 100
        
        return {
            "carbon_cycling_efficiency_percent": round(cce, 1),
            "energy_efficiency_percent": energy_efficiency * 100,
            "carbon_output_kgCO2e": round(carbon_output, 2),
            "comparison_conventional_percent": "+186"
        }
    
    # ============================================================
    # 10. ODEシミュレーション（MB005, MB006）
    # ============================================================
    
    def simulate_hypercycle_dynamics(self, 
                                     initial_state: Optional[List[float]] = None,
                                     time_horizon: float = 50,
                                     n_points: int = 300) -> Dict[str, any]:
        """生態学的ハイパーサイクルのODEシミュレーション"""
        from scipy.integrate import solve_ivp
        
        def ode_system(t, y, p):
            Cp, Cm, Cs, E, H2, Na, No, Sr, Xf = y
            
            dCp = -p["k1"] * Xf * Cp
            dCm = p["k1"] * Xf * Cp - p["k2"] * Xf * Cm - p["k3"] * Cm
            dCs = p["alpha"] * p["k2"] * Xf * Cm - p["k4"] * Cs
            dE = p["beta"] * p["k2"] * Cm - p["gamma"] * E
            dH2 = p["delta"] * E - p["epsilon"] * H2
            dNa = 0.2 - p["k5"] * Na
            dNo = p["k5"] * Na - 0.1 * No
            dSr = -p["k6"] * Sr + 0.05
            dXf = p["rf"] * Xf * (Cm / (1 + Cm)) - p["df"] * Xf
            
            return [dCp, dCm, dCs, dE, dH2, dNa, dNo, dSr, dXf]
        
        params = {
            "k1": self.k1, "k2": self.k2, "k3": self.k3, "k4": self.k4,
            "k5": self.k5, "k6": self.k6, "alpha": self.alpha, "beta": self.beta,
            "gamma": self.gamma, "delta": self.delta, "epsilon": self.epsilon,
            "rf": self.rf, "df": self.df
        }
        
        if initial_state is None:
            y0 = [10, 2, 1, 1, 0.5, 1, 1, 1, 0.5]
        else:
            y0 = initial_state
        
        t_span = (0, time_horizon)
        t_eval = np.linspace(0, time_horizon, n_points)
        
        sol = solve_ivp(ode_system, t_span, y0, args=(params,), t_eval=t_eval)
        
        # 安定性評価
        final_state = sol.y[:, -1]
        is_stable = all(np.abs(final_state - np.mean(sol.y[:, -50:], axis=1)) < 0.1)
        
        return {
            "time": sol.t.tolist(),
            "state_variables": {
                "Cp": sol.y[0].tolist(),
                "Cm": sol.y[1].tolist(),
                "Cs": sol.y[2].tolist(),
                "E": sol.y[3].tolist(),
                "H2": sol.y[4].tolist(),
                "Na": sol.y[5].tolist(),
                "No": sol.y[6].tolist(),
                "Sr": sol.y[7].tolist(),
                "Xf": sol.y[8].tolist()
            },
            "is_stable": bool(is_stable),
            "final_state": final_state.tolist()
        }
    
    # ============================================================
    # エンジン状態取得
    # ============================================================
    
    def get_engine_status(self) -> Dict[str, any]:
        """エンジンの現在設定状態を返す"""
        return {
            "engine_name": "MBT55 Ecological Hypercycle Engine",
            "version": "2.0.0",
            "microbial_diversity": self.microbial_diversity,
            "aerobic_ratio": self.aerobic_ratio,
            "anaerobic_ratio": self.anaerobic_ratio,
            "temperature_range_c": self.temperature_range,
            "processing_time_hours": self.processing_time_hours,
            "hypercycle_threshold": self.hypercycle_threshold,
            "integrated_theories": [
                "M³-BioSynergy (MB002)",
                "PMH Model (MB005)",
                "Wilkinson's Planetary Ecology (MB001)",
                "SOC Formation (MB015)",
                "Green Premium (MB013/MB014)",
                "MMVC (MB011)",
                "Carbon Cycle Efficiency (MB012)",
                "AI AgriWare Integration (MB009/MB010)"
            ]
        }


# エンジンインスタンス
mbt55_engine = MBT55Engine()


# ============================================================
# テスト関数
# ============================================================

def test_engine():
    print("=" * 70)
    print("MBT55 Engine v2.0 - Complete Test Results")
    print("=" * 70)
    
    print("\n--- 1. Engine Status ---")
    print(mbt55_engine.get_engine_status())
    
    print("\n--- 2. GHG Reduction (10t mixed waste) ---")
    print(mbt55_engine.calculate_ghg_reduction(10, "mixed"))
    
    print("\n--- 3. Carbon Sequestration (1ha, 10y) ---")
    print(mbt55_engine.calculate_carbon_sequestration(1, 10))
    
    print("\n--- 4. Fertilizer Replacement (rice, 1t waste) ---")
    print(mbt55_engine.calculate_fertilizer_replacement("rice", 1))
    
    print("\n--- 5. Heavy Metal Detoxification (Cd, 10mg/kg) ---")
    print(mbt55_engine.calculate_heavy_metal_detoxification("Cd", 10))
    
    print("\n--- 6. Hypercycle Stability ---")
    print(mbt55_engine.calculate_hypercycle_stability())
    
    print("\n--- 7. Humus Formation (10t organic carbon) ---")
    print(mbt55_engine.calculate_humus_formation(10))
    
    print("\n--- 8. Green Premium Calculation ---")
    gp_input = GreenPremiumInput(
        C_mbt=1.50, C_conv=0.90,
        E_conv_prod=6.00, E_mbt_prod=0.50,
        n2o_reduction_rate=0.50,
        soil_carbon_sequestration=1.00,
        carbon_price=50.0
    )
    print(mbt55_engine.calculate_green_premium(gp_input))
    
    print("\n--- 9. Green Premium Sensitivity Analysis ---")
    for result in mbt55_engine.green_premium_sensitivity_analysis(gp_input):
        print(f"  Carbon price ${result['carbon_price_usd_per_t']}/t → GP: ${result['green_premium_usd_per_kgN']}/kgN")
    
    print("\n--- 10. MMVC Value Calculation (10ha) ---")
    print(mbt55_engine.calculate_mmvc_value(500, 8, 10))
    
    print("\n--- 11. Carbon Cycling Efficiency ---")
    print(mbt55_engine.calculate_carbon_cycling_efficiency())
    
    print("\n--- 12. SOC Simulation (30 years) ---")
    soc_result = mbt55_engine.simulate_soc_accumulation(30)
    print(f"  Final SOC: {soc_result.final_soc} tCO₂e/ha")
    print(f"  Improvement: {soc_result.improvement_rate}%")
    
    print("\n--- 13. Hypercycle ODE Simulation ---")
    ode_result = mbt55_engine.simulate_hypercycle_dynamics(time_horizon=50)
    print(f"  System stable: {ode_result['is_stable']}")
    print(f"  Final Xf (microbial biomass): {ode_result['final_state'][8]:.3f}")


if __name__ == "__main__":
    test_engine()
