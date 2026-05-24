import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const getBondPrice = (bondId?: string) =>
  api
    .get("/finance/bonds/price", {
      params: bondId ? { bond_id: bondId } : {},
    })
    .then(res => res.data);

export const listBonds = () =>
  api.get("/finance/bonds").then(res => res.data);
