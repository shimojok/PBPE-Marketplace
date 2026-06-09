export default function Finance() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">PBPE Bonds & Insurance</div>
          <div className="main-subtitle">
            Bond pricing simulator and PBPE-linked insurance products
          </div>
        </div>
        <div className="main-badge">/dashboard/finance</div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">PBPE Bond Pricing</div>
              <div className="card-metric">Yield → Price</div>
            </div>
            <span className="card-tag">Simulator (static)</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <div className="bar-row">
              <span className="bar-label">Yield 2.0%</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '80%' }} />
              </div>
              <span className="bar-value">Price 104.2</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Yield 3.5%</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '60%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
              </div>
              <span className="bar-value">Price 98.7</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Yield 5.0%</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '40%', background: 'linear-gradient(90deg,#f97316,#22c55e)' }} />
              </div>
              <span className="bar-value">Price 92.1</span>
            </div>
          </div>
          <div className="card-footer">PBPE floor & impact floor can be layered on top</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">PBPE Insurance</div>
              <div className="card-metric">Products / Quotes / Policies</div>
            </div>
            <span className="card-tag">Structure</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Products: Yield protection, climate risk, health system stress</li>
              <li>Quote: PBPE-linked premium based on impact profile</li>
              <li>Policies: Portfolio of PBPE-backed insurance contracts</li>
            </ul>
          </div>
          <div className="card-footer">Static UI scaffold for future integration</div>
        </div>
      </div>
    </>
  )
}
