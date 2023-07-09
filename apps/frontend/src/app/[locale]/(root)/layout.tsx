import dynamic from 'next/dynamic';

import LeftNavbar from '@/components/LeftNavbar';
import Trending from '@/components/Trending';

const Providers = dynamic(() => import('./providers'));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers leftNavbarComponent={<LeftNavbar />} trendingComponent={<Trending />}>
      {children}
    </Providers>
  );
}
