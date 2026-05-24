import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboard";
import { KPIcard } from "../../components/cards/KPIcard";

export default function GlobalKPIs() {
  const [summary, setSummary] = useState<any | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  return (
    <div className="kpi-row">
      <KPIcard
        label="GHG Reduction"
        value={`${summary.ghg_reduction_tco2e_per_year} tCO₂e / year`}
        subtext="Annual reduction"
      />
      <KPIcard
        label="PBPE Issued"
        value={summary.pbpe_issued_per_year}
        subtext="PBPE / year"
      />
      <KPIcard
        label="PBPE Market Value"
        value={`$${summary.pbpe_market_value_usd_per_year}`}
        subtext="USD / year"
      />
      <KPIcard
        label="Green Premium"
        value={`${summary.green_premium_jpy_per_year} JPY / year`}
        subtext="Negative premium"
      />
    </div>
  );
}
