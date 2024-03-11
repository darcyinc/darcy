import Feed from '@/components/feed';
import AsideNavbar from '@/components/navbar/aside-navbar';
import Trending from '@/components/trending';
import type { PropsWithChildren } from 'react';

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
