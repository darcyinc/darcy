'use client';

import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/themes/dark';
import { lightTheme } from '@/styles/themes/light';
import { slateTheme } from '@/styles/themes/slate';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = darkTheme || lightTheme || slateTheme;

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
