import React, { useEffect, useState } from "react";
import { getCreditMarket } from "../../api/dashboard";
import { CreditsMarketTable } from "../../components/tables/CreditsMarketTable";

export default function MarketView() {
  const [market, setMarket] = useState<any | null>(null);

  useEffect(() => {
    getCreditMarket().then(setMarket);
  }, []);

  if (!market) return null;

  return (
    <div>
      <h2>PBPE Credits Market</h2>
      <CreditsMarketTable data={market.credits} />
    </div>
  );
}
