'use client';

import dynamic from 'next/dynamic';

import LeftNavbar from '@/components/LeftNavbar';
import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';

const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

const MainWrapper = dynamic(() =>
  import('./styles').then((mod) => mod.MainWrapper)
);

interface ProvidersProps {
  children: React.ReactNode;
  trendingComponent: React.ReactNode;
}

export default function Providers({
  children,
  trendingComponent,
}: ProvidersProps) {
  return (
    <>
      <ShowIfMediaQuery query="(min-width: 500px) and (min-height: 475px)">
        <LeftNavbar />
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
