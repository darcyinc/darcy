import { PropsWithChildren } from 'react';

import AsideNavbar from '@/components/Navbar/AsideNavbar';
import Trending from '@/components/Trending';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AsideNavbar />

      <main className="w-full max-w-[600px]">{children}</main>

      <Trending />
    </>
  );
}
