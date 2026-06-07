import axios, { AxiosRequestConfig } from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// --- Token Interceptor (TypeScript Safe Version) ---
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    // Axios v1.6+ requires headers to be AxiosHeaders, not {}
    if (!config.headers) {
      config.headers = {} as any;
    }

    // Force-cast to allow dynamic header assignment
    (config.headers as any)["token"] = token;
  }

  return config;
});

export default api;
