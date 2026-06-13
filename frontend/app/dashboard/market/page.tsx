// frontend/app/dashboard/market/page.tsx
// API呼び出し版

async function fetchCredits() {
  const res = await fetch('http://localhost:8000/dashboard/credits/market');
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export default async function MarketPage() {
  let creditsData;
  try {
    creditsData = await fetchCredits();
  } catch {
    creditsData = {
      credits: [
        { type: "Carbon", volume: 510000000, price: 10.00, value: 5100000000 },
        { type: "Biosecurity", volume: 30000000, price: 14.00, value: 420000000 },
        { type: "Food Loss", volume: 40000000, price: 9.00, value: 360000000 },
        { type: "Quality", volume: 40000000, price: 8.00, value: 320000000 },
      ]
    };
  }

  const totalMarketCap = creditsData.credits.reduce((sum, c) => sum + c.value, 0);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>PBPE Credits Market</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>Dynamic pricing — Demand / Liquidity / Volatility</p>

      <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>PBPE Credits</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Volume</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Value</th>
             </tr>
          </thead>
          <tbody>
            {creditsData.credits.map((credit, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "8px", fontWeight: 500 }}>{credit.type}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>{(credit.volume / 1e6).toFixed(0)}M</td>
                <td style={{ textAlign: "right", padding: "8px" }}>${credit.price.toFixed(2)}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>${(credit.value / 1e6).toFixed(0)}M</td>
              </tr>
            ))}
          </tbody>
         </table>
      </div>

      <div style={{ marginTop: "24px", background: "white", padding: "16px", borderRadius: "12px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>Market Overview</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Market Cap</div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>${(totalMarketCap / 1e9).toFixed(2)}B</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Avg Price</div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>${(creditsData.credits.reduce((s, c) => s + c.price, 0) / 4).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
