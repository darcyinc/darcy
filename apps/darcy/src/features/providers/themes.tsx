import { ThemeProvider } from '@/components/theme-provider';
import { PropsWithChildren } from 'react';

export default function NextThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
