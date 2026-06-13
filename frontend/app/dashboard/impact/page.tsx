// frontend/app/dashboard/impact/page.tsx
// API呼び出し版

async function fetchGHG() {
  const res = await fetch('http://localhost:8000/dashboard/ghg-breakdown');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function ImpactPage() {
  let ghgData;
  try {
    ghgData = await fetchGHG();
  } catch {
    ghgData = {
      total_tco2e_per_year: 510000000,
      sources: [
        { name: "Waste Avoidance", value: 180 },
        { name: "Food Loss", value: 110 },
        { name: "Soil Carbon", value: 70 },
        { name: "Fertilizer Reduction", value: 40 },
        { name: "Livestock Methane", value: 30 },
        { name: "Rice Methane", value: 20 },
        { name: "Biomass Increase", value: 15 },
      ]
    };
  }

  const maxValue = Math.max(...ghgData.sources.map(s => s.value));

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Impact Breakdown</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>GHG, Soil, Water, Health — by source and region</p>

      <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>GHG Reduction by Category</h3>
        {ghgData.sources.map((source, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
              <span>{source.name}</span>
              <span>{source.value} MtCO₂e</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: `${(source.value / maxValue) * 100}%`, background: "#22c55e", height: "100%" }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #e5e7eb", textAlign: "right", fontSize: "12px" }}>
          合計: {(ghgData.total_tco2e_per_year / 1e6).toFixed(0)} MtCO₂e
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>AGRIX</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", margin: "12px 0" }}>Yield +22%</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Soil + Carbon</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>HealthBook</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", margin: "12px 0" }}>Nutrition +31%</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Lycopene / Polyphenols</div>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>MBT55</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", margin: "12px 0" }}>Stability +18%</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Microbial diversity</div>
        </div>
      </div>
    </div>
  );
}
