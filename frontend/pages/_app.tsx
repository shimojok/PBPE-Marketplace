import '../styles/dashboard.css'
import '../src/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-badge">PB</div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">PBPE Marketplace</div>
            <div className="sidebar-logo-sub">Planetary Balance Sheet Engine</div>
          </div>
        </div>

        <div>
          <div className="sidebar-section-title">Global</div>
          <nav className="sidebar-nav">
            <a href="/dashboard/kpis" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>Global KPIs</span>
            </a>
            <a href="/dashboard/impact" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>Impact Breakdown</span>
            </a>
          </nav>
        </div>

        <div>
          <div className="sidebar-section-title">Markets</div>
          <nav className="sidebar-nav">
            <a href="/dashboard/market" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>PBPE Credits Market</span>
            </a>
            <a href="/dashboard/finance" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>Bonds & Insurance</span>
            </a>
          </nav>
        </div>

        <div>
          <div className="sidebar-section-title">Enterprise</div>
          <nav className="sidebar-nav">
            <a href="/dashboard/enterprise" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>Scope 3 × PBPE</span>
            </a>
            <a href="/dashboard/pbpe" className="sidebar-link">
              <span className="sidebar-link-dot" />
              <span>PBPE Issuance</span>
            </a>
          </nav>
        </div>

        <div className="sidebar-footer">
          PBPE Dashboard v3  
          <br />
          <span style={{ color: '#4b5563' }}>Prototype UI</span>
        </div>
      </aside>

      <main className="main">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
