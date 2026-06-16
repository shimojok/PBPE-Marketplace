// frontend/app/dashboard/pbpe/page.tsx
// PBPE Issuance - English Version

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

  const total = data.total_pbpe_per_year;

  return (
    <div style={{ padding: "0" }}>
      {/* Header */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        PBPE Issuance
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Annual issuance — Carbon / Soil / Water / Health components
      </p>

      {/* Components Section */}
      <div className="card">
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
          PBPE Components
        </h3>
        {components.map((comp, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>{comp.name}</span>
              <span>{(comp.amount / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
              <div style={{
                width: `${(comp.amount / total) * 100}%`,
                background: comp.color,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "8px",
                color: "white",
                fontSize: "11px",
              }}>
                {((comp.amount / total) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "16px", padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center" }}>
          Total Issued: <strong>{(total / 1e6).toFixed(0)}M PBPE</strong> / year
        </div>
      </div>

      {/* Registry Section */}
      <div className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
          PBPE Registry
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>1,248</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Registry Entries</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>1,248</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>7-digit Codes</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e" }}>Active</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Blockchain</div>
          </div>
        </div>
      </div>
    </div>
  );
}