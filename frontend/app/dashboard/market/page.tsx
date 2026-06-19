// frontend/app/dashboard/market/page.tsx
// PBPE Credits Market - ダークテーマ対応版

export default function MarketPage() {
  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
  };

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
    <div style={{ padding: "0" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#f1f5f9" }}>
        PBPE Credits Market
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Dynamic pricing — Demand / Liquidity / Volatility
      </p>

      {/* Middle Section: 2 Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        {/* Left: PBPE Credits Table */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            PBPE Credits
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155" }}>
                <th style={{ textAlign: "left", padding: "8px", color: "#94a3b8" }}>Type</th>
                <th style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>Volume (PBPE)</th>
                <th style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>Price (USD)</th>
                <th style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>Value (USD)</th>
                <th style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>24h</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((credit, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "8px", fontWeight: 500, color: "#f1f5f9" }}>{credit.type}</td>
                  <td style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>
                    {(credit.volume / 1e6).toFixed(0)}M
                  </td>
                  <td style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>
                    ${credit.price.toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right", padding: "8px", color: "#94a3b8" }}>
                    ${(credit.value / 1e6).toFixed(0)}M
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "8px",
                      color: credit.change >= 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {credit.change >= 0 ? "+" : ""}{credit.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Market Overview */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Market Overview
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Market Cap</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>
                ${(totalMarketCap / 1e9).toFixed(2)}B
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Avg Price</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>
                ${avgPrice.toFixed(2)}
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>24h Volume</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>$124M</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Liquidity Index</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>0.67</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Price History Chart */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
          PBPE Price History (USD)
        </h3>
        <div style={{ position: "relative", height: "200px", marginBottom: "16px" }}>
          <div style={{
            position: "relative",
            height: "160px",
            borderBottom: "1px solid #334155",
            borderLeft: "1px solid #334155",
            marginLeft: "40px",
          }}>
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={priceHistory.map((p, i) => {
                  const x = (i / (priceHistory.length - 1)) * 100;
                  const y = 100 - ((p.price - minPrice) / (maxPrice - minPrice)) * 100;
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <polygon
                points={`0,100 ${priceHistory.map((p, i) => {
                  const x = (i / (priceHistory.length - 1)) * 100;
                  const y = 100 - ((p.price - minPrice) / (maxPrice - minPrice)) * 100;
                  return `${x},${y}`;
                }).join(" ")} 100,100`}
                fill="rgba(34,197,94,0.1)"
              />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "40px", marginTop: "8px" }}>
            {priceHistory.map((p, i) => (
              <div key={i} style={{ fontSize: "10px", color: "#94a3b8", textAlign: "center" }}>{p.month}</div>
            ))}
          </div>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#94a3b8",
          }}>
            <div>${maxPrice.toFixed(2)}</div>
            <div>${((maxPrice + minPrice) / 2).toFixed(2)}</div>
            <div>${minPrice.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
          Last 12 months · PBPE average price
        </div>
      </div>
    </div>
  );
}