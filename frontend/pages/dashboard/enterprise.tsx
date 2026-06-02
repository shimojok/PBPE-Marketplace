export default function Enterprise() {
  return (
    <>
      <div className="main-header">
        <div className="main-title-block">
          <div className="main-title">Enterprise Scope 3 × PBPE</div>
          <div className="main-subtitle">
            Scope 3 emissions mapped into PBPE credits, bonds, and insurance portfolio
          </div>
        </div>
        <div className="main-badge">/dashboard/enterprise</div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Scope 3 → PBPE</div>
              <div className="card-metric">Automatic mapping</div>
            </div>
            <span className="card-tag">Prototype</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Emissions (tCO₂e)</th>
                  <th>PBPE Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Purchased goods</td>
                  <td>120,000</td>
                  <td>PBPE-CARBON-2030</td>
                </tr>
                <tr>
                  <td>Upstream transport</td>
                  <td>45,000</td>
                  <td>PBPE-SOIL-2030</td>
                </tr>
                <tr>
                  <td>Use of sold products</td>
                  <td>210,000</td>
                  <td>PBPE-WATER-2030</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">Static mapping example for enterprise view</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Enterprise PBPE Portfolio</div>
              <div className="card-metric">Credits / Bonds / Insurance</div>
            </div>
            <span className="card-tag">Portfolio</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Allocation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PBPE-CARBON-2030</td>
                  <td>Credit</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>PBPE-SOIL-2030</td>
                  <td>Credit</td>
                  <td>25%</td>
                </tr>
                <tr>
                  <td>PBPE-BOND-2035</td>
                  <td>Bond</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>PBPE-INS-CLIMATE</td>
                  <td>Insurance</td>
                  <td>15%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">Illustrative PBPE allocation for a single enterprise</div>
        </div>
      </div>
    </>
  )
}
