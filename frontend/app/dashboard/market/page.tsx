export default function Market() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">PBPE Credits Market</div>
          <div className="main-subtitle">
            Dynamic pricing — Demand, Liquidity, Volatility, and PBPE credit inventory
          </div>
        </div>
        <div className="main-badge">/dashboard/market</div>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Demand Index</div>
              <div className="card-metric">0.78</div>
            </div>
            <span className="card-tag card-tag-positive">High</span>
          </div>
          <div className="card-footer">Relative to last 12 months</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Liquidity</div>
              <div className="card-metric">0.64</div>
            </div>
            <span className="card-tag">Moderate</span>
          </div>
          <div className="card-footer">Order book depth & turnover</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Volatility</div>
              <div className="card-metric">0.21</div>
            </div>
            <span className="card-tag card-tag-positive">Stable</span>
          </div>
          <div className="card-footer">30-day realized volatility</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">PBPE Credits Inventory</div>
            <div className="card-metric">Market snapshot</div>
          </div>
          <span className="card-tag">Illustrative</span>
        </div>
        <table className="table" style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Type</th>
              <th>Price (USD)</th>
              <th>Held</th>
              <th>Value (USD)</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PBPE-CARBON-2030</td>
              <td>Credit</td>
              <td>42.30</td>
              <td>1,200,000</td>
              <td>50,760,000</td>
              <td><span className="tag-soft-green">Core</span></td>
            </tr>
            <tr>
              <td>PBPE-SOIL-2030</td>
              <td>Credit</td>
              <td>31.80</td>
              <td>850,000</td>
              <td>27,030,000</td>
              <td><span className="tag-soft">Soil</span></td>
            </tr>
            <tr>
              <td>PBPE-WATER-2030</td>
              <td>Credit</td>
              <td>24.10</td>
              <td>620,000</td>
              <td>14,942,000</td>
              <td><span className="tag-soft">Water</span></td>
            </tr>
            <tr>
              <td>PBPE-HEALTH-2030</td>
              <td>Credit</td>
              <td>28.50</td>
              <td>540,000</td>
              <td>15,390,000</td>
              <td><span className="tag-soft">Health</span></td>
            </tr>
          </tbody>
        </table>
        <div className="card-footer">Static snapshot — price history line chart can be added later</div>
      </div>
    </>
  )
}
