import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

export default async function IntlProvider({ children }: PropsWithChildren) {
  const locale = useLocale();

  let messages = {} as Record<string, string>;
  messages = (
    (await import(`../../locales/${locale}.json`)) as {
      default: Record<string, string>;
    }
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
