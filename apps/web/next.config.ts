const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next/dist.types').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration
};

module.exports = createNextIntlPlugin()(nextConfig);