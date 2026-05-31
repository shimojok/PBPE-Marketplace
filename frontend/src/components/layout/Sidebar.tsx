import React from "react";
import { Link } from "react-router-dom";
import { useT } from "../../i18n/useT";
import "./Sidebar.css";

export default function Sidebar() {
  const t = useT();

  return (
    <div className="sidebar">
      <h3>{t("dashboard.navigation")}</h3>

      <ul>
        <li><Link to="/dashboard/kpis">{t("dashboard.global_kpis")}</Link></li>
        <li><Link to="/dashboard/impact">{t("dashboard.impact")}</Link></li>
        <li><Link to="/dashboard/flywheel">{t("dashboard.flywheel")}</Link></li>
        <li><Link to="/dashboard/market">{t("dashboard.market")}</Link></li>
        <li><Link to="/dashboard/finance">{t("dashboard.finance")}</Link></li>
        <li><Link to="/dashboard/enterprise">{t("dashboard.enterprise")}</Link></li>
        <li><Link to="/dashboard/pbpe">{t("dashboard.pbpe")}</Link></li>
      </ul>
    </div>
  );
}
