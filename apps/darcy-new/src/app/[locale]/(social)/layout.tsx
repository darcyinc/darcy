import { PropsWithChildren } from 'react';

import AsideNavbar from '@/components/Navbar/AsideNavbar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AsideNavbar />
      {children}
    </>
  );
}
