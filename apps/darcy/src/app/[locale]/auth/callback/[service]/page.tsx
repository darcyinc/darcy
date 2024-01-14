'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiClient } from '@/api/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AUTH_SERVICES_CALLBACK } from '@/utils/constants';

interface CallbackPageParams {
  service: string;
}

interface CallbackPageSearchParams {
  code: string;
  state: string;
}

interface CallbackPageProps {
  params: CallbackPageParams;
  searchParams: CallbackPageSearchParams;
}

export default function CallbackPage({ params, searchParams }: CallbackPageProps) {
  const t = useTranslations('Auth.AuthCallback');
  const currentUser = useCurrentUser();
  const router = useRouter();

  const { service } = params;
  const { code, state } = searchParams;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const auth = async () => {
      const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);
      if (!AUTH_SERVICES_CALLBACK.includes(service) || !code || !state) return router.replace('/auth');
      if (state !== oauth2State) return router.replace('/auth');

      const reqAuth = await apiClient.post(`/auth/${service}/callback`, { code });
      if (reqAuth.status !== 200) return router.replace(`/auth?error=${reqAuth.data.error}`);

      sessionStorage.removeItem(`oauth2-state:${service}`);
      localStorage.setItem('token', reqAuth.data.token);

      const reqUser = await apiClient.get('/users/@me');
      currentUser.setData({ ...reqUser.data, token: reqAuth.data.token });

      router.push('/');
    };

    auth();
  }, []);

  return <span className="m-auto text-xl">{t('authenticating')}</span>;
}
