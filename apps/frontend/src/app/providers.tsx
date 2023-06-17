'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import LeftNavbar from '@/components/LeftNavbar';
import MobileBottomNavbar from '@/components/LeftNavbar/MobileBottomNavbar';
import { useTheme } from '@/hooks/useTheme';
import { darkTheme } from '@/styles/themes/dark';

const GlobalStyles = dynamic(() => import('@/styles/GlobalStyles'));
const StyledComponentsRegistry = dynamic(() => import('@/lib/registry'));
const ShowIfMediaQuery = dynamic(() => import('@/components/ShowIfMediaQuery'));

const MainWrapper = dynamic(() =>
  import('./styles').then((mod) => mod.MainWrapper)
);

async function getTheme(theme: 'dark' | 'light' | 'slate') {
  const themes = {
    dark: darkTheme,
    light: await import('@/styles/themes/light').then((mod) => mod.lightTheme),
    slate: await import('@/styles/themes/slate').then((mod) => mod.slateTheme),
  };

  return themes[theme];
}

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

  useEffect(() => {
    async function loadTheme() {
      setTheme(await getTheme(userTheme || 'dark'));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loadTheme().catch(() => {});
  }, [userTheme]);

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
