'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const COMMON_WORDS_SIGN_IN = new Set(['sign', 'sign_in', 'login', 'log_in']);
const COMMON_WORDS_SIGN_UP = new Set(['sign_up', 'register', 'create', 'join']);

interface PageProps {
  params: {
    redirect: string[];
  };
}

export default function Page({ params }: PageProps) {
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
