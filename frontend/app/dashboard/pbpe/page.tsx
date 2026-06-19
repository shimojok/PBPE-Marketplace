// frontend/app/dashboard/pbpe/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function PbpePage() {
  const [mbtEnabled, setMbtEnabled] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const mbtParam = params.get('mbt')
    if (mbtParam === 'on') setMbtEnabled(true)
    else if (mbtParam === 'off') setMbtEnabled(false)

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search)
      const m = p.get('mbt')
      if (m === 'on') setMbtEnabled(true)
      else if (m === 'off') setMbtEnabled(false)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const isMbtOn = mbtEnabled

  const components = isMbtOn
    ? [
        { name: "Carbon", amount: 510000000, color: "#22c55e" },
        { name: "Soil", amount: 60000000, color: "#f59e0b" },
        { name: "Water", amount: 30000000, color: "#3b82f6" },
        { name: "Health", amount: 20000000, color: "#ef4444" },
      ]
    : [
        { name: "Carbon", amount: 0, color: "#475569" },
        { name: "Soil", amount: 0, color: "#475569" },
        { name: "Water", amount: 0, color: "#475569" },
        { name: "Health", amount: 0, color: "#475569" },
      ]

  const total = components.reduce((sum, c) => sum + c.amount, 0)

  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
  }

  return (
    <div style={{ padding: "0" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#f1f5f9" }}>
        PBPE Issuance {isMbtOn ? '(MBT ON)' : '(MBT OFF)'}
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Annual issuance — Carbon / Soil / Water / Health components
      </p>

      <div style={cardStyle}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
          PBPE Components
        </h3>
        {components.map((comp, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "#94a3b8" }}>
              <span>{comp.name}</span>
              <span>{(comp.amount / 1e6).toFixed(0)}M PBPE</span>
            </div>
            <div style={{ backgroundColor: "#334155", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
              <div style={{
                width: total > 0 ? `${(comp.amount / total) * 100}%` : '0%',
                backgroundColor: comp.color,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "8px",
                color: "white",
                fontSize: "11px",
                fontWeight: "bold",
              }}>
                {total > 0 ? `${((comp.amount / total) * 100).toFixed(0)}%` : '0%'}
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", textAlign: "center", border: "1px solid #334155" }}>
          <span style={{ color: "#94a3b8" }}>Total Issued: </span>
          <strong style={{ color: "#f1f5f9" }}>{(total / 1e6).toFixed(0)}M PBPE</strong>
          <span style={{ color: "#94a3b8" }}> / year</span>
        </div>
      </div>

      <div style={{ ...cardStyle, marginTop: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
          PBPE Registry
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '1,248' : '0'}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>Registry Entries</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '1,248' : '0'}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>7-digit Codes</div>
          </div>
          <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: isMbtOn ? "#60a5fa" : "#475569" }}>{isMbtOn ? 'Active' : 'Inactive'}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>Blockchain</div>
          </div>
        </div>
      </div>
    </div>
  )
}