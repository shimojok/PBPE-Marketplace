import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// --- Token Interceptor (Next.js + axios v1.6 Safe Version) ---
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }
    (config.headers as any)["token"] = token;
  }

  return config;
});

export default api;
