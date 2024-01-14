'use client';

import { PropsWithChildren, useEffect } from 'react';

import { apiClient } from '@/api/client';
import { useTheme } from '@/hooks/theme';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Template({ children }: PropsWithChildren) {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { theme } = useTheme();

  if (typeof window !== 'undefined') document.documentElement.dataset.theme = theme;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const token = localStorage.getItem('token');

    // If the user has a saved token, try to GET /api/users/@me to check if it's valid
    // If it is invalid, redirect to /auth
    if (token && !window.location.pathname.includes('/auth')) {
      apiClient.get('/users/@me').then((response) => {
        if (response.status !== 200) {
          localStorage.removeItem('token');
          currentUser.setData({ token: null });
          router.push('/auth');
        }

        currentUser.setData({ ...response.data, token });
      });
    }
  }, []);

  return children;
}
