// frontend/app/layout.tsx
'use client'

import './globals.css'
import { useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mbtEnabled, setMbtEnabled] = useState(true)  // MBT55 ON/OFF状態

  const navItems = [
    { href: '/dashboard/kpis', label: 'Global KPIs' },
    { href: '/dashboard/impact', label: 'Impact Breakdown' },
    { href: '/dashboard/market', label: 'PBPE Credits Market' },
    { href: '/dashboard/finance', label: 'Bonds & Insurance' },
    { href: '/dashboard/enterprise', label: 'Scope 3 × PBPE' },
    { href: '/dashboard/pbpe', label: 'PBPE Issuance' },
  ]

  const toggleMBT = () => {
    setMbtEnabled(!mbtEnabled)
    // TODO: 状態をグローバルまたはLocalStorageに保存
  }

  return (
    <html lang="en" className="dark">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <aside style={{
            width: '260px',
            background: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '32px' }}>
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
                      color: hoveredItem === item.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      backgroundColor: hoveredItem === item.href ? 'var(--bg-secondary)' : 'transparent',
                    }}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* MBT55 Toggle Control */}
            <div style={{
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              marginTop: '32px',
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
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
                  background: mbtEnabled ? 'var(--accent-green)' : '#475569',
                  color: 'white',
                  transition: 'all 0.2s',
                }}
              >
                {mbtEnabled ? '🟢 ON' : '⚫ OFF'}
              </button>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>
                {mbtEnabled 
                  ? 'Climate-positive mode active' 
                  : 'Conventional farming baseline'}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
