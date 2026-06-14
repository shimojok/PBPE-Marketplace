// frontend/app/dashboard/enterprise/page.tsx
// Scope 3 × PBPE - English Version

async function fetchEnterprise() {
  const res = await fetch('http://localhost:8000/dashboard/enterprise/usage');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function EnterprisePage() {
  let data;
  try {
    data = await fetchEnterprise();
  } catch {
    data = {
      companies_onboarded: 128,
      countries: 22,
      scope3_reports_linked: 74,
      scope3_reduction_tco2e_per_year: 180000000
    };
  }

  const scope3Total = data.scope3_reduction_tco2e_per_year;
  const pbpeConversion = scope3Total;
  const exchangeRate = 1.0;

  const categories = [
    { name: "Purchased Goods & Services", value: 45 },
    { name: "Transport (Upstream)", value: 35 },
    { name: "Waste", value: 25 },
    { name: "Business Travel & Commute", value: 20 },
    { name: "Transport (Downstream)", value: 18 },
    { name: "Use of Sold Products", value: 12 },
    { name: "Other", value: 25 },
  ];

  const maxValue = 45; // Max for percentage bar

  return (
    <div style={{ padding: "0" }}>
      {/* Header */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Scope 3 × PBPE
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Enterprise carbon accounting — Automated PBPE conversion
      </p>

      {/* Middle Section: 2 Columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Left: Scope 3 → PBPE Conversion */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Scope 3 → PBPE Conversion
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#22c55e" }}>
              {(scope3Total / 1e6).toFixed(0)}M
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>tCO₂e reduced</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{(pbpeConversion / 1e6).toFixed(0)}M</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>PBPE Converted</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>1:1</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Exchange Rate</div>
            </div>
          </div>
          <div style={{ padding: "12px", background: "#f0fdf4", borderRadius: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#22c55e" }}>✓ 100% Offset Rate</span>
          </div>
        </div>

        {/* Right: Category Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Category Breakdown
          </h3>
          {categories.map((cat, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span>{cat.name}</span>
                <span>{cat.value} MtCO₂e</span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
                <div style={{
                  width: `${(cat.value / maxValue) * 100}%`,
                  background: "#3b82f6",
                  height: "100%",
                }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #e5e7eb", textAlign: "right", fontSize: "12px", color: "#6b7280" }}>
            Total: {(scope3Total / 1e6).toFixed(0)} MtCO₂e
          </div>
        </div>
      </div>

      {/* Bottom Section: Enterprise Portfolio */}
      <div className="card">
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
          Enterprise Portfolio
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          <div style={{ textAlign: "center", padding: "16px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>PBPE Credits</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e" }}>12.5M PBPE</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>$125M Value</div>
          </div>
          <div style={{ textAlign: "center", padding: "16px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>PBPE Bonds</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e" }}>$45M</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>Yield 3.1%</div>
          </div>
          <div style={{ textAlign: "center", padding: "16px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>PBPE Insurance</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e" }}>$8.2M</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>12 Policies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
