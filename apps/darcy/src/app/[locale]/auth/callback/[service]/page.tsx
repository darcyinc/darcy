'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { client } from '@/api/client';
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
  const t = useTranslations('AuthCallback');

  const { service } = params;
  const { code, state } = searchParams;

  const router = useRouter();
  const [error, setError] = useState('');

  if (error) {
    return (
      <span className="m-auto text-center text-xl">
        <p>{error}</p>
        <Link href="/auth/signin">{t('goBack')}</Link>
      </span>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const auth = async () => {
      const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);

      if (!AUTH_SERVICES_CALLBACK.includes(service) || !code || !state) return router.replace('/auth');

      if (state !== oauth2State) return router.replace('/auth/signin');

      const { error, redirect, token } = await client.auth.withService({
        code,
        service
      });

      if (redirect) return router.replace('/auth/signin');
      if (error) return setError(error);

      if (token) {
        sessionStorage.removeItem(`oauth2-state:${service}`);
        sessionStorage.setItem('token', token);

        router.push('/');
      }
    };

    auth();
  }, [code, router, service, state]);

  return <span className="m-auto text-xl">{t('authenticating')}</span>;
}
