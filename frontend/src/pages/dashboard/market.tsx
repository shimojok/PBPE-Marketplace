<Page title={t("market.title")}>

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

</Page>
