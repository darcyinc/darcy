'use client';

import useCreateAuth from '@/api/mutations/useAuth';
import useUser from '@/api/queries/useUser';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AUTH_SERVICES_CALLBACK } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const mutation = useCreateAuth();
  const user = useUser('@me');

  const { service } = params;
  const { code, state } = searchParams;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    mutation.mutate({ service, code });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const auth = async () => {
      // If the mutation did not run yet, do a few checks
      if (mutation.isIdle) {
        const oauth2State = sessionStorage.getItem(`oauth2-state:${service}`);
        if (!AUTH_SERVICES_CALLBACK.includes(service) || !code || !state) return router.replace('/auth');
        if (state !== oauth2State) router.replace('/auth');
      }

      if (mutation.isError) {
        currentUser.reset();
        router.replace(`/auth?error=${mutation.error.message}`);
      }

      if (mutation.isSuccess) {
        localStorage.setItem('darcy-token', mutation.data.token)
        sessionStorage.removeItem(`oauth2-state:${service}`);

        const { data } = await user.refetch();

        currentUser.setData({ ...data });
        router.push('/');
      }
    };

    auth();
  }, [mutation.isSuccess, mutation.isError, mutation.isIdle]);

  return (
    <span className="m-auto text-xl">
      {(mutation.isSuccess || mutation.isPending) && t('authenticating')}
      {mutation.isError && t('authenticatingError')}
    </span>
  );
}
