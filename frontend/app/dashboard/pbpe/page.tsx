// frontend/app/dashboard/pbpe/page.tsx
// API呼び出し版

async function fetchPBPE() {
  const res = await fetch('http://localhost:8000/dashboard/pbpe');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function PbpePage() {
  let data;
  try {
    data = await fetchPBPE();
  } catch {
    data = {
      total_pbpe_per_year: 620000000,
      components: {
        carbon_pbpe: 510000000,
        soil_pbpe: 60000000,
        water_pbpe: 30000000,
        health_pbpe: 20000000
      }
    };
  }

  const components = [
    { name: "Carbon", amount: data.components.carbon_pbpe, color: "#22c55e" },
    { name: "Soil", amount: data.components.soil_pbpe, color: "#f59e0b" },
    { name: "Water", amount: data.components.water_pbpe, color: "#3b82f6" },
    { name: "Health", amount: data.components.health_pbpe, color: "#ef4444" }
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>PBPE Issuance</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>Annual issuance — Carbon / Soil / Water / Health components</p>

      <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>PBPE構成要素</h3>
        {components.map((comp, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>{comp.name}</span>
              <span>{(comp.amount / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
              <div style={{ width: `${(comp.amount / data.total_pbpe_per_year) * 100}%`, background: comp.color, height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px", color: "white", fontSize: "11px" }}>
                {((comp.amount / data.total_pbpe_per_year) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "16px", padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
          総発行量: <strong>{(data.total_pbpe_per_year / 1e6).toFixed(0)}M PBPE</strong> / 年
        </div>
      </div>
    </div>
  );
}
