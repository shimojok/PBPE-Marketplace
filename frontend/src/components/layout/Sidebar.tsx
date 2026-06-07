import React from "react";
import Link from "next/link";
import { useT } from "../../i18n/useT";
import "./Sidebar.css";

export const Sidebar = () => {
  const t = useT();

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link href="/dashboard">{t("dashboard")}</Link>
        </li>
        <li>
          <Link href="/dashboard/global-kpis">{t("global_kpis")}</Link>
        </li>
        <li>
          <Link href="/dashboard/ghg">{t("ghg_emissions")}</Link>
        </li>
        <li>
          <Link href="/dashboard/impact">{t("impact_analysis")}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
