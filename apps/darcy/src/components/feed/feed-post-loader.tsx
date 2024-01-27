'use client';

import { useEffect, useRef } from 'react';

interface FeedPostLoaderProps {
  onVisible: () => void;
}

export default function FeedPostLoader({ onVisible }: FeedPostLoaderProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: prevent infinite loop
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) onVisible();
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return <p className="my-2 text-center h-1" ref={ref} />;
}
