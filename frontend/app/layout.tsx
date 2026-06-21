// frontend/app/layout.tsx
'use client'

import './globals.css'
import { useState, useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // URLパラメータから初期状態を読み取る
  const [mbtEnabled, setMbtEnabled] = useState(true)

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const mbtParam = params.get('mbt')
      if (mbtParam === 'on') setMbtEnabled(true)
      else if (mbtParam === 'off') setMbtEnabled(false)
    }
  }, [])

  const toggleMBT = () => {
    const newState = !mbtEnabled
    setMbtEnabled(newState)
    // URLを更新
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('mbt', newState ? 'on' : 'off')
      window.history.pushState({}, '', url.toString())
    }
  }

  const navItems = [
    { href: '/dashboard/kpis', label: 'Global KPIs' },
    { href: '/dashboard/impact', label: 'Impact Breakdown' },
    { href: '/dashboard/market', label: 'PBPE Credits Market' },
    { href: '/dashboard/finance', label: 'Bonds & Insurance' },
    { href: '/dashboard/enterprise', label: 'Scope 3 × PBPE' },
    { href: '/dashboard/pbpe', label: 'PBPE Issuance' },
    { href: '/dashboard/registry', label: 'PBPE Registry' },  // ← 追加
  ]

  return (
    <html lang="en" className="dark">
      <body style={{
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh',
      }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* サイドバー */}
          <aside style={{
            width: '260px',
            backgroundColor: '#020617',
            borderRight: '1px solid #334155',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '32px', color: '#f1f5f9' }}>
                🌍 PBPE Marketplace
              </div>
              <nav>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '10px 12px',
                      marginBottom: '4px',
                      borderRadius: '8px',
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e293b'
                      e.currentTarget.style.color = '#f1f5f9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#94a3b8'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* MBT55 Toggle */}
            <div style={{
              padding: '16px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
            }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                MBT55 Microbial System
              </div>
              <button
                onClick={toggleMBT}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: mbtEnabled ? '#22c55e' : '#475569',
                  color: 'white',
                  transition: 'all 0.2s',
                }}
              >
                {mbtEnabled ? '🟢 ON' : '⚫ OFF'}
              </button>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px', textAlign: 'center' }}>
                {mbtEnabled ? 'Climate-positive mode active' : 'Conventional farming baseline'}
              </div>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: '#0f172a' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}