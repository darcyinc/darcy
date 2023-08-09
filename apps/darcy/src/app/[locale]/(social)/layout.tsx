import { PropsWithChildren } from 'react';

import AsideNavbar from '@/components/Navbar/AsideNavbar';
import MobileNavbar from '@/components/Navbar/MobileNavbar';
import Trending from '@/components/Trending';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileNavbar />
      <AsideNavbar />

      <main>{children}</main>

      <Trending />
    </>
  );
}
