import React, { useEffect, useState } from "react";
import { getPBPEIssuance } from "../../api/dashboard";

export default function PBPEIssuanceView() {
  const [pbpe, setPBPE] = useState<any | null>(null);

  useEffect(() => {
    getPBPEIssuance().then(setPBPE);
  }, []);

  if (!pbpe) return null;

  return (
    <div>
      <h2>PBPE Issuance</h2>

      <p>Total PBPE per year: {pbpe.total_pbpe_per_year}</p>

      <h3>Components</h3>
      <ul>
        <li>Carbon PBPE: {pbpe.components.carbon_pbpe}</li>
        <li>Soil PBPE: {pbpe.components.soil_pbpe}</li>
        <li>Water PBPE: {pbpe.components.water_pbpe}</li>
        <li>Health PBPE: {pbpe.components.health_pbpe}</li>
      </ul>
    </div>
  );
}
