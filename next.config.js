const withSentryConfig = process.env.NODE_ENV === 'production'
  ? require('@sentry/nextjs').withSentryConfig
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ploomber.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ploomber.io',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = process.env.NODE_ENV === 'production'
  ? withSentryConfig(nextConfig)
  : nextConfig; 