// frontend/app/dashboard/impact/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ImpactPage() {
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

  // MBT ON/OFFで値を切り替え
  const isMbtOn = mbtEnabled

  const ghgData = isMbtOn
    ? [
        { name: "Waste Avoidance", value: 180, color: "#22c55e" },
        { name: "Food Loss", value: 110, color: "#10b981" },
        { name: "Soil Carbon", value: 70, color: "#14b8a6" },
        { name: "Fertilizer Reduction", value: 40, color: "#06b6d4" },
        { name: "Livestock Methane", value: 30, color: "#3b82f6" },
        { name: "Rice Methane", value: 20, color: "#8b5cf6" },
        { name: "Biomass Increase", value: 15, color: "#a855f7" },
      ]
    : [
        { name: "Waste Avoidance", value: 0, color: "#475569" },
        { name: "Food Loss", value: 0, color: "#475569" },
        { name: "Soil Carbon", value: 0, color: "#475569" },
        { name: "Fertilizer Reduction", value: 0, color: "#475569" },
        { name: "Livestock Methane", value: 0, color: "#475569" },
        { name: "Rice Methane", value: 0, color: "#475569" },
        { name: "Biomass Increase", value: 0, color: "#475569" },
      ]

  const totalGHG = ghgData.reduce((sum, d) => sum + d.value, 0)

  const indicators = isMbtOn
    ? [
        { title: "Soil Carbon", value: "+3.2", unit: "tC/ha", sub: "AGRIX-backed" },
        { title: "Water Quality", value: "+24.5", unit: "index", sub: "Watershed improvement" },
        { title: "Health Score", value: "+18.2", unit: "pts", sub: "HealthBook composite" },
      ]
    : [
        { title: "Soil Carbon", value: "0", unit: "tC/ha", sub: "Baseline" },
        { title: "Water Quality", value: "0", unit: "index", sub: "Baseline" },
        { title: "Health Score", value: "0", unit: "pts", sub: "Baseline" },
      ]

  const improvements = isMbtOn
    ? [
        { module: "AGRIX", effect: "Yield +22%", detail: "Soil + Carbon" },
        { module: "HealthBook", effect: "Nutrition +31%", detail: "Lycopene / Polyphenols" },
        { module: "MBT55", effect: "Stability +18%", detail: "Microbial diversity" },
      ]
    : [
        { module: "AGRIX", effect: "Yield 0%", detail: "No improvement" },
        { module: "HealthBook", effect: "Nutrition 0%", detail: "No improvement" },
        { module: "MBT55", effect: "Stability 0%", detail: "No improvement" },
      ]

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
        Impact Breakdown {isMbtOn ? '(MBT ON)' : '(MBT OFF)'}
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        GHG, Soil, Water, Health — by source and region
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "24px",
      }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            GHG Reduction by Category
          </h3>
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              display: "flex",
              height: "32px",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {ghgData.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: totalGHG > 0 ? `${(item.value / totalGHG) * 100}%` : '0%',
                    backgroundColor: item.color,
                  }}
                  title={`${item.name}: ${item.value} MtCO₂e`}
                />
              ))}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
              Total: {totalGHG} MtCO₂e / year
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {ghgData.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: item.color }} />
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                  {item.name}: {item.value} Mt
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
            Soil · Water · Health
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {indicators.map((indicator, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}>
                <div>
                  <div style={{ fontWeight: "bold", color: "#f1f5f9" }}>{indicator.title}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{indicator.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9" }}>
                    {indicator.value}
                  </div>
                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>{indicator.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}>
        {improvements.map((item, i) => (
          <div key={i} style={{
            ...cardStyle,
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "14px",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              {item.module}
            </div>
            <div style={{ fontSize: "24px", fontWeight: "bold", margin: "12px 0", color: "#f1f5f9" }}>
              {item.effect}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}