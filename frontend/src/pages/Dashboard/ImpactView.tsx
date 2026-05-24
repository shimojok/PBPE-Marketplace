import React, { useEffect, useState } from "react";
import { getGHGBreakdown } from "../../api/dashboard";
import { GHGStackedBar } from "../../components/charts/GHGStackedBar";

export default function ImpactView() {
  const [ghg, setGHG] = useState<any | null>(null);

  useEffect(() => {
    getGHGBreakdown().then(setGHG);
  }, []);

  if (!ghg) return null;

  return (
    <div>
      <h2>GHG Reduction Breakdown</h2>
      <GHGStackedBar data={ghg} />
    </div>
  );
}
