<div className="dashboard-page">

  <h1>{t("market.title")}</h1>

  <MarketControls
    demand={demand}
    liquidity={liquidity}
    volatility={volatility}
    onChange={updateMarketParams}
  />

  <CreditsPriceTable prices={prices} />

  <div className="chart-row">
    <PriceHistoryChart data={history} />
    <MarketDepthChart data={depth} />
  </div>

</div>
