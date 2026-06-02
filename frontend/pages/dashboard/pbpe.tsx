export default function PBPEIssuance() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">PBPE Issuance</div>
          <div className="main-subtitle">
            Annual PBPE issuance, components, and registry scaffold
          </div>
        </div>
        <div className="main-badge">/dashboard/pbpe</div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Annual PBPE Issuance</div>
              <div className="card-metric">2018–2030</div>
            </div>
            <span className="card-tag">Static chart placeholder</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <div className="bar-row">
              <span className="bar-label">2026</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '65%' }} />
              </div>
              <span className="bar-value">24.3 M</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">2027</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '75%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
              </div>
              <span className="bar-value">28.7 M</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">2028</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '85%', background: 'linear-gradient(90deg,#f97316,#22c55e)' }} />
              </div>
              <span className="bar-value">32.9 M</span>
            </div>
          </div>
          <div className="card-footer">Static representation — real chart can be wired later</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">PBPE Components</div>
              <div className="card-metric">Carbon / Soil / Water / Health</div>
            </div>
            <span className="card-tag">Composition</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
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
                <div className="bar-fill" style={{ width: '25%', background: 'linear-gradient(90deg,#0ea5e9,#22c55e)' }} />
              </div>
              <span className="bar-value">25%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Water</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '20%', background: 'linear-gradient(90deg,#22c55e,#0ea5e9)' }} />
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
          <div className="card-footer">Matches composition used in Global KPIs view</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">PBPE Registry (Scaffold)</div>
            <div className="card-metric">Future extension</div>
          </div>
          <span className="card-tag">Registry</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th>PBPE ID</th>
                <th>Type</th>
                <th>Vintage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PBPE-2026-0001</td>
                <td>Credit</td>
                <td>2026</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>PBPE-2026-0002</td>
                <td>Bond</td>
                <td>2026</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>PBPE-2025-0043</td>
                <td>Credit</td>
                <td>2025</td>
                <td>Retired</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">Static registry scaffold for future on-chain / off-chain integration</div>
      </div>
    </>
  )
}
