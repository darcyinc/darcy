import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

// This provider allows the `useTranslation` hook in Client Components.
export default async function Providers({ children }: PropsWithChildren) {
  const locale = useLocale();

  let messages = {} as Record<string, string>;
  messages = (
    (await import(`../../locales/${locale}.json`)) as {
      default: Record<string, string>;
    }
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
