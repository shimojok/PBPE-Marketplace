<div className="dashboard-page">

  <h1>{t("finance.title")}</h1>

  <BondPricingSimulator />

  <div className="finance-row">
    <BondPortfolioTable data={portfolio.bonds} />
    <InsuranceProducts data={insurance.products} />
  </div>

</div>
