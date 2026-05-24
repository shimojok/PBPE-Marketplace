import React, { useEffect, useState } from "react";
import { getBondDashboard } from "../../api/dashboard";
import { BondsTable } from "../../components/tables/BondsTable";

export default function FinanceView() {
  const [bonds, setBonds] = useState<any | null>(null);

  useEffect(() => {
    getBondDashboard().then(setBonds);
  }, []);

  if (!bonds) return null;

  return (
    <div>
      <h2>PBPE Finance – Bonds</h2>
      <BondsTable data={bonds.bonds} />
    </div>
  );
}
