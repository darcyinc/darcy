/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
