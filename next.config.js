const withSentryConfig = process.env.NODE_ENV === 'production'
  ? require('@sentry/nextjs').withSentryConfig
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // No need for remotePatterns since we're using local images
  },
}

module.exports = process.env.NODE_ENV === 'production'
  ? withSentryConfig(nextConfig)
  : nextConfig; 