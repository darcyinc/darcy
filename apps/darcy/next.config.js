const withNextIntl = require("next-intl/plugin")("./src/utils/i18n.ts");

module.exports = withNextIntl({
  reactStrictMode: false
});
