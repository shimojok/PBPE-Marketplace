import React, { useEffect, useState } from "react";
import { getBondPrice, listBonds } from "../../api/bonds";

export default function BondPricingPage() {
  const [bondId, setBondId] = useState<string>("PBPE-GLOBAL-2035");
  const [price, setPrice] = useState<any | null>(null);
  const [bonds, setBonds] = useState<any[]>([]);

  useEffect(() => {
    listBonds().then(d => setBonds(d.bonds));
    getBondPrice(bondId).then(setPrice);
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setBondId(id);
    const p = await getBondPrice(id);
    setPrice(p);
  };

  return (
    <div>
      <h1>PBPE Bond Pricing</h1>

      <select value={bondId} onChange={handleChange}>
        {bonds.map(b => (
          <option key={b.bond_id} value={b.bond_id}>
            {b.bond_id}
          </option>
        ))}
      </select>

      {price && (
        <div>
          <p>Bond ID: {price.bond_id}</p>
          <p>Yield: {price.yield_percent}%</p>
          <p>Price: {price.price_percent_of_par}% of par</p>
        </div>
      )}
    </div>
  );
}
