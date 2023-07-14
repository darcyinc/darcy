'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { client } from '@/api/base';
import { AUTH_SERVICES_CALLBACK } from '@/util/constants';

interface i18nProps {
  goBack: string;
  authenticating: string;
}

interface UserAuthFeedbackProps {
  service: string;
  code: string;
  state: string;
  i18n: i18nProps;
}

export default function UserAuthFeedback({ service, code, state, i18n }: UserAuthFeedbackProps) {
  const router = useRouter();
  const [error, setError] = useState<string>();

  if (error) {
    return (
      <span className="m-auto text-center text-xl">
        <p>{error}</p>
        <Link href="/auth/signin">{i18n.goBack}</Link>
      </span>
    );
  }

  if (typeof window !== 'undefined') {
    const auth = async () => {
      const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);

      if (!AUTH_SERVICES_CALLBACK.includes(service) || !code || !state) return router.replace('/auth/signin');

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
  }

  return <span className="m-auto text-xl">{i18n.authenticating}</span>;
}
