import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import LeftNavbar from '@/components/LeftNavbar';
import Trending from '@/components/Trending';
import { MainWrapper } from './styles';
import { Metadata } from 'next';

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
        <StyledComponentsRegistry>
          <GlobalStyles />

          <LeftNavbar />

          <MainWrapper>
            {children}
            <Trending />
          </MainWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
