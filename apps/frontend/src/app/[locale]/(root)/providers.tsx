import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import LeftNavbar from '@/components/LeftNavbar';
import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';
import Trending from '@/components/Trending';

const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ShowIfMediaQuery query="(min-width: 500px) and (min-height: 475px)">
        <LeftNavbar />
      </ShowIfMediaQuery>

      <main className="grid grid-cols-[minmax(auto,600px)] gap-[2vw] md:grid-cols-[minmax(auto,600px)_1fr]">{children}</main>

      <ShowIfMediaQuery query="(max-width: 500px), (max-height: 475px)">
        <MobileBottomNavbar />
      </ShowIfMediaQuery>

      <ShowIfMediaQuery query="(min-width: 990px)">
        <Trending />
      </ShowIfMediaQuery>
    </>
  );
}
