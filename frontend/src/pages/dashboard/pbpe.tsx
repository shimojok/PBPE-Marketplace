<Page title={t("pbpe.title")}>

  <PBPEIssuanceTimeline data={data.timeline} />

  <div className="chart-row">
    <PBPEComponentsChart data={data.components} />
    <PBPERegistryTable data={data.registry} />
  </div>

</Page>
