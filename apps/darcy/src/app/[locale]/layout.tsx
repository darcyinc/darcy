import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

interface RootLayoutParams {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'pt-BR' }, { locale: 'en-US' }];
}

export default async function RootLayout({ children, params }: PropsWithChildren<RootLayoutParams>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  // allow to use translations in client components.
  let messages: Record<string, string> = {};
  try {
    messages = ((await import(`../../locales/${locale}.json`)) as { default: Record<string, string> }).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
