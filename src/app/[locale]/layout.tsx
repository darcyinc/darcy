import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { DESCRIPTION } from '@/utils/constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s / Darcy',
    default: 'Página Inicial / Darcy'
  },
  keywords: ['darcy', 'social network', 'darcy social network'],
  description: DESCRIPTION,
  verification: {
    google: '2xJbRdcKuFm-bPMz7eIVWdHgC7ixwnpeBPlc1nqUTQE'
  }
};

interface LayoutProps {
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: PropsWithChildren<LayoutProps>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn(inter.className, 'overflow-y-scroll antialiased scroll-smooth')}>{children}</body>
    </html>
  );
}
