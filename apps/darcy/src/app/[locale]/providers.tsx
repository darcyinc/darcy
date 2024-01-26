import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

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
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
