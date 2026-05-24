import React, { useEffect, useState } from "react";
import { getEnterpriseUsage } from "../../api/dashboard";

export default function EnterpriseView() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    getEnterpriseUsage().then(setUsage);
  }, []);

  if (!usage) return null;

  return (
    <div>
      <h2>Enterprise Adoption</h2>
      <ul>
        <li>Companies: {usage.companies_onboarded}</li>
        <li>Countries: {usage.countries}</li>
        <li>Sectors: {usage.sectors.join(", ")}</li>
        <li>Scope 3 Reports Linked: {usage.scope3_reports_linked}</li>
      </ul>
    </div>
  );
}
