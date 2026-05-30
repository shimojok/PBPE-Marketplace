import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import api from "../api";

export default function Dashboard() {
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvertScope3 = async () => {
    try {
      setLoading(true);

      // Scope3 のダミーデータ（後で実データに置き換え可能）
      const payload = {
        sample: "data",
      };

      const res = await api.post("/scope3/convert", payload);
      setResult(res.data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main style={{ padding: 32 }}>
        <h1>PBPE Dashboard</h1>

        {/* ← このボタンが Scope3 を送信する */}
        <button onClick={handleConvertScope3} disabled={loading}>
          {loading ? "Converting..." : "Convert Scope3"}
        </button>

        <pre style={{ marginTop: 24, background: "#f5f5f5", padding: 16 }}>
          {result ? JSON.stringify(result, null, 2) : "No result yet"}
        </pre>
      </main>
    </ProtectedRoute>
  );
}
