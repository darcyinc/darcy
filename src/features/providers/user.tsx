'use client';

import useRefreshSession from '@/api/mutations/use-refresh-session';
import useUser from '@/api/queries/use-user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useEffect } from 'react';

export default function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setCurrentUser } = useCurrentUser();
  const mutation = useRefreshSession();
  const user = useUser();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (user.error?.message === 'unauthorized') {
      const accessToken = localStorage.getItem('_DO_NOT_SHARE_access-token');
      const refreshToken = localStorage.getItem('_DO_NOT_SHARE_refresh-token');

      if (accessToken && refreshToken) {
        mutation.trigger(
          {
            accessToken,
            refreshToken
          },
          {
            onSuccess: (data) => {
              localStorage.setItem('_DO_NOT_SHARE_access-token', data.access_token);
              localStorage.setItem('_DO_NOT_SHARE_refresh-token', data.refresh_token);

              user.mutate();
            }
          }
        );

        return;
      }
    }

    if (user.data) setCurrentUser({ ...user.data, _ready: true });
    else {
      setCurrentUser({
        avatar_url: '',
        created_at: '',
        full_name: '',
        updated_at: '',
        username: '',
        _ready: true
      });
    }
  }, [user.data, user.error]);

  return <>{children}</>;
}
