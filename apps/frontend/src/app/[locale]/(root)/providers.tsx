'use client';

import dynamic from 'next/dynamic';

import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';

const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

const MainWrapper = dynamic(() =>
  import('./styles').then((mod) => mod.MainWrapper)
);

// We can't import RSC in Client Components
interface ProvidersProps {
  children: React.ReactNode;
  trendingComponent: React.ReactNode;
  leftNavbarComponent: React.ReactNode;
}

export default function Providers({
  children,
  trendingComponent,
  leftNavbarComponent,
}: ProvidersProps) {
  return (
    <>
      <ShowIfMediaQuery query="(min-width: 500px) and (min-height: 475px)">
        {leftNavbarComponent}
      </ShowIfMediaQuery>

      <MainWrapper>{children}</MainWrapper>

      <ShowIfMediaQuery query="(max-width: 500px), (max-height: 475px)">
        <MobileBottomNavbar />
      </ShowIfMediaQuery>

      <ShowIfMediaQuery query="(min-width: 990px)">
        {trendingComponent}
      </ShowIfMediaQuery>
    </>
  );
}
