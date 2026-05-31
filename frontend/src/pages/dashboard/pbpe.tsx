<div className="dashboard-page">

  <h1>{t("pbpe.title")}</h1>

  <PBPEIssuanceTimeline data={data.timeline} />

  <div className="chart-row">
    <PBPEComponentsChart data={data.components} />
    <PBPERegistryTable data={data.registry} />
  </div>

</div>
