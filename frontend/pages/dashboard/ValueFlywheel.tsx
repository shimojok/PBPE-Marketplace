import React, { useEffect, useState } from "react";
import { getFlywheel } from "../../api/dashboard";

export default function ValueFlywheel() {
  const [flywheel, setFlywheel] = useState<any | null>(null);

  useEffect(() => {
    getFlywheel().then(setFlywheel);
  }, []);

  if (!flywheel) return null;

  return (
    <div>
      <h2>PBPE Value Flywheel</h2>

      <ul>
        <li>Investment: ¥{flywheel.investment_jpy_per_year.toLocaleString()}</li>
        <li>Ecosystem Improvement Index: {flywheel.ecosystem_improvement_index}</li>
        <li>Productivity Index: {flywheel.productivity_index}</li>
        <li>PBPE Issued: {flywheel.pbpe_issued_per_year}</li>
        <li>Economic Return: ¥{flywheel.economic_return_jpy_per_year.toLocaleString()}</li>
        <li>Reinvestment Rate: {flywheel.reinvestment_rate}</li>
      </ul>

      <h3>Value Distribution</h3>
      <ul>
        <li>Farmers: ¥{flywheel.value_distribution.farmers_jpy.toLocaleString()}</li>
        <li>Enterprises: ¥{flywheel.value_distribution.enterprises_jpy.toLocaleString()}</li>
        <li>Governments: ¥{flywheel.value_distribution.governments_jpy.toLocaleString()}</li>
      </ul>
    </div>
  );
}
