'use client';

import useHideOnScroll from '@/hooks/useHideOnScroll';
import { useRef } from 'react';
import { MobileNavbarLinks } from './navbar-links';

export default function MobileNavbar() {
  const navbar = useRef<HTMLDivElement>(null);
  useHideOnScroll(navbar, 'up');

  return (
    <div
      className="sticky bottom-0 w-full border-t border-t-border bg-white/80 dark:bg-black/80 p-1 backdrop-blur-md sm:hidden transition-all"
      ref={navbar}
    >
      <nav className="flex items-center justify-evenly xl:items-start">
        <MobileNavbarLinks />
      </nav>
    </div>
  );
}
