import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// --- Token Interceptor (最終安定版 / 型を完全に無視して安全に動かす) ---
api.interceptors.request.use((config: any) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["token"] = token;
  }

  return config;
});

export default api;
