import LeftNavbar from '@/components/LeftNavbar';
import Trending from '@/components/Trending';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { MainWrapper } from './styles';

const inter = Inter({ subsets: ['latin'] });

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
        <Providers>
          <LeftNavbar />

          <MainWrapper>
            {children}
            <Trending />
          </MainWrapper>
        </Providers>
      </body>
    </html>
  );
}
