// frontend/app/dashboard/market/page.tsx

export default function MarketPage() {
  const credits = [
    { type: "Carbon", volume: 510000000, price: 10.00, value: 5100000000, change: 2.4 },
    { type: "Biosecurity", volume: 30000000, price: 14.00, value: 420000000, change: 5.1 },
    { type: "Food Loss", volume: 40000000, price: 9.00, value: 360000000, change: -1.2 },
    { type: "Quality", volume: 40000000, price: 8.00, value: 320000000, change: 0.8 },
  ];

  const totalMarketCap = credits.reduce((sum, c) => sum + c.value, 0);
  const avgPrice = credits.reduce((sum, c) => sum + c.price, 0) / credits.length;

  const priceHistory = [
    { month: "Jan", price: 8.50 }, { month: "Feb", price: 8.70 },
    { month: "Mar", price: 8.90 }, { month: "Apr", price: 9.20 },
    { month: "May", price: 9.50 }, { month: "Jun", price: 9.80 },
    { month: "Jul", price: 10.00 }, { month: "Aug", price: 10.20 },
    { month: "Sep", price: 10.10 }, { month: "Oct", price: 10.30 },
    { month: "Nov", price: 10.25 }, { month: "Dec", price: 10.00 },
  ];

  const maxPrice = Math.max(...priceHistory.map(p => p.price));
  const minPrice = Math.min(...priceHistory.map(p => p.price));

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>PBPE Credits Market</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>Dynamic pricing — Demand / Liquidity / Volatility</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>PBPE Credits</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Volume</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Value</th>
              <th style={{ textAlign: "right", padding: "8px" }}>24h</th>
            </tr></thead>
            <tbody>
              {credits.map((credit, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "8px", fontWeight: 500 }}>{credit.type}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>{(credit.volume / 1e6).toFixed(0)}M</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>${credit.price.toFixed(2)}</td>
                  <td style={{ textAlign: "right", padding: "8px" }}>${(credit.value / 1e6).toFixed(0)}M</td>
                  <td style={{ textAlign: "right", padding: "8px", color: credit.change >= 0 ? "#22c55e" : "#ef4444" }}>
                    {credit.change >= 0 ? "+" : ""}{credit.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>Market Overview</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Market Cap</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>${(totalMarketCap / 1e9).toFixed(2)}B</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Avg Price</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>${avgPrice.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>24h Volume</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>$124M</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", background: "#f3f4f6", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>Liquidity Index</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>0.67</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "16px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>PBPE Price History (USD)</h3>
        <div style={{ position: "relative", height: "200px", marginBottom: "16px" }}>
          <div style={{ position: "relative", height: "160px", borderBottom: "1px solid #e5e7eb", borderLeft: "1px solid #e5e7eb", marginLeft: "40px" }}>
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points={priceHistory.map((p, i) => {
                const x = (i / (priceHistory.length - 1)) * 100;
                const y = 100 - ((p.price - minPrice) / (maxPrice - minPrice)) * 100;
                return `${x},${y}`;
              }).join(" ")} fill="none" stroke="#22c55e" strokeWidth="2" />
              <polygon points={`0,100 ${priceHistory.map((p, i) => {
                const x = (i / (priceHistory.length - 1)) * 100;
                const y = 100 - ((p.price - minPrice) / (maxPrice - minPrice)) * 100;
                return `${x},${y}`;
              }).join(" ")} 100,100`} fill="rgba(34,197,94,0.1)" />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "40px", marginTop: "8px" }}>
            {priceHistory.map((p, i) => (<div key={i} style={{ fontSize: "10px", color: "#6b7280" }}>{p.month}</div>))}
          </div>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "10px", color: "#6b7280" }}>
            <div>${maxPrice.toFixed(2)}</div>
            <div>${((maxPrice + minPrice) / 2).toFixed(2)}</div>
            <div>${minPrice.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280", textAlign: "center" }}>Last 12 months · PBPE average price</div>
      </div>
    </div>
  );
}
