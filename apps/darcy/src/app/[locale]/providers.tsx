import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren, useEffect, useState } from 'react';

// This provider allows the `useTranslation` hook in Client Components.
export default function Providers({ children }: PropsWithChildren) {
  const locale = useLocale();
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const getLocales = async () => {
      try {
        const data = ((await import(`../../locales/${locale}.json`)) as { default: Record<string, string> }).default;
        setMessages(data);
      } catch {
        notFound();
      }
    };

    getLocales();
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
