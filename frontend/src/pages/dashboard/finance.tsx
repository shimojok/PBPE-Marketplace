<Page title={t("finance.title")}>

  <BondPricingSimulator />

  <div className="finance-row">
    <BondPortfolioTable data={portfolio.bonds} />
    <InsuranceProducts data={insurance.products} />
  </div>

</Page>
