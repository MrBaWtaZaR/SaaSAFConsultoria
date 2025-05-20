/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig 