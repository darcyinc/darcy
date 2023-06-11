'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';
import ShowIfMediaQuery from '@/components/ShowIfMediaQuery';
import { useTheme } from '@/hooks/useTheme';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/themes/dark';
import { lightTheme } from '@/styles/themes/light';
import { slateTheme } from '@/styles/themes/slate';

const themes = {
  dark: darkTheme,
  light: lightTheme,
  slate: slateTheme,
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(darkTheme);
  const { theme: userTheme } = useTheme();

  useEffect(() => setTheme(themes[userTheme]), [userTheme]);

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}

        <ShowIfMediaQuery query="(max-width: 500px), (max-height: 475px)">
          <MobileBottomNavbar />
        </ShowIfMediaQuery>
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
