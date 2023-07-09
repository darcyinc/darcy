'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);

    if (!['discord'].includes(service) || !code || !state) {
      router.replace('/auth/signin');
      return;
    }

    if (state !== oauth2State) {
      router.replace('/auth/signin');
      return;
    }

    fetch(
      `${process.env
        .NEXT_PUBLIC_API_URL!}/auth/${service}/callback?code=${code}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    )
      .then((r) => {
        if (!r.ok) {
          router.replace('/auth/signin');

          if (r.status === 400) {
            setError('Você ainda não possui um e-mail cadastrado no serviço.');
          }
        }

        return r.json();
      })
      .then((r) => {
        sessionStorage.removeItem(`oauth2-state:${service}`);
        sessionStorage.setItem('token', r.token);

        router.push('/');
      });
  }, []);

  return <p id="auth">Autenticando...</p>;
}
