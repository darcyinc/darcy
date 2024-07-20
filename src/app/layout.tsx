import UserProvider from '@/features/providers/user';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/tailwind.css';

const inter = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Darcy',
  description: 'Darcy is a open-source social network.'
};

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale ?? 'en'} suppressHydrationWarning>
      <body className="antialiased" style={{ ...inter.style }}>
        <ThemeProvider attribute="data-theme">
          <UserProvider>
            <Toaster richColors />
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
