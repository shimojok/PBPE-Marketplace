<Page title={t("impact.title")}>

  <div className="chart-row">
    <GHGStackedBar data={data.ghg_breakdown} />
    <SoilWaterHealthChart data={data.swh} />
  </div>

  <div className="improvement-row">
    <ImprovementCard label="AGRIX" value={data.agrix_improvement} />
    <ImprovementCard label="HealthBook" value={data.healthbook_improvement} />
    <ImprovementCard label="MBT55" value={data.mbt55_improvement} />
  </div>

</Page>
