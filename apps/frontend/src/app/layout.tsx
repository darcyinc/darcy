import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { DESCRIPTION } from '@/util/constants';

import '@/styles/tailwind.css';
import '@/styles/global.scss';

const Providers = dynamic(() => import('./providers'));

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Darcy',
  description: DESCRIPTION,
  keywords: ['social network', 'open source']
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
