import createMiddleware from 'next-intl/middleware';
import { supportedLocales } from './lib/locales/i18n';

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale: 'en',
  localePrefix: 'never'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
