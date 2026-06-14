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

  const navItems = [
    { href: '/dashboard/kpis', label: 'Global KPIs' },
    { href: '/dashboard/impact', label: 'Impact Breakdown' },
    { href: '/dashboard/market', label: 'PBPE Credits Market' },
    { href: '/dashboard/finance', label: 'Bonds & Insurance' },
    { href: '/dashboard/enterprise', label: 'Scope 3 × PBPE' },
    { href: '/dashboard/pbpe', label: 'PBPE Issuance' },
  ]

  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <aside style={{
            width: '260px',
            background: 'white',
            borderRight: '1px solid #e5e7eb',
            padding: '24px 16px',
          }}>
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
                    color: '#4b5563',
                    textDecoration: 'none',
                    fontSize: '14px',
                    backgroundColor: hoveredItem === item.href ? '#f3f4f6' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
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
