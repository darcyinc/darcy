'use client';

import { ThemeProvider } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/themes/dark';
import { lightTheme } from '@/styles/themes/light';
import { slateTheme } from '@/styles/themes/slate';
import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const theme = darkTheme || lightTheme || slateTheme;

  const handleMediaQueryChange = useCallback(
    (mediaQuery: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(mediaQuery.matches);
    },
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () =>
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [handleMediaQueryChange]);

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}

        {isMobile && <MobileBottomNavbar />}
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
