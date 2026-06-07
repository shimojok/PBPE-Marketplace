export default function Home() {
  return (
    <div className="main-title-block">
      <div className="main-title">PBPE Marketplace Dashboard v3</div>
      <div className="main-subtitle">
        Start from <a href="/dashboard/kpis">Global KPIs</a>
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>
        Routes:
        <ul>
          <li>/dashboard/kpis</li>
          <li>/dashboard/impact</li>
          <li>/dashboard/market</li>
          <li>/dashboard/finance</li>
          <li>/dashboard/enterprise</li>
          <li>/dashboard/pbpe</li>
        </ul>
      </div>
    </div>
  )
}
