'use client';

import { useEffect, useRef, useState } from 'react';
import { NavbarLinks } from './NavbarLinks';

export default function MobileNavbar() {
  const navbar = useRef<HTMLDivElement>(null);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      if (!navbar.current) return;

      // if user is on a large screen, don't do anything
      if (window.innerWidth > 640) return;

      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && !navbar.current.style.transform) {
        navbar.current.style.transform = 'translate3d(0, 100%, 0)';
      }

      if (currentScroll < lastScroll && navbar.current.style.transform !== '') {
        navbar.current.style.transform = '';
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [lastScroll]);

  return (
    <div
      className="sticky bottom-0 w-full border-t border-t-grayBorder bg-white/80 dark:bg-black/80 p-1 backdrop-blur-md sm:hidden transition-all"
      ref={navbar}
    >
      <nav className="flex items-center justify-evenly xl:items-start">
        <NavbarLinks.Mobile />
      </nav>
    </div>
  );
}
