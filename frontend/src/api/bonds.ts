import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const listBonds = () =>
  api.get("/finance/bonds").then(res => res.data);

export const priceBond = (payload: {
  bond_id: string;
  yield_percent: number;
  pbpe_actual?: number;
  pbpe_floor?: number;
  impact_actual?: number;
  impact_floor?: number;
}) =>
  api.post("/finance/bonds/price", payload).then(res => res.data);
