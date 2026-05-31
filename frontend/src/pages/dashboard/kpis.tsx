<Page title={t("kpis.title")}>

  <div className="kpi-grid">
    <KpiCard label={t("kpis.total_pbpe")} value={data.total_pbpe} />
    <KpiCard label={t("kpis.ghg_reduction")} value={data.ghg_reduction_tco2e} />
    <KpiCard label={t("kpis.soil_carbon")} value={data.soil_carbon_tc} />
    <KpiCard label={t("kpis.biosecurity")} value={data.biosecurity_index} />
    <KpiCard label={t("kpis.health")} value={data.health_index} />
    <KpiCard label={t("kpis.stability")} value={data.stability_index} />
  </div>

  <div className="chart-row">
    <GHGStackedBar data={data.ghg_breakdown} />
    <PBPEIssuanceDonut data={data.pbpe_components} />
  </div>

</Page>
