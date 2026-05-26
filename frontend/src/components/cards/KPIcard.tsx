import React from "react";
import "./KPIcard.css";

export const KPIcard = ({ label, value, subtext }) => (
  <div className="kpi-card">
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    <div className="kpi-subtext">{subtext}</div>
  </div>
);
