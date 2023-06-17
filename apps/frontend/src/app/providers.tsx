'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';

import { useTheme } from '@/hooks/useTheme';
import { darkTheme } from '@/styles/themes/dark';
import { lightTheme } from '@/styles/themes/light';
import { slateTheme } from '@/styles/themes/slate';
import LeftNavbar from '@/components/LeftNavbar';
import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';

const GlobalStyles = dynamic(() => import('@/styles/GlobalStyles'));
const StyledComponentsRegistry = dynamic(() => import('@/lib/registry'));
const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

const MainWrapper = dynamic(() =>
  import('./styles').then((mod) => mod.MainWrapper)
);

const themes = {
  dark: darkTheme,
  light: lightTheme,
  slate: slateTheme,
};

interface ProvidersProps {
  children: React.ReactNode;
  trendingComponent: React.ReactNode;
}

export default function Providers({
  children,
  trendingComponent,
}: ProvidersProps) {
  const [theme, setTheme] = useState(darkTheme);
  const { theme: userTheme } = useTheme();

  useEffect(() => setTheme(themes[userTheme]), [userTheme]);

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />

        <ShowIfMediaQuery query="(min-width: 500px) and (min-height: 475px)">
          <LeftNavbar />
        </ShowIfMediaQuery>

        <MainWrapper>{children}</MainWrapper>

        <ShowIfMediaQuery query="(max-width: 500px), (max-height: 475px)">
          <MobileBottomNavbar />
        </ShowIfMediaQuery>

        <ShowIfMediaQuery query="(min-width: 990px)">
          {trendingComponent}
        </ShowIfMediaQuery>
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
