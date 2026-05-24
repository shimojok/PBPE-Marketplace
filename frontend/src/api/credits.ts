import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const getCreditPrices = (params?: {
  demand_index?: number;
  liquidity_index?: number;
  volatility_index?: number;
}) =>
  api
    .get("/credits/price", { params })
    .then(res => res.data);
