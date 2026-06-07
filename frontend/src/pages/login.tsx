import React, { useState } from "react";
import { login } from "../api";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <div style={{ marginTop: 20 }}>
        <label>Email</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <button style={{ marginTop: 30 }} onClick={handleLogin}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
