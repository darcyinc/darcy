/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: true,
    reactRemoveProperties: true,
  },
};

module.exports = nextConfig;
