'use client';

import useUser from '@/api/queries/useUser';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';

export default function ValidAuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const { data, error } = useUser('@me');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // If the user has a saved token, try to GET /api/users/@me to check if it's valid
    // If it is invalid, redirect to /auth
    if (!pathname.includes('/auth')) {
      if (data) {
        currentUser.setData({ ...data });

        if (!data.completedOnboarding && !pathname.includes('onboarding')) {
          router.replace('/onboarding');
        }
      }
    }
  }, [data, error]);

  return children;
}
