/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, unicorn/no-await-expression-member, @typescript-eslint/restrict-template-expressions */
import { getRequestConfig } from 'next-intl/server';

// eslint-disable-next-line import/no-unused-modules, @typescript-eslint/no-unsafe-call
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../locales/${locale}.json`)).default
}));
