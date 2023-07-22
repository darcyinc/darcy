const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
};

module.exports = withNextIntl(nextConfig);
