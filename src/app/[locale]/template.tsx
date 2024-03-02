import AnalyticsProvider from '@/features/providers/analytics';
import IntlProvider from '@/features/providers/intl';
import ReactQueryProvider from '@/features/providers/react-query';
import NextThemeProvider from '@/features/providers/themes';
import ToasterProvider from '@/features/providers/toaster';
import ValidAuthProvider from '@/features/providers/valid-auth';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <IntlProvider>
      <ReactQueryProvider>
        <ValidAuthProvider>
          <NextThemeProvider>
            <ToasterProvider />
            <AnalyticsProvider />
            {children}
          </NextThemeProvider>
        </ValidAuthProvider>
      </ReactQueryProvider>
    </IntlProvider>
  );
}
