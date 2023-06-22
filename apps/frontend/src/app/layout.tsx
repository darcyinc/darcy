import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

const Providers = dynamic(() => import('./providers'));

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Your Feed | Darcy',
  description:
    'Darcy is an open source social network where you can share your thoughts and opinions with other people.',
  keywords: ['social network', 'open source'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
