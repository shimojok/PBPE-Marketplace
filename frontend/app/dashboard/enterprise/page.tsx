// frontend/app/dashboard/enterprise/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function EnterprisePage() {
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

  const data = isMbtOn
    ? {
        companies_onboarded: 128,
        countries: 22,
        scope3_reports_linked: 74,
        scope3_reduction_tco2e_per_year: 180000000
      }
    : {
        companies_onboarded: 0,
        countries: 0,
        scope3_reports_linked: 0,
        scope3_reduction_tco2e_per_year: 0
      }

  const scope3Total = data.scope3_reduction_tco2e_per_year
  const pbpeConversion = scope3Total

  const categories = isMbtOn
    ? [
        { name: "Purchased Goods & Services", value: 45 },
        { name: "Transport (Upstream)", value: 35 },
        { name: "Waste", value: 25 },
        { name: "Business Travel & Commute", value: 20 },
        { name: "Transport (Downstream)", value: 18 },
        { name: "Use of Sold Products", value: 12 },
        { name: "Other", value: 25 },
      ]
    : [
        { name: "Purchased Goods & Services", value: 0 },
        { name: "Transport (Upstream)", value: 0 },
        { name: "Waste", value: 0 },
        { name: "Business Travel & Commute", value: 0 },
        { name: "Transport (Downstream)", value: 0 },
        { name: "Use of Sold Products", value: 0 },
        { name: "Other", value: 0 },
      ]

  const maxValue = 45

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
        Scope 3 × PBPE {isMbtOn ? '(MBT ON)' : '(MBT OFF)'}
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Enterprise carbon accounting — Automated PBPE conversion
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Scope 3 → PBPE Conversion
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: isMbtOn ? "#22c55e" : "#475569" }}>
              {(scope3Total / 1e6).toFixed(0)}M
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>tCO₂e reduced</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>{(pbpeConversion / 1e6).toFixed(0)}M</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>PBPE Converted</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '1:1' : '0:1'}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Exchange Rate</div>
            </div>
          </div>
          <div style={{ padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", textAlign: "center", border: `1px solid ${isMbtOn ? '#22c55e' : '#475569'}` }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: isMbtOn ? "#22c55e" : "#94a3b8" }}>
              {isMbtOn ? '✓ 100% Offset Rate' : '✗ No Offset'}
            </span>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Category Breakdown
          </h3>
          {categories.map((cat, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px", color: "#94a3b8" }}>
                <span>{cat.name}</span>
                <span>{cat.value} MtCO₂e</span>
              </div>
              <div style={{ backgroundColor: "#334155", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
                <div style={{
                  width: isMbtOn ? `${(cat.value / maxValue) * 100}%` : '0%',
                  backgroundColor: "#3b82f6",
                  height: "100%",
                }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #334155", textAlign: "right", fontSize: "12px", color: "#94a3b8" }}>
            Total: {(scope3Total / 1e6).toFixed(0)} MtCO₂e
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
          Enterprise Portfolio
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}>
          <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "8px" }}>PBPE Credits</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '12.5M PBPE' : '0 PBPE'}</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{isMbtOn ? '$125M Value' : '$0 Value'}</div>
          </div>
          <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "8px" }}>PBPE Bonds</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '$45M' : '$0'}</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{isMbtOn ? 'Yield 3.1%' : 'Yield 0%'}</div>
          </div>
          <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "8px" }}>PBPE Insurance</div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#f1f5f9" }}>{isMbtOn ? '$8.2M' : '$0'}</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{isMbtOn ? '12 Policies' : '0 Policies'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}