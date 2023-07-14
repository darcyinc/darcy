import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { DESCRIPTION } from '@/util/constants';
import { useLocale } from 'next-intl';

import '@/styles/tailwind.css';
import '@/styles/global.scss';

interface LocaleRouteParams {
  locale: string;
}

const Providers = dynamic(() => import('./providers'));

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Your Feed | Darcy',
  description: DESCRIPTION,
  keywords: ['social network', 'open source']
};

export default function RootLayout({ children, params }: PropsWithChildren<{ params: LocaleRouteParams }>) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
