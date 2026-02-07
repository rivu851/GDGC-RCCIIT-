/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.aceternity.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
  // allow production build to succeed even when TypeScript or ESLint report errors
  typescript: {
    // Warning: setting this to true may hide real type errors in production builds.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Next.js 11+ option to skip ESLint checks during builds
    ignoreDuringBuilds: true,
  },
  // other config options
};

module.exports = nextConfig;
