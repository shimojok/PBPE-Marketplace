// frontend/app/dashboard/finance/page.tsx

export default function FinancePage() {
  // Bond パラメータ
  const r0 = 2.0;  // 基準利回り (%)
  const alpha = 2.0;  // パフォーマンス連動係数
  const pbpeFloor = 400000000;  // PBPEフロア
  const pbpeActual = 620000000;  // 実績PBPE発行量
  const ghgFloor = 300000000;  // Impact Floor (tCO₂e)
  const ghgActual = 510000000;  // 実績GHG削減量

  // 利回り計算
  const excessRatio = (pbpeActual - pbpeFloor) / pbpeFloor;
  const couponRate = r0 + alpha * excessRatio;

  // 達成率
  const pbpeAchievement = (pbpeActual / pbpeFloor) * 100;
  const ghgAchievement = (ghgActual / ghgFloor) * 100;

  // Insurance 商品
  const insuranceProducts = [
    { name: "PBPE Credit Insurance", risk: "Credit価格下落リスク", rate: "1.2%" },
    { name: "Biosecurity Insurance", risk: "微生物リスク", rate: "2.5%" },
    { name: "Yield Protection", risk: "収量低下リスク", rate: "1.8%" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* ヘッダー */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Bonds & Insurance
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        PBPE-backed financial products — Yield / Pricing / Coverage
      </p>

      {/* 中段：2列構成 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        {/* 左：Bond Pricing Simulator */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Bond Pricing Simulator
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>
              <span>基準利回り (r₀)</span>
              <span style={{ fontWeight: "bold" }}>{r0}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>
              <span>連動係数 (α)</span>
              <span style={{ fontWeight: "bold" }}>{alpha}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>
              <span>PBPEフロア</span>
              <span style={{ fontWeight: "bold" }}>{(pbpeFloor / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>
              <span>実績PBPE発行量</span>
              <span style={{ fontWeight: "bold" }}>{(pbpeActual / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "#f3f4f6", borderRadius: "8px", marginTop: "8px" }}>
              <span style={{ fontWeight: "bold" }}>計算利回り</span>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>{couponRate.toFixed(1)}%</span>
            </div>
          </div>
          <div style={{ marginTop: "16px", padding: "12px", background: "#f0fdf4", borderRadius: "8px", fontSize: "12px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "11px" }}>
              Coupon = r₀ + α × (PBPE_actual - PBPE_floor) / PBPE_floor<br />
              = {r0}% + {alpha} × ({pbpeActual/1e6}M - {pbpeFloor/1e6}M) / {pbpeFloor/1e6}M<br />
              = {r0}% + {alpha} × {excessRatio.toFixed(2)}<br />
              = <strong>{couponRate.toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        {/* 右：PBPE Floor / Impact Floor 可視化 */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            PBPE Floor & Impact Floor
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* PBPE Floor ゲージ */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>PBPE Floor</span>
                <span>{(pbpeActual / 1e6).toFixed(0)}M / {(pbpeFloor / 1e6).toFixed(0)}M PBPE</span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(pbpeAchievement, 100)}%`,
                  background: pbpeAchievement >= 100 ? "#22c55e" : "#f59e0b",
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

            {/* Impact Floor ゲージ */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Impact Floor (GHG)</span>
                <span>{(ghgActual / 1e6).toFixed(0)}M / {(ghgFloor / 1e6).toFixed(0)}M tCO₂e</span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(ghgAchievement, 100)}%`,
                  background: ghgAchievement >= 100 ? "#22c55e" : "#f59e0b",
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

            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px", marginTop: "8px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>128%</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>総合達成率</div>
            </div>
          </div>
        </div>
      </div>

      {/* 下段：2列構成 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
      }}>
        {/* 左：Insurance Products */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Insurance Products
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>商品名</th>
                <th style={{ textAlign: "left", padding: "8px" }}>対象リスク</th>
                <th style={{ textAlign: "right", padding: "8px" }}>基本料率</th>
              </tr>
            </thead>
            <tbody>
              {insuranceProducts.map((product, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "8px", fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: "8px", fontSize: "13px" }}>{product.risk}</td>
                  <td style={{ textAlign: "right", padding: "8px", fontWeight: "bold" }}>{product.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右：Quote / Policies */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Quote & Policies
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button style={{
              background: "#22c55e",
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
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
              ＊デモ表示・実際の見積もりは別途連絡
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>128</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Active Policies</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>$156M</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Total Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
