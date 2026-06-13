// frontend/app/dashboard/pbpe/page.tsx

export default function PbpeIssuancePage() {
  // 年度別発行量
  const annualIssuance = [
    { year: 2024, amount: 180000000 },
    { year: 2025, amount: 420000000 },
    { year: 2026, amount: 620000000 },
    { year: 2027, amount: 780000000, forecast: true },
  ];

  const maxAmount = Math.max(...annualIssuance.map(i => i.amount));

  // 構成要素
  const components = [
    { name: "Carbon PBPE", amount: 510000000, percentage: 82.3, color: "#22c55e" },
    { name: "Soil PBPE", amount: 60000000, percentage: 9.7, color: "#f59e0b" },
    { name: "Water PBPE", amount: 30000000, percentage: 4.8, color: "#3b82f6" },
    { name: "Health PBPE", amount: 20000000, percentage: 3.2, color: "#ef4444" },
  ];

  const totalPbpe = components.reduce((sum, c) => sum + c.amount, 0);

  // Registry情報
  const registryStats = {
    entries: 1248,
    sevenDigitCodes: 1248,
    blockchainEnabled: true,
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* ヘッダー */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        PBPE Issuance
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Annual issuance — Carbon / Soil / Water / Health components
      </p>

      {/* 中段：2列構成 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        {/* 左：年度別発行量 */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            年度別発行量
          </h3>
          {annualIssuance.map((item, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.year}</span>
                <span style={{ fontSize: "14px" }}>
                  {(item.amount / 1e6).toFixed(0)}M PBPE
                  {item.forecast && <span style={{ color: "#f59e0b", marginLeft: "8px", fontSize: "11px" }}>(予測)</span>}
                </span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "32px", overflow: "hidden" }}>
                <div style={{
                  width: `${(item.amount / maxAmount) * 100}%`,
                  background: item.forecast ? "#f59e0b" : "#22c55e",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "8px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}>
                  {((item.amount / maxAmount) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右：PBPE構成要素 */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            PBPE構成要素
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            {/* 簡易ドーナツ（円グラフ風） */}
            <div style={{ position: "relative", width: "120px", height: "120px" }}>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                {(() => {
                  let startAngle = 0;
                  return components.map((comp, i) => {
                    const angle = (comp.percentage / 100) * 360;
                    const endAngle = startAngle + angle;
                    const startRad = (startAngle - 90) * Math.PI / 180;
                    const endRad = (endAngle - 90) * Math.PI / 180;
                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);
                    const largeArc = angle > 180 ? 1 : 0;
                    const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
                    startAngle = endAngle;
                    return <path key={i} d={path} fill={comp.color} stroke="white" strokeWidth="2" />;
                  });
                })()}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{(totalPbpe / 1e6).toFixed(0)}M</div>
                <div style={{ fontSize: "10px", color: "#6b7280" }}>合計</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {components.map((comp, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: comp.color }} />
                    <span>{comp.name}</span>
                  </div>
                  <span>{comp.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "8px", textAlign: "center", fontSize: "13px" }}>
            総発行量: <strong>{(totalPbpe / 1e6).toFixed(0)}M PBPE</strong> / 年
          </div>
        </div>
      </div>

      {/* 下段：PBPE Registry */}
      <div style={{
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
          PBPE Registry
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>{registryStats.entries.toLocaleString()}</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Registry登録数</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>{registryStats.sevenDigitCodes.toLocaleString()}</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>7桁コード発行数</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: registryStats.blockchainEnabled ? "#22c55e" : "#ef4444" }}>
              {registryStats.blockchainEnabled ? "✓ 有効" : "✗ 未連携"}
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>ブロックチェーン連携</div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
            Registry Explorerへ →
          </button>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "8px" }}>
            ※ Registry Explorerは将来拡張予定
          </div>
        </div>
      </div>
    </div>
  );
}
