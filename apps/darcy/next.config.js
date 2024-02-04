const withNextIntl = require("next-intl/plugin")("./src/utils/i18n.ts");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withNextIntl(
  withBundleAnalyzer({
    reactStrictMode: false
  })
);
