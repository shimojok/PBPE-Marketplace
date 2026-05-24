import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const listInsuranceProducts = () =>
  api.get("/finance/insurance/products").then(res => res.data);

export const getInsuranceQuote = (payload: any) =>
  api.post("/finance/insurance/quote", payload).then(res => res.data);

export const listInsurancePolicies = () =>
  api.get("/finance/insurance/policies").then(res => res.data);
