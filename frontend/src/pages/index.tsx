import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>PBPE Marketplace</h1>
      <p>Welcome to the PBPE Marketplace Platform</p>

      <div style={{ marginTop: 30 }}>
        <Link href="/login">Go to Login</Link>
      </div>

      <div style={{ marginTop: 10 }}>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
}
