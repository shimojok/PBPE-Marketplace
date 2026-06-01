<Page title={t("enterprise.title")}>

  <Scope3Summary data={data.summary} />

  <div className="chart-row">
    <Scope3BreakdownChart data={data.breakdown} />
    <PBPEConversionChart data={data.pbpe_conversion} />
  </div>

  <EnterprisePortfolio data={data.portfolio} />

</Page>
