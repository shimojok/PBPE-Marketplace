import React, { useEffect, useState } from "react";
import {
  listInsuranceProducts,
  getInsuranceQuote,
  listInsurancePolicies,
} from "../../api/insurance";

import "./Insurance.css";

export default function InsurancePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [quote, setQuote] = useState<any | null>(null);

  const [form, setForm] = useState({
    farm_id: "FARM-001",
    region: "JP-CHIBA",
    biosecurity_risk: 0.4,
    yield_volatility: 0.3,
    stability_index: 0.7,
    coverage_type: "biosecurity",
  });

  useEffect(() => {
    listInsuranceProducts().then(d => setProducts(d.products));
    listInsurancePolicies().then(d => setPolicies(d.policies));
  }, []);

  const handleQuote = async () => {
    const q = await getInsuranceQuote(form);
    setQuote(q);
  };

  const update = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="insurance-container">
      <h1>PBPE Insurance</h1>

      <section>
        <h2>Insurance Products</h2>
        <ul className="product-list">
          {products.map(p => (
            <li key={p.id}>
              <strong>{p.name}</strong>  
              <br />
              {p.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Get Insurance Quote</h2>

        <div className="form-grid">
          <label>Farm ID</label>
          <input
            value={form.farm_id}
            onChange={e => update("farm_id", e.target.value)}
          />

          <label>Region</label>
          <input
            value={form.region}
            onChange={e => update("region", e.target.value)}
          />

          <label>Biosecurity Risk</label>
          <input
            type="number"
            step="0.1"
            value={form.biosecurity_risk}
            onChange={e => update("biosecurity_risk", parseFloat(e.target.value))}
          />

          <label>Yield Volatility</label>
          <input
            type="number"
            step="0.1"
            value={form.yield_volatility}
            onChange={e => update("yield_volatility", parseFloat(e.target.value))}
          />

          <label>Stability Index</label>
          <input
            type="number"
            step="0.1"
            value={form.stability_index}
            onChange={e => update("stability_index", parseFloat(e.target.value))}
          />

          <label>Coverage Type</label>
          <select
            value={form.coverage_type}
            onChange={e => update("coverage_type", e.target.value)}
          >
            <option value="biosecurity">Biosecurity</option>
            <option value="yield">Yield</option>
          </select>
        </div>

        <button className="quote-btn" onClick={handleQuote}>
          Get Quote
        </button>

        {quote && (
          <div className="quote-box">
            <h3>Quote Result</h3>
            <p>Premium: ${quote.premium_usd_per_year} / year</p>
            <p>Coverage Limit: ${quote.coverage_limit_usd}</p>
            <p>Deductible: ${quote.deductible_usd}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Active Policies</h2>
        <ul className="policy-list">
          {policies.map(p => (
            <li key={p.policy_id}>
              <strong>{p.policy_id}</strong> — {p.status}
              <br />
              Premium: ${p.premium_usd_per_year}/year
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
