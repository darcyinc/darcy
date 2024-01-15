import Feed from '@/components/Feed';
import AsideNavbar from '@/components/Navbar/AsideNavbar';
import Trending from '@/components/Trending';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AsideNavbar />
      <main className="w-full max-w-[600px]">
        <Feed>{children}</Feed>
      </main>
      <Trending />
    </>
  );
}
