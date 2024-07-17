import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const supportedLocales = ['en', 'pt'];

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale as string)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
