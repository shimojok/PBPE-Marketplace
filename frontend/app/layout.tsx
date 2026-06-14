// frontend/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'PBPE Marketplace Dashboard',
  description: 'Planetary Balance Sheet Engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
