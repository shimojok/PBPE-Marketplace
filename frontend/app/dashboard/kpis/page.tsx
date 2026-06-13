// frontend/app/dashboard/kpis/page.tsx
// API呼び出し版（バックエンド接続前提）

async function fetchSummary() {
  const res = await fetch('http://localhost:8000/dashboard/summary');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function KPIsPage() {
  let summary;
  try {
    summary = await fetchSummary();
  } catch {
    // APIが起動していない場合はダミーデータを表示
    summary = {
      ghg_reduction_tco2e_per_year: 510000000,
      units: 54850,
      pbpe_issued_per_year: 620000000,
      pbpe_price_usd: 10.0,
      pbpe_market_value_usd_per_year: 6200000000,
      green_premium_jpy_per_year: -22500000000000,
      roi_percent_per_year: 344,
      payback_months: 3.5,
      scope3_reduction_tco2e_per_year: 180000000,
      companies_onboarded: 128,
      countries: 22,
      scope3_reports_linked: 74
    };
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Global KPIs</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>Planetary balance sheet — GHG, Soil, Water, Health, Stability, PBPE</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>GHG Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.ghg_reduction_tco2e_per_year.toLocaleString()} tCO₂e</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Units: {summary.units.toLocaleString()}</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Issued</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.pbpe_issued_per_year.toLocaleString()} PBPE</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Carbon / Soil / Water / Health</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Market Value</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>${(summary.pbpe_market_value_usd_per_year / 1e9).toFixed(1)}B</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Price: ${summary.pbpe_price_usd} / PBPE</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Green Premium</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e" }}>−¥{(Math.abs(summary.green_premium_jpy_per_year) / 1e12).toFixed(1)}T</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Negative (Profitable)</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>ROI</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.roi_percent_per_year}%</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Payback: {summary.payback_months} months</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Scope 3 Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.scope3_reduction_tco2e_per_year.toLocaleString()} tCO₂e</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Companies: {summary.companies_onboarded}</div>
        </div>
      </div>
    </div>
  );
}
