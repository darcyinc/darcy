import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { DESCRIPTION } from '@/utils/constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s / Darcy',
    default: 'Página Inicial / Darcy'
  },
  keywords: ['darcy', 'social network', 'darcy social network'],
  description: DESCRIPTION
};

interface LayoutProps {
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: PropsWithChildren<LayoutProps>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn(inter.className, 'overflow-y-scroll')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
