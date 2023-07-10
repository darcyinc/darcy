'use client';

import dynamic from 'next/dynamic';

import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';

const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

// We can't import RSC in Client Components
interface ProvidersProps {
  children: React.ReactNode;
  trendingComponent: React.ReactNode;
  leftNavbarComponent: React.ReactNode;
}

export default function Providers({ children, trendingComponent, leftNavbarComponent }: ProvidersProps) {
  return (
    <>
      <ShowIfMediaQuery query="(min-width: 500px) and (min-height: 475px)">{leftNavbarComponent}</ShowIfMediaQuery>

      <main className="grid grid-cols-[minmax(auto,600px)] gap-[2vw] md:grid-cols-[minmax(auto,600px)_1fr]">{children}</main>

      <ShowIfMediaQuery query="(max-width: 500px), (max-height: 475px)">
        <MobileBottomNavbar />
      </ShowIfMediaQuery>

      <ShowIfMediaQuery query="(min-width: 990px)">{trendingComponent}</ShowIfMediaQuery>
    </>
  );
}
