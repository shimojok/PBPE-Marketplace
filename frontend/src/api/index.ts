import axios from "axios";

const api = axios.create({
  baseURL: "https://pbpe-backend-production.up.railway.app",
});

// ここで毎回 Token を自動で付与する
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["token"] = token;
  }
  return config;
});

export default api;
