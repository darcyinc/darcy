import '@/styles/globals.css';

import { DESCRIPTION } from '@/utils/constants';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Darcy',
  description: DESCRIPTION
};

interface LayoutProps {
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: PropsWithChildren<LayoutProps>) {
  return (
    <html lang={params.locale}>
      <body className={clsx(inter.className, 'overflow-y-scroll')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
