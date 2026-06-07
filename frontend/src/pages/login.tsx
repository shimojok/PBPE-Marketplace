import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.access_token;

      if (!token) {
        setError("Invalid response from server");
        return;
      }

      localStorage.setItem("token", token);

      window.location.href = "/dashboard/kpis";
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <div>
        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
