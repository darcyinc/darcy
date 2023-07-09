'use client';

import { useCallback, useEffect, useState } from 'react';

interface ShowIfMediaQueryProps {
  query: string;
  children: React.ReactNode;
}

export default function ShowIfMediaQuery({ query, children }: ShowIfMediaQueryProps) {
  const [matches, setMatches] = useState(false);

  const handleMediaQueryChange = useCallback(
    (mediaQuery: MediaQueryListEvent | MediaQueryList) => setMatches(mediaQuery.matches),
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [query, handleMediaQueryChange]);

  return matches ? children : undefined;
}
