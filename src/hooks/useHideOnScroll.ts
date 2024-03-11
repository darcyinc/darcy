import { type RefObject, useEffect, useState } from 'react';

export default function useHideOnScroll(elementRef: RefObject<HTMLElement>, direction: 'up' | 'down') {
  const [lastScroll, setLastScroll] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const scrollHandler = () => {
      const currentScroll = window.scrollY;

      if (!elementRef.current) return;
      if (window.innerWidth > 640) return;

      if (direction === 'down') {
        if (currentScroll <= 60) {
          elementRef.current.style.transform = '';
          return;
        }

        if (currentScroll > lastScroll && !elementRef.current.style.transform) {
          elementRef.current.style.transform = 'translate3d(0, -100%, 0)';
        }
      } else {
        if (currentScroll > lastScroll && !elementRef.current.style.transform) {
          elementRef.current.style.transform = 'translate3d(0, 100%, 0)';
        }
      }

      if (currentScroll < lastScroll && elementRef.current.style.transform !== '') {
        elementRef.current.style.transform = '';
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [lastScroll]);
}
