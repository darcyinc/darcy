const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/lib/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  experimental: {
    serverActions: true
  },
};

module.exports = withNextIntl(nextConfig);
