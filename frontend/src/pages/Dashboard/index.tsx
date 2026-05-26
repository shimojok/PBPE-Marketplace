import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import {
  getDashboardSummary,
  getGHGBreakdown,
} from "../../api/dashboard";

import { KPIcard } from "../../components/cards/KPIcard";
import { GHGStackedBar } from "../../components/charts/GHGStackedBar";

import "./Dashboard.css";

export default function Dashboard() {
  // -----------------------------
  // ① 既存のロジック（API 呼び出し）
  // -----------------------------
  const [summary, setSummary] = useState(null);
  const [ghg, setGHG] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
    getGHGBreakdown().then(setGHG);
  }, []);

  return (
    <div className="dashboard-root">
      {/* -----------------------------
          ② 新レイアウト（Header）
      ------------------------------ */}
      <Header />

      <div className="dashboard-container">
        {/* -----------------------------
            ③ 新レイアウト（Sidebar）
        ------------------------------ */}
        <Sidebar />

        {/* -----------------------------
            ④ Dashboard コンテンツ本体
        ------------------------------ */}
        <div className="dashboard-content">

          <h1 className="dashboard-title">PBPE Dashboard v3</h1>

          {/* -----------------------------
              ⑤ KPI カード（既存 index.tsx）
          ------------------------------ */}
          {summary && (
            <div className="kpi-row">
              <KPIcard
                label="GHG Reduction"
                value={`${summary.ghg_reduction_tco2e_per_year} tCO₂e`}
                subtext="Annual"
              />
              <KPIcard
                label="PBPE Issued"
                value={summary.pbpe_issued_per_year}
                subtext="PBPE / year"
              />
              <KPIcard
                label="Market Value"
                value={`$${summary.pbpe_market_value_usd_per_year}`}
                subtext="USD / year"
              />
            </div>
          )}

          {/* -----------------------------
              ⑥ チャート（既存 index.tsx）
          ------------------------------ */}
          {ghg && (
            <div className="chart-row">
              <GHGStackedBar data={ghg} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
