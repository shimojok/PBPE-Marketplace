export default function Impact() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">Impact Breakdown</div>
          <div className="main-subtitle">
            GHG, Soil, Water, Health — AGRIX / HealthBook / MBT55 contribution
          </div>
        </div>
        <div className="main-badge">/dashboard/impact</div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">GHG by Category</div>
              <div className="card-metric">-18.4 MtCO₂e</div>
            </div>
            <span className="card-tag card-tag-positive">Stacked</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <div className="bar-row">
              <span className="bar-label">Agriculture</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '45%' }} />
              </div>
              <span className="bar-value">-8.3</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Land Use</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '30%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
              </div>
              <span className="bar-value">-5.4</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Supply Chain</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '25%', background: 'linear-gradient(90deg,#f97316,#22c55e)' }} />
              </div>
              <span className="bar-value">-4.7</span>
            </div>
          </div>
          <div className="card-footer">Illustrative stacked bar by category</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Soil / Water / Health</div>
              <div className="card-metric">Multi-dimensional uplift</div>
            </div>
            <span className="card-tag">Composite</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <div className="bar-row">
              <span className="bar-label">Soil Carbon</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '70%' }} />
              </div>
              <span className="bar-value">+3.2 tC/ha</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Water Security</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '55%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
              </div>
              <span className="bar-value">+18 index</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Health Outcomes</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '60%', background: 'linear-gradient(90deg,#f97316,#22c55e)' }} />
              </div>
              <span className="bar-value">+21 index</span>
            </div>
          </div>
          <div className="card-footer">HealthBook & MBT55 integrated view</div>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">AGRIX</div>
              <div className="card-metric">Yield × Soil</div>
            </div>
            <span className="card-tag card-tag-positive">Impact source</span>
          </div>
          <div style={{ fontSize: 12, marginTop: 8 }}>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Field-level yield & soil carbon data</li>
              <li>Regenerative practice adoption</li>
              <li>Feeds PBPE Soil & GHG components</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">HealthBook</div>
              <div className="card-metric">Health outcomes</div>
            </div>
            <span className="card-tag card-tag-positive">Impact source</span>
          </div>
          <div style={{ fontSize: 12, marginTop: 8 }}>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Population-level health indicators</li>
              <li>Nutrition, chronic disease, resilience</li>
              <li>Feeds PBPE Health component</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">MBT55</div>
              <div className="card-metric">Stability & resilience</div>
            </div>
            <span className="card-tag card-tag-positive">Impact source</span>
          </div>
          <div style={{ fontSize: 12, marginTop: 8 }}>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Macro stability & systemic risk</li>
              <li>Climate, food, health system stress</li>
              <li>Feeds PBPE Stability component</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
