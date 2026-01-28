/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Don't fail build on TypeScript errors during deployment
    // Errors will still be shown but won't block deployment
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't fail build on ESLint errors during deployment
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
