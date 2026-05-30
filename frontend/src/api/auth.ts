import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password }).then(res => res.data);
