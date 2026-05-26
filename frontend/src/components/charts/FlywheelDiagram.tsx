import React from "react";
import "./FlywheelDiagram.css";

export const FlywheelDiagram = ({ data }) => {
  return (
    <div className="flywheel">
      <div className="fw-item">Investment<br/>¥{data.investment_jpy_per_year.toLocaleString()}</div>
      <div className="fw-item">Ecosystem<br/>{data.ecosystem_improvement_index}</div>
      <div className="fw-item">Productivity<br/>{data.productivity_index}</div>
      <div className="fw-item">PBPE Issued<br/>{data.pbpe_issued_per_year}</div>
      <div className="fw-item">Economic Return<br/>¥{data.economic_return_jpy_per_year.toLocaleString()}</div>
    </div>
  );
};
