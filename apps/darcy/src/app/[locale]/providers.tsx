import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

// This provider allows the `useTranslation` hook in Client Components.
export default async function Providers({ children }: PropsWithChildren) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();

  let messages = {} as Record<string, string>;
  messages = ((await import(`../../locales/${locale}.json`)) as { default: Record<string, string> }).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
