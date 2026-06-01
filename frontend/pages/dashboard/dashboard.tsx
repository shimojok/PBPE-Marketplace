export default function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>PBPE Dashboard</h1>
      <ul>
        <li><a href="/dashboard/kpis">Global KPIs</a></li>
        <li><a href="/dashboard/impact">Impact</a></li>
        <li><a href="/dashboard/market">Market</a></li>
        <li><a href="/dashboard/finance">Finance</a></li>
        <li><a href="/dashboard/enterprise">Enterprise</a></li>
        <li><a href="/dashboard/pbpe">PBPE Model</a></li>
      </ul>
    </div>
  )
}
