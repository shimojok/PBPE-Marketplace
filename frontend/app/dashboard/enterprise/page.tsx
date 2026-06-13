// frontend/app/dashboard/enterprise/page.tsx

export default function EnterprisePage() {
  // Scope 3 データ
  const scope3Total = 180000000; // tCO₂e
  const pbpeConversion = 180000000; // PBPE
  const exchangeRate = 1.0; // 1 PBPE / tCO₂e

  // カテゴリ別内訳
  const categories = [
    { name: "購入品・サービス", value: 45000000 },
    { name: "輸送・配送（上流）", value: 35000000 },
    { name: "事業廃棄物", value: 25000000 },
    { name: "出張・通勤", value: 20000000 },
    { name: "輸送・配送（下流）", value: 18000000 },
    { name: "販売製品の使用", value: 12000000 },
    { name: "その他", value: 25000000 },
  ];

  const maxValue = Math.max(...categories.map(c => c.value));

  // 企業ポートフォリオ
  const portfolio = [
    { type: "PBPE Credits", amount: "12,500,000 PBPE", value: "$125M" },
    { type: "PBPE Bonds", amount: "$45M", value: "利回り 3.1%" },
    { type: "PBPE Insurance", amount: "$8.2M", value: "契約数 12" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* ヘッダー */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Scope 3 × PBPE
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Enterprise carbon accounting — Automated PBPE conversion
      </p>

      {/* 中段：2列構成 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        {/* 左：Scope 3 → PBPE 自動変換結果 */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            Scope 3 → PBPE 自動変換
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#22c55e" }}>
              {(scope3Total / 1e6).toFixed(0)}M
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>tCO₂e 削減</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{(pbpeConversion / 1e6).toFixed(0)}M</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>PBPE変換量</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>1:1</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>換算レート</div>
            </div>
          </div>
          <div style={{ padding: "12px", background: "#f0fdf4", borderRadius: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#22c55e" }}>✓ オフセット率 100%</span>
          </div>
        </div>

        {/* 右：カテゴリ別内訳 */}
        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
            カテゴリ別内訳
          </h3>
          {categories.map((cat, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span>{cat.name}</span>
                <span>{(cat.value / 1e6).toFixed(0)} MtCO₂e</span>
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
            合計: {(scope3Total / 1e6).toFixed(0)} MtCO₂e
          </div>
        </div>
      </div>

      {/* 下段：企業ポートフォリオ */}
      <div style={{
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
          企業ポートフォリオ
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}>
          {portfolio.map((item, i) => (
            <div key={i} style={{
              textAlign: "center",
              padding: "16px",
              background: "#f3f4f6",
              borderRadius: "8px",
            }}>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                {item.type}
              </div>
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e" }}>
                {item.amount}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
