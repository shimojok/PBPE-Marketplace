// frontend/app/dashboard/finance/page.tsx
// Bonds & Insurance - 完全英語版 + ダークテーマ対応

export default function FinancePage() {
  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
  };

  // Bond Parameters
  const r0 = 2.0;
  const alpha = 2.0;
  const pbpeFloor = 400000000;
  const pbpeActual = 620000000;
  const ghgFloor = 300000000;
  const ghgActual = 510000000;

  const excessRatio = (pbpeActual - pbpeFloor) / pbpeFloor;
  const couponRate = r0 + alpha * excessRatio;
  const pbpeAchievement = (pbpeActual / pbpeFloor) * 100;
  const ghgAchievement = (ghgActual / ghgFloor) * 100;

  const insuranceProducts = [
    { name: "PBPE Credit Insurance", risk: "Credit price downside risk", rate: "1.2%" },
    { name: "Biosecurity Insurance", risk: "Microbial risk", rate: "2.5%" },
    { name: "Yield Protection", risk: "Yield reduction risk", rate: "1.8%" },
  ];

  return (
    <div style={{ padding: "0" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#f1f5f9" }}>
        Bonds & Insurance
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        PBPE-backed financial products — Yield / Pricing / Coverage
      </p>

      {/* Middle Section: 2 Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        {/* Left: Bond Pricing Simulator */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Bond Pricing Simulator
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #334155", paddingBottom: "8px", color: "#94a3b8" }}>
              <span>Base Yield (r₀)</span>
              <span style={{ fontWeight: "bold", color: "#f1f5f9" }}>{r0}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #334155", paddingBottom: "8px", color: "#94a3b8" }}>
              <span>Performance Coefficient (α)</span>
              <span style={{ fontWeight: "bold", color: "#f1f5f9" }}>{alpha}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #334155", paddingBottom: "8px", color: "#94a3b8" }}>
              <span>PBPE Floor</span>
              <span style={{ fontWeight: "bold", color: "#f1f5f9" }}>{(pbpeFloor / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #334155", paddingBottom: "8px", color: "#94a3b8" }}>
              <span>Actual PBPE Issuance</span>
              <span style={{ fontWeight: "bold", color: "#f1f5f9" }}>{(pbpeActual / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              border: "1px solid #334155",
              marginTop: "8px",
            }}>
              <span style={{ fontWeight: "bold", color: "#94a3b8" }}>Calculated Yield</span>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>{couponRate.toFixed(1)}%</span>
            </div>
          </div>
          <div style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            fontSize: "12px",
            border: "1px solid #334155",
            fontFamily: "monospace",
            color: "#94a3b8",
          }}>
            Coupon = r₀ + α × (PBPE_actual - PBPE_floor) / PBPE_floor<br />
            = {r0}% + {alpha} × ({pbpeActual/1e6}M - {pbpeFloor/1e6}M) / {pbpeFloor/1e6}M<br />
            = {r0}% + {alpha} × {excessRatio.toFixed(2)}<br />
            = <strong style={{ color: "#22c55e" }}>{couponRate.toFixed(1)}%</strong>
          </div>
        </div>

        {/* Right: PBPE Floor / Impact Floor */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            PBPE Floor & Impact Floor
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* PBPE Floor Gauge */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#94a3b8" }}>
                <span>PBPE Floor</span>
                <span>{(pbpeActual / 1e6).toFixed(0)}M / {(pbpeFloor / 1e6).toFixed(0)}M PBPE</span>
              </div>
              <div style={{ backgroundColor: "#334155", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(pbpeAchievement, 100)}%`,
                  backgroundColor: pbpeAchievement >= 100 ? "#22c55e" : "#f59e0b",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "8px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}>
                  {pbpeAchievement.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Impact Floor Gauge */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#94a3b8" }}>
                <span>Impact Floor (GHG)</span>
                <span>{(ghgActual / 1e6).toFixed(0)}M / {(ghgFloor / 1e6).toFixed(0)}M tCO₂e</span>
              </div>
              <div style={{ backgroundColor: "#334155", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(ghgAchievement, 100)}%`,
                  backgroundColor: ghgAchievement >= 100 ? "#22c55e" : "#f59e0b",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "8px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}>
                  {ghgAchievement.toFixed(0)}%
                </div>
              </div>
            </div>

            <div style={{
              textAlign: "center",
              padding: "12px",
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              border: "1px solid #334155",
              marginTop: "8px",
            }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>128%</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Overall Achievement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Insurance Products + Quote */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
      }}>
        {/* Left: Insurance Products */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Insurance Products
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155" }}>
                <th style={{ textAlign: "left", padding: "8px", color: "#94a3b8" }}>Product Name</th>
                <th style={{ textAlign: "left", padding: "8px", color: "#94a3b8" }}>Target Risk</th>
                <th style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>Base Rate</th>
              </tr>
            </thead>
            <tbody>
              {insuranceProducts.map((product, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "8px", fontWeight: 500, color: "#f1f5f9" }}>{product.name}</td>
                  <td style={{ padding: "8px", fontSize: "13px", color: "#94a3b8" }}>{product.risk}</td>
                  <td style={{ textAlign: "right", padding: "8px", fontWeight: "bold", color: "#f1f5f9" }}>{product.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Quote & Policies */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Quote & Policies
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button style={{
              backgroundColor: "#22c55e",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              Get Quote
            </button>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
              *Demo display · Actual quotes available separately
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f1f5f9" }}>128</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Active Policies</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f1f5f9" }}>$156M</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Total Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}