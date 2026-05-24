import React, { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getGHGBreakdown,
  getPBPEIssuance,
  getFlywheel,
  getCreditMarket,
  getBondDashboard,
  getEnterpriseUsage,
} from "../../api/dashboard";

import { KPIcard } from "../../components/cards/KPIcard";
import { GHGStackedBar } from "../../components/charts/GHGStackedBar";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [ghg, setGHG] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
    getGHGBreakdown().then(setGHG);
  }, []);

  return (
    <div className="dashboard">
      <h1>PBPE Dashboard v3</h1>

      {summary && (
        <div className="kpi-row">
          <KPIcard label="GHG Reduction" value={`${summary.ghg_reduction_tco2e_per_year} tCO₂e`} subtext="Annual" />
          <KPIcard label="PBPE Issued" value={summary.pbpe_issued_per_year} subtext="PBPE / year" />
          <KPIcard label="Market Value" value={`$${summary.pbpe_market_value_usd_per_year}`} subtext="USD / year" />
        </div>
      )}

      {ghg && (
        <div className="chart-row">
          <GHGStackedBar data={ghg} />
        </div>
      )}
    </div>
  );
}
