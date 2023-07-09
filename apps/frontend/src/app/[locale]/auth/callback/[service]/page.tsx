'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { NEXT_PUBLIC_API_URL } = process.env;

export default function CallbackPage({
  params,
  searchParams,
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

      if (!['discord'].includes(service) || !code || !state) {
        router.replace('/auth/signin');
        return;
      }

      if (state !== oauth2State) {
        router.replace('/auth/signin');
        return;
      }

      const { data, status } = await axios.post<{
        token: string;
        error?: string;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      }>(`${NEXT_PUBLIC_API_URL!}/auth/${service}/callback?code=${code}`, {
        method: 'POST',
        credentials: 'include',
        responseType: 'json',
        validateStatus: () => true,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      });

      if (status !== 200) {
        if (data.error == 'no_email_associated') {
          setError('Você ainda não possui um e-mail cadastrado no serviço.');
          return;
        } else router.replace('/auth/signin');
      }

      sessionStorage.removeItem(`oauth2-state:${service}`);
      sessionStorage.setItem('token', data.token);

      router.push('/');
    }

    auth();
  }, [code, router, service, state]);

  return error ? (
    <p id="auth">
      {error}
      <Link href="/auth/signin">Voltar</Link>
    </p>
  ) : (
    <p id="auth">Autenticando...</p>
  );
}
