// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/kpis',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
