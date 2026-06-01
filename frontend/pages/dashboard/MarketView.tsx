import React, { useEffect, useState } from "react";
import { getCreditMarket } from "../../api/dashboard";
import { getCreditPrices } from "../../api/credits";
import { CreditsMarketTable } from "../../components/tables/CreditsMarketTable";

export default function MarketView() {
  const [market, setMarket] = useState<any | null>(null);
  const [prices, setPrices] = useState<any | null>(null);

  const [params, setParams] = useState({
    demand_index: 0.5,
    liquidity_index: 0.5,
    volatility_index: 0.3,
  });

  useEffect(() => {
    getCreditMarket().then(setMarket);
  }, []);

  useEffect(() => {
    getCreditPrices(params).then(setPrices);
  }, [params]);

  const update = (key: string, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  if (!market || !prices) return null;

  const merged = market.credits.map((c: any) => ({
    ...c,
    price_usd:
      prices[
        c.type.charAt(0).toUpperCase() + c.type.slice(1) as keyof typeof prices
      ],
    value_usd:
      c.volume_pbpe *
      prices[
        c.type.charAt(0).toUpperCase() + c.type.slice(1) as keyof typeof prices
      ],
  }));

  return (
    <div>
      <h2>PBPE Credits Market</h2>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <div>
          <label>Demand Index</label>
          <input
            type="number"
            step="0.1"
            min={0}
            max={1}
            value={params.demand_index}
            onChange={e => update("demand_index", parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Liquidity Index</label>
          <input
            type="number"
            step="0.1"
            min={0}
            max={1}
            value={params.liquidity_index}
            onChange={e => update("liquidity_index", parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Volatility Index</label>
          <input
            type="number"
            step="0.1"
            min={0}
            max={1}
            value={params.volatility_index}
            onChange={e =>
              update("volatility_index", parseFloat(e.target.value))
            }
          />
        </div>
      </div>

      <CreditsMarketTable data={merged} />
    </div>
  );
}
