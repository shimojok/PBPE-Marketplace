import React, { useState } from "react";
import { login } from "../../api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
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
        <input value={email} onChange={e => setEmail(e.target.value)} />
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
