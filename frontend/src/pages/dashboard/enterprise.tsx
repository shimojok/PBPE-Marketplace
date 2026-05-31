<div className="dashboard-page">

  <h1>{t("enterprise.title")}</h1>

  <Scope3Summary data={data.summary} />

  <div className="chart-row">
    <Scope3BreakdownChart data={data.breakdown} />
    <PBPEConversionChart data={data.pbpe_conversion} />
  </div>

  <EnterprisePortfolio data={data.portfolio} />

</div>
