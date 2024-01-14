'use client';

import { PropsWithChildren, useEffect } from 'react';

import { apiClient } from '@/api/client';
import { useTheme } from '@/hooks/theme';

export default function Providers({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  if (typeof window !== 'undefined') document.documentElement.dataset.theme = theme;

  useEffect(() => {
    apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') {
        apiClient.defaults.headers.common.Authorization = `Bearer ${event.newValue}`;
      }
    });
  }, []);

  return children;
}
