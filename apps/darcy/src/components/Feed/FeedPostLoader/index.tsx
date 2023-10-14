'use client';

import { useEffect, useRef } from 'react';

interface FeedPostLoaderProps {
  onVisible: undefined | (() => void);
}

export default function FeedPostLoader({ onVisible }: FeedPostLoaderProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        onVisible?.();
      }
    });

    intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [onVisible]);

  return (
    <p className="my-2 text-center" ref={ref}>
      Carregando publicações...
    </p>
  );
}
