'use client';

import { apiClient } from '@/api/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export default function ValidAuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const token = localStorage.getItem('token');

    // If the user has a saved token, try to GET /api/users/@me to check if it's valid
    // If it is invalid, redirect to /auth
    if (token && !pathname.includes('/auth')) {
      apiClient.get('/users/@me').then((response) => {
        if (response.status !== 200) {
          localStorage.removeItem('token');
          currentUser.setData({ token: null });
          router.push('/auth');
          return;
        }

        currentUser.setData({ ...response.data, token });
      });
    }
  }, []);

  return children;
}