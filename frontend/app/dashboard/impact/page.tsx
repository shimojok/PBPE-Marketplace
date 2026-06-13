// frontend/app/dashboard/impact/page.tsx

export default function ImpactPage() {
  // GHGデータ
  const ghgData = [
    { name: "Waste Avoidance", value: 180, color: "#22c55e" },
    { name: "Food Loss", value: 110, color: "#10b981" },
    { name: "Soil Carbon", value: 70, color: "#14b8a6" },
    { name: "Fertilizer Reduction", value: 40, color: "#06b6d4" },
    { name: "Livestock Methane", value: 30, color: "#3b82f6" },
    { name: "Rice Methane", value: 20, color: "#8b5cf6" },
    { name: "Biomass Increase", value: 15, color: "#a855f7" },
  ];

  const totalGHG = ghgData.reduce((sum, d) => sum + d.value, 0);

  // Soil / Water / Health 指標
  const indicators = [
    { title: "Soil Carbon", value: "+3.2", unit: "tC/ha", sub: "AGRIX-backed" },
    { title: "Water Quality", value: "+24.5", unit: "index", sub: "Watershed improvement" },
    { title: "Health Score", value: "+18.2", unit: "pts", sub: "HealthBook composite" },
  ];

  // 改善効果
  const improvements = [
    { module: "AGRIX", effect: "Yield +22%", detail: "Soil + Carbon" },
    { module: "HealthBook", effect: "Nutrition +31%", detail: "Lycopene / Polyphenols" },
    { module: "MBT55", effect: "Stability +18%", detail: "Microbial diversity" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* ヘッダー */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Impact Breakdown
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        GHG, Soil, Water, Health — by source and region
      </p>

      {/* 中段：2列構成 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* 左：GHG Stacked Bar */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            GHG Reduction by Category
          </h3>
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                height: "32px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {ghgData.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: `${(item.value / totalGHG) * 100}%`,
                    background: item.color,
                  }}
                  title={`${item.name}: ${item.value} MtCO₂e`}
                />
              ))}
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
              Total: {totalGHG} MtCO₂e / year
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {ghgData.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    background: item.color,
                  }}
                />
                <span style={{ fontSize: "12px" }}>
                  {item.name}: {item.value} Mt
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右：Soil / Water / Health 指標（3カード） */}
        <div
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Soil · Water · Health
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {indicators.map((indicator, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>{indicator.title}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{indicator.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {indicator.value}
                  </div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>{indicator.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下段：AGRIX / HealthBook / MBT55 改善効果 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {improvements.map((item, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {item.module}
            </div>
            <div style={{ fontSize: "24px", fontWeight: "bold", margin: "12px 0" }}>
              {item.effect}
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
