import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getDashboardSummary = () =>
  api.get("/dashboard/summary").then(res => res.data);

export const getGHGBreakdown = () =>
  api.get("/dashboard/ghg-breakdown").then(res => res.data);

export const getPBPEIssuance = () =>
  api.get("/dashboard/pbpe").then(res => res.data);

export const getFlywheel = () =>
  api.get("/dashboard/flywheel").then(res => res.data);

export const getCreditMarket = () =>
  api.get("/dashboard/credits/market").then(res => res.data);

export const getBondDashboard = () =>
  api.get("/dashboard/finance/bonds").then(res => res.data);

export const getEnterpriseUsage = () =>
  api.get("/dashboard/enterprise/usage").then(res => res.data);
