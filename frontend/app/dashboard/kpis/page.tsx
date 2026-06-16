// frontend/app/dashboard/kpis/page.tsx
// Fully English version with API integration

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
    // Fallback dummy data in case API is not running (English only)
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
    <div style={{ padding: "0" }}>
      {/* Header */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Global KPIs
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Planetary balance sheet — GHG, Soil, Water, Health, Stability, PBPE
      </p>

      {/* 6 KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Card 1: GHG Reduction */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>GHG Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summary.ghg_reduction_tco2e_per_year.toLocaleString()} tCO₂e
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Units: {summary.units.toLocaleString()}
          </div>
        </div>

        {/* Card 2: PBPE Issued */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Issued</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summary.pbpe_issued_per_year.toLocaleString()} PBPE
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Carbon / Soil / Water / Health
          </div>
        </div>

        {/* Card 3: PBPE Market Value */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Market Value</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            ${(summary.pbpe_market_value_usd_per_year / 1e9).toFixed(1)}B
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Price: ${summary.pbpe_price_usd} / PBPE
          </div>
        </div>

        {/* Card 4: Green Premium */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Green Premium</div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#22c55e",
            }}
          >
            −¥{(Math.abs(summary.green_premium_jpy_per_year) / 1e12).toFixed(1)}T
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Negative (Profitable)
          </div>
        </div>

        {/* Card 5: ROI */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>ROI</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summary.roi_percent_per_year}%
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Payback: {summary.payback_months} months
          </div>
        </div>

        {/* Card 6: Scope 3 Reduction */}
        <div className="card">
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Scope 3 Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summary.scope3_reduction_tco2e_per_year.toLocaleString()} tCO₂e
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Companies: {summary.companies_onboarded}
          </div>
        </div>
      </div>

      {/* Middle Section: GHG Breakdown + Flywheel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Left: GHG Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            GHG Reduction by Source
          </h3>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Waste Avoidance</span>
              <span>180 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "100%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Food Loss</span>
              <span>110 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "61%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Soil Carbon</span>
              <span>70 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "39%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Fertilizer Reduction</span>
              <span>40 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "22%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Livestock Methane</span>
              <span>30 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "17%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Rice Methane</span>
              <span>20 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "11%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Biomass Increase</span>
              <span>15 MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: "8%", background: "#22c55e", height: "100%" }} />
            </div>
          </div>
        </div>

        {/* Right: PBPE Value Flywheel */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            PBPE Value Flywheel
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Investment
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Ecosystem Improvement
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Productivity
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              PBPE Issuance
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Value Distribution
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Economic Return
            </div>
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
              Reinvestment
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Credits Table + Enterprise Usage */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Left: PBPE Credits Table */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            PBPE Credits Market
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
                <th style={{ textAlign: "right", padding: "8px" }}>Volume (PBPE)</th>
                <th style={{ textAlign: "right", padding: "8px" }}>Price (USD)</th>
                <th style={{ textAlign: "right", padding: "8px" }}>Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "8px", fontWeight: 500 }}>Carbon</td>
                <td style={{ textAlign: "right", padding: "8px" }}>510M</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$10.00</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$5.1B</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "8px", fontWeight: 500 }}>Biosecurity</td>
                <td style={{ textAlign: "right", padding: "8px" }}>30M</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$14.00</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$420M</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "8px", fontWeight: 500 }}>Food Loss</td>
                <td style={{ textAlign: "right", padding: "8px" }}>40M</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$9.00</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$360M</td>
              </tr>
              <tr>
                <td style={{ padding: "8px", fontWeight: 500 }}>Quality</td>
                <td style={{ textAlign: "right", padding: "8px" }}>40M</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$8.00</td>
                <td style={{ textAlign: "right", padding: "8px" }}>$320M</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Enterprise Usage */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Enterprise Usage
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.companies_onboarded}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Companies</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.countries}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Countries</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px", gridColumn: "span 2" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{summary.scope3_reports_linked}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Scope 3 Reports Linked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}