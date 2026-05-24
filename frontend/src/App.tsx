import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import GlobalKPIs from "./pages/Dashboard/GlobalKPIs";
import ImpactView from "./pages/Dashboard/ImpactView";
import ValueFlywheel from "./pages/Dashboard/ValueFlywheel";
import MarketView from "./pages/Dashboard/MarketView";
import FinanceView from "./pages/Dashboard/FinanceView";
import EnterpriseView from "./pages/Dashboard/EnterpriseView";
import PBPEIssuanceView from "./pages/Dashboard/PBPEIssuanceView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard/kpis" element={<GlobalKPIs />} />
        <Route path="/dashboard/impact" element={<ImpactView />} />
        <Route path="/dashboard/flywheel" element={<ValueFlywheel />} />
        <Route path="/dashboard/market" element={<MarketView />} />
        <Route path="/dashboard/finance" element={<FinanceView />} />
        <Route path="/dashboard/enterprise" element={<EnterpriseView />} />
        <Route path="/dashboard/pbpe" element={<PBPEIssuanceView />} />

      </Routes>
    </BrowserRouter>
  );
}
