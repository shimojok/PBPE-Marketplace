import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><Link to="/dashboard/kpis">Global KPIs</Link></li>
        <li><Link to="/dashboard/impact">GHG Breakdown</Link></li>
        <li><Link to="/dashboard/flywheel">Value Flywheel</Link></li>
        <li><Link to="/dashboard/market">Credits Market</Link></li>
        <li><Link to="/dashboard/finance">PBPE Bonds</Link></li>
        <li><Link to="/dashboard/enterprise">Enterprise</Link></li>
        <li><Link to="/dashboard/pbpe">PBPE Issuance</Link></li>
      </ul>
    </div>
  );
}
