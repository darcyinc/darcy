import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { DESCRIPTION } from '@/utils/constants';

import Providers from './providers';
import Template from './template';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
      <body className={inter.className}>
        <Template>
          <Providers>{children}</Providers>
        </Template>
      </body>
    </html>
  );
}
