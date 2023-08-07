'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useTheme } from '@/hooks/theme';

const updateToken_stub = (token: string) => {
  return token;
};

export default function Providers({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    updateToken_stub(localStorage.getItem('token')!);

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') updateToken_stub(event.newValue!);
    });
  }, [theme]);

  return children;
}
