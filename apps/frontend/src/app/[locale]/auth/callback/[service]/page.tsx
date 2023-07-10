'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { authWithService } from '@/api/users/authWithService';

export default function CallbackPage({
  params,
  searchParams
}: {
  params: { service: string };
  searchParams: { code: string; state: string };
}) {
  const [error, setError] = useState('');

  const router = useRouter();
  const { service } = params;
  const { code, state } = searchParams;

  useEffect(() => {
    async function auth() {
      const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);

      if (!['discord'].includes(service) || !code || !state) return router.replace('/auth/signin');

      if (state !== oauth2State) return router.replace('/auth/signin');

      const { error, redirect, token } = await authWithService({
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
    }

    auth();
  }, [code, router, service, state]);

  return error ? (
    <p className="m-auto text-xl">
      {error}
      <Link href="/auth/signin">Voltar</Link>
    </p>
  ) : (
    <p className="m-auto text-xl">Autenticando...</p>
  );
}
