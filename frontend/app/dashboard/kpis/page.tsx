// frontend/app/dashboard/kpis/page.tsx
async function fetchSummary() {
  const res = await fetch('http://localhost:8000/dashboard/summary');
  return res.json();
}

async function fetchGHG() {
  const res = await fetch('http://localhost:8000/dashboard/ghg-breakdown');
  return res.json();
}

async function fetchCredits() {
  const res = await fetch('http://localhost:8000/dashboard/credits/market');
  return res.json();
}

async function fetchEnterprise() {
  const res = await fetch('http://localhost:8000/dashboard/enterprise/usage');
  return res.json();
}

async function fetchFlywheel() {
  const res = await fetch('http://localhost:8000/dashboard/flywheel');
  return res.json();
}

export default async function KPIsPage() {
  const [summary, ghg, credits, enterprise, flywheel] = await Promise.all([
    fetchSummary(),
    fetchGHG(),
    fetchCredits(),
    fetchEnterprise(),
    fetchFlywheel()
  ]);

  return (
    <>
      {/* KPI Cards - 6枚 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="card-title">GHG Reduction</div>
          <div className="card-value">{summary.ghg_reduction_tco2e_per_year.toLocaleString()} tCO₂e/yr</div>
          <div className="card-sub">Units: {summary.units.toLocaleString()}</div>
        </div>
        {/* 残り5枚も同様 */}
      </div>

      {/* 中段: 2列 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 左: GHG Breakdown Stacked Bar */}
        <div className="card">
          <div className="card-title">GHG Reduction by Source</div>
          {/* スタックバー実装 */}
        </div>

        {/* 右: PBPE Value Flywheel */}
        <div className="card">
          <div className="card-title">PBPE Value Flywheel</div>
          {/* フライホイール図 */}
        </div>
      </div>

      {/* 下段: 2列 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左: Credits Table */}
        <div className="card">
          <div className="card-title">PBPE Credits Market</div>
          <table className="w-full">{/* テーブル実装 */}</table>
        </div>

        {/* 右: Enterprise Usage */}
        <div className="card">
          <div className="card-title">Enterprise Usage</div>
          <div>Companies: {enterprise.companies_onboarded}</div>
          <div>Countries: {enterprise.countries}</div>
          <div>Scope3 Reports: {enterprise.scope3_reports_linked}</div>
        </div>
      </div>
    </>
  );
}
