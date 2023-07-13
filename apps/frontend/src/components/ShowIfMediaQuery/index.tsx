'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function ShowIfMediaQuery({ query, children }: PropsWithChildren<{ query: string }>) {
  const [matches, setMatches] = useState(false);

  const handleMediaQueryChange = useCallback((mediaQuery: MediaQueryListEvent | MediaQueryList) => setMatches(mediaQuery.matches), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [query, handleMediaQueryChange]);

  return matches ? children : undefined;
}
