import { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

// eslint-disable-next-line import/no-unused-modules
export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../locales/${locale}.json`)) as { default: AbstractIntlMessages };
  return { messages };
});
