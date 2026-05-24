import React, { useEffect, useState } from "react";
import { listBonds, priceBond } from "../../api/bonds";
import "./Pricing.css";

export default function BondPricingPage() {
  const [bonds, setBonds] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [yieldPercent, setYieldPercent] = useState<number>(4.0);
  const [pbpeActual, setPbpeActual] = useState<number | undefined>(undefined);
  const [impactActual, setImpactActual] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    listBonds().then(d => {
      setBonds(d.bonds);
      if (d.bonds.length > 0) {
        setSelected(d.bonds[0].bond_id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    handlePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handlePrice = async () => {
    if (!selected) return;
    const payload: any = {
      bond_id: selected,
      yield_percent: yieldPercent,
    };
    if (pbpeActual !== undefined) payload.pbpe_actual = pbpeActual;
    if (impactActual !== undefined) payload.impact_actual = impactActual;

    const res = await priceBond(payload);
    setResult(res);
  };

  const bond = bonds.find(b => b.bond_id === selected);

  return (
    <div className="bond-pricing-container">
      <h1>PBPE Bond Pricing Simulator</h1>

      <div className="bond-form">
        <label>Bond</label>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {bonds.map(b => (
            <option key={b.bond_id} value={b.bond_id}>
              {b.bond_id}
            </option>
          ))}
        </select>

        <label>Market Yield (%)</label>
        <input
          type="number"
          step="0.1"
          value={yieldPercent}
          onChange={e => setYieldPercent(parseFloat(e.target.value))}
        />

        <label>PBPE Actual (optional)</label>
        <input
          type="number"
          value={pbpeActual ?? ""}
          onChange={e =>
            setPbpeActual(
              e.target.value === "" ? undefined : parseFloat(e.target.value)
            )
          }
        />

        <label>Impact Actual (optional)</label>
        <input
          type="number"
          value={impactActual ?? ""}
          onChange={e =>
            setImpactActual(
              e.target.value === "" ? undefined : parseFloat(e.target.value)
            )
          }
        />

        <button onClick={handlePrice}>Recalculate</button>
      </div>

      {bond && result && (
        <div className="bond-result">
          <h2>{bond.bond_id}</h2>
          <p>Outstanding: ${bond.outstanding_usd.toLocaleString()}</p>
          <p>Base Coupon: {bond.coupon_percent}%</p>
          <p>PBPE Floor: {bond.pbpe_floor}</p>
          <p>Impact Floor: {bond.impact_floor}</p>
          <hr />
          <p>Market Yield: {result.yield_percent}%</p>
          <p>Effective Coupon: {result.coupon_percent_effective.toFixed(2)}%</p>
          <p>Price: {result.price_percent_of_par.toFixed(2)}% of par</p>
        </div>
      )}
    </div>
  );
}
