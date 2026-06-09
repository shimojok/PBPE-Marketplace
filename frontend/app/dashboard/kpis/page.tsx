export default function KPIs() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">Global KPIs</div>
          <div className="main-subtitle">
            Planetary balance sheet — GHG, Soil, Water, Health, Stability, PBPE
          </div>
        </div>
        <div className="main-badge">/dashboard/kpis</div>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">GHG Balance</div>
              <div className="card-metric">-18.4 MtCO₂e</div>
            </div>
            <span className="card-tag card-tag-positive">Net negative</span>
          </div>
          <div className="card-footer">vs. baseline 2030 scenario</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Soil Carbon</div>
              <div className="card-metric">+3.2 tC/ha</div>
            </div>
            <span className="card-tag card-tag-positive">Regenerative</span>
          </div>
          <div className="card-footer">AGRIX-backed soil carbon uplift</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Water & Health</div>
              <div className="card-metric">+24.5 index</div>
            </div>
            <span className="card-tag card-tag-positive">Improving</span>
          </div>
          <div className="card-footer">Water security & HealthBook composite</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">PBPE Issuance</div>
              <div className="card-metric">128.4 M PBPE</div>
            </div>
            <span className="card-tag">Credits & Bonds</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
            <div className="donut">
              <div className="donut-inner">
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Composition</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>PBPE</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, flex: 1 }}>
              <div className="bar-row">
                <span className="bar-label">Carbon</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '40%' }} />
                </div>
                <span className="bar-value">40%</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Soil</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '25%' }} />
                </div>
                <span className="bar-value">25%</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Water</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '20%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
                </div>
                <span className="bar-value">20%</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">Health</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '15%', background: 'linear-gradient(90deg,#f97316,#22c55e)' }} />
                </div>
                <span className="bar-value">15%</span>
              </div>
            </div>
          </div>
          <div className="card-footer">PBPE registry composition (illustrative)</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Global Flywheel</div>
              <div className="card-metric">Impact → PBPE → Capital</div>
            </div>
            <span className="card-tag">System view</span>
          </div>
          <div style={{ fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>AGRIX: Soil & yield → PBPE Credits</li>
              <li>HealthBook: Health outcomes → PBPE Health component</li>
              <li>MBT55: Stability & resilience → PBPE Stability</li>
              <li>PBPE Credits & Bonds: Capital allocation back to projects</li>
            </ul>
          </div>
          <div className="card-footer">Closed-loop between impact data and capital markets</div>
        </div>
      </div>
    </>
  )
}
