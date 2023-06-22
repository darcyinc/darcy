import dynamic from 'next/dynamic';

import Trending from '@/components/Trending';

const Providers = dynamic(() => import('./providers'));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers trendingComponent={<Trending />}>{children}</Providers>;
}
