import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/locales/i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
};

export default withNextIntl(nextConfig);
