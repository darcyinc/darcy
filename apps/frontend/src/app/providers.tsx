'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@/hooks/useTheme';
import { darkTheme } from '@/styles/themes/dark';

const GlobalStyles = dynamic(() => import('@/styles/GlobalStyles'));
const StyledComponentsRegistry = dynamic(() => import('@/lib/registry'));

async function getTheme(theme: 'dark' | 'light' | 'slate') {
  const themes = {
    dark: darkTheme,
    light: await import('@/styles/themes/light').then((mod) => mod.lightTheme),
    slate: await import('@/styles/themes/slate').then((mod) => mod.slateTheme),
  };

  return themes[theme];
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(darkTheme);
  const { theme: userTheme } = useTheme();

  useEffect(() => {
    async function loadTheme() {
      setTheme(await getTheme(userTheme || 'dark'));
    }

    loadTheme().catch(() => {});
  }, [userTheme]);

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
