import React, { useEffect, useState } from "react";
import { useT } from "../../i18n/useT";
import { getGlobalKPIs } from "../../api/dashboard"; // 既存API想定

export default function GlobalKPIsPage() {
  const t = useT();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    getGlobalKPIs().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="dashboard-page">
      <h1>{t("kpis.title")}</h1>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.total_pbpe")}</div>
          <div className="kpi-value">{data.total_pbpe.toLocaleString()}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.ghg_reduction")}</div>
          <div className="kpi-value">{data.ghg_reduction_tco2e}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.soil_carbon")}</div>
          <div className="kpi-value">{data.soil_carbon_tc}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.biosecurity")}</div>
          <div className="kpi-value">{data.biosecurity_index}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.health")}</div>
          <div className="kpi-value">{data.health_index}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t("kpis.stability")}</div>
          <div className="kpi-value">{data.stability_index}</div>
        </div>
      </div>
    </div>
  );
}
