import React, { useEffect, useState } from "react";
import {
  listInsuranceProducts,
  getInsuranceQuote,
  listInsurancePolicies,
} from "../../api/finance";

export default function InsurancePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [quote, setQuote] = useState<any | null>(null);

  useEffect(() => {
    listInsuranceProducts().then(d => setProducts(d.products));
    listInsurancePolicies().then(d => setPolicies(d.policies));
  }, []);

  const handleQuote = async () => {
    const payload = {
      farm_id: "FARM-001",
      region: "JP-CHIBA",
      biosecurity_risk: 0.4,
      yield_volatility: 0.3,
      stability_index: 0.7,
      coverage_type: "biosecurity",
    };
    const q = await getInsuranceQuote(payload);
    setQuote(q);
  };

  return (
    <div>
      <h1>PBPE Insurance</h1>

      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} – {p.coverage_type}
          </li>
        ))}
      </ul>

      <button onClick={handleQuote}>Get Sample Quote</button>

      {quote && (
        <div>
          <h3>Quote</h3>
          <p>Premium: ${quote.premium_usd_per_year} / year</p>
          <p>Coverage Limit: ${quote.coverage_limit_usd}</p>
          <p>Deductible: ${quote.deductible_usd}</p>
        </div>
      )}

      <h2>Policies</h2>
      <ul>
        {policies.map(p => (
          <li key={p.policy_id}>
            {p.policy_id} – {p.status} – ${p.premium_usd_per_year}/year
          </li>
        ))}
      </ul>
    </div>
  );
}
