/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  env: {},
  images: {
    domains: [],
  },
}

module.exports = nextConfig