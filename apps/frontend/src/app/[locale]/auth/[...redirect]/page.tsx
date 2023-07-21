'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { COMMON_WORDS_SIGN_IN, COMMON_WORDS_SIGN_UP } from '@/util/constants';

interface RedirectRouteParams {
  redirect: string[];
}

export default function Page({ params }: { params: RedirectRouteParams }) {
  const router = useRouter();

  useEffect(() => {
    if (COMMON_WORDS_SIGN_IN.has(params.redirect[0])) {
      router.replace('/auth/signin');
    }

    if (COMMON_WORDS_SIGN_UP.has(params.redirect[0])) {
      router.replace('/auth/signup');
    }

    router.replace('/auth/signin');
  }, [params.redirect, router]);

  return (
    <p>
      Redirecting to authentication page. Click <Link href="/auth/signin">here</Link> if you are not redirected.
    </p>
  );
}
