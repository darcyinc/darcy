'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { client } from '@/api/client';
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

  useEffect(() => {
    const auth = async () => {
      const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);
      if (!AUTH_SERVICES_CALLBACK.includes(service) || !code || !state) return router.replace('/auth');
      if (state !== oauth2State) return router.replace('/auth');

      client.auth
        .withService({
          code,
          service
        })
        .then(({ token }) => {
          sessionStorage.removeItem(`oauth2-state:${service}`);
          localStorage.setItem('token', token);

          client.users.get().then((data) => currentUser.setData({ ...data, token }));

          router.push('/');
        })
        .catch((error: Error) => {
          if (error.message) return router.replace(`/auth?error=${error.message}`);
        });
    };

    auth();
  }, [code, currentUser, router, service, state]);

  return <span className="m-auto text-xl">{t('authenticating')}</span>;
}
