'use client';

import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { darkTheme } from '@/styles/themes/dark';
import { lightTheme } from '@/styles/themes/light';
import { ThemeProvider } from 'styled-components';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
