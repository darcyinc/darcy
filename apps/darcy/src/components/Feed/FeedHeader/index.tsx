'use client';

import clsx from 'clsx';
import { ComponentProps, useEffect, useRef, useState } from 'react';

export default function FeedHeader({ children, ...props }: ComponentProps<'div'>) {
  const header = useRef<HTMLDivElement>(null);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      if (!header.current) return;

      // if user is on a large screen, don't do anything
      if (window.innerWidth > 640) return;

      const currentScroll = window.scrollY;

      if (currentScroll <= 60) {
        header.current.style.transform = '';
        return;
      }

      if (currentScroll > lastScroll && !header.current.style.transform) {
        header.current.style.transform = 'translate3d(0, -100%, 0)';
      }

      if (currentScroll < lastScroll && header.current.style.transform !== '') {
        header.current.style.transform = '';
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
      className={clsx(
        'sticky top-0 w-full border-b border-b-grayBorder bg-white/60 dark:bg-black/60 backdrop-blur-md z-10 transition-all duration-300',
        props.className
      )}
      ref={header}
    >
      {children}
    </div>
  );
}
