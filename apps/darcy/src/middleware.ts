/* eslint-disable import/no-unused-modules */
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en-US', 'pt-BR'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'pt-BR',

  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
