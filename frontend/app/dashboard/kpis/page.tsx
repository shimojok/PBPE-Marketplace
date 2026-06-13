// frontend/app/dashboard/kpis/page.tsx

export default function KPIsPage() {
  // ============================================================
  // ダミーデータ（バックエンド接続後はAPIから取得に切り替え）
  // ============================================================
  const summaryData = {
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

  const ghgSources = [
    { name: "Waste Avoidance", value: 180, max: 180 },
    { name: "Food Loss", value: 110, max: 180 },
    { name: "Soil Carbon", value: 70, max: 180 },
    { name: "Fertilizer Reduction", value: 40, max: 180 },
    { name: "Livestock Methane", value: 30, max: 180 },
    { name: "Rice Methane", value: 20, max: 180 },
    { name: "Biomass Increase", value: 15, max: 180 },
  ];

  const creditsData = [
    { type: "Carbon", volume: 510000000, price: 10.0, value: 5100000000 },
    { type: "Biosecurity", volume: 30000000, price: 14.0, value: 420000000 },
    { type: "Food Loss", volume: 40000000, price: 9.0, value: 360000000 },
    { type: "Quality", volume: 40000000, price: 8.0, value: 320000000 },
  ];

  const flywheelSteps = [
    "Investment",
    "Ecosystem Improvement",
    "Productivity",
    "PBPE Issuance",
    "Value Distribution",
    "Economic Return",
    "Reinvestment"
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* ヘッダー */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Global KPIs
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Planetary balance sheet — GHG, Soil, Water, Health, Stability, PBPE
      </p>

      {/* ============================================================
          KPIカード（6枚）
          ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* カード1: GHG Reduction */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>GHG Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summaryData.ghg_reduction_tco2e_per_year.toLocaleString()} tCO₂e
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Units: {summaryData.units.toLocaleString()}
          </div>
        </div>

        {/* カード2: PBPE Issued */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Issued</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summaryData.pbpe_issued_per_year.toLocaleString()} PBPE
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Carbon / Soil / Water / Health
          </div>
        </div>

        {/* カード3: PBPE Market Value */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>PBPE Market Value</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            ${(summaryData.pbpe_market_value_usd_per_year / 1e9).toFixed(1)}B
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Price: ${summaryData.pbpe_price_usd} / PBPE
          </div>
        </div>

        {/* カード4: Green Premium */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Green Premium</div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#22c55e",
            }}
          >
            −¥{(Math.abs(summaryData.green_premium_jpy_per_year) / 1e12).toFixed(1)}T
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Negative (Profitable)
          </div>
        </div>

        {/* カード5: ROI */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>ROI</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summaryData.roi_percent_per_year}%
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Payback: {summaryData.payback_months} months
          </div>
        </div>

        {/* カード6: Scope 3 Reduction */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Scope 3 Reduction</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {summaryData.scope3_reduction_tco2e_per_year.toLocaleString()} tCO₂e
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Companies: {summaryData.companies_onboarded}
          </div>
        </div>
      </div>

      {/* ============================================================
          中段（2列）：GHG内訳（左）+ フライホイール（右）
          ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* 左：GHG Breakdown */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            GHG Reduction by Source
          </h3>
          {ghgSources.map((source, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                <span>{source.name}</span>
                <span>{source.value} MtCO₂e</span>
              </div>
              <div
                style={{
                  background: "#e5e7eb",
                  borderRadius: "8px",
                  height: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(source.value / source.max) * 100}%`,
                    background: "#22c55e",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 右：PBPE Value Flywheel */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            PBPE Value Flywheel
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {flywheelSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "12px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          下段（2列）：クレジット市場（左）+ 企業利用状況（右）
          ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
        }}
      >
        {/* 左：PBPE Credits Table */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
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
              {creditsData.map((credit, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "8px" }}>{credit.type}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    {(credit.volume / 1e6).toFixed(0)}M
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    ${credit.price}
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    ${(credit.value / 1e6).toFixed(0)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右：Enterprise Usage */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Enterprise Usage
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#f3f4f6",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                {summaryData.companies_onboarded}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Companies</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#f3f4f6",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                {summaryData.countries}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Countries</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#f3f4f6",
                borderRadius: "8px",
                gridColumn: "span 2",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                {summaryData.scope3_reports_linked}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Scope3 Reports Linked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
