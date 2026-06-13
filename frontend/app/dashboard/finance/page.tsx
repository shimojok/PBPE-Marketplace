// frontend/app/dashboard/finance/page.tsx
// API呼び出し版

async function fetchBonds() {
  const res = await fetch('http://localhost:8000/dashboard/finance/bonds');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function FinancePage() {
  let bondsData;
  try {
    bondsData = await fetchBonds();
  } catch {
    bondsData = {
      bonds: [{
        id: "PBPE-GLOBAL-2035",
        outstanding_usd: 1500000000,
        coupon_percent: 4.2,
        linked_to: { pbpe_floor: 400000000 }
      }]
    };
  }

  const bond = bondsData.bonds[0];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Bonds & Insurance</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>PBPE-backed financial products — Yield / Pricing / Coverage</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>{bond.id}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Outstanding</span><span>${(bond.outstanding_usd / 1e9).toFixed(1)}B</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Coupon</span><span>{bond.coupon_percent}%</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>PBPE Floor</span><span>{(bond.linked_to.pbpe_floor / 1e6).toFixed(0)}M</span>
          </div>
        </div>

        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>Insurance Products</h3>
          <div style={{ marginBottom: "12px" }}>PBPE Credit Insurance - 1.2%</div>
          <div style={{ marginBottom: "12px" }}>Biosecurity Insurance - 2.5%</div>
          <div>Yield Protection - 1.8%</div>
        </div>
      </div>
    </div>
  );
}
