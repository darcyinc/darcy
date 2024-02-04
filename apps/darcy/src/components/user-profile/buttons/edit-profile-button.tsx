'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface UserEditButtonProps {
  handle: string;
}

export default function UserEditButton({ handle }: UserEditButtonProps) {
  const currentUser = useCurrentUser();
  const t = useTranslations('UserProfile.Buttons');

  if (currentUser.handle !== handle) return null;

  return (
    <Button variant="secondary" className="rounded-full font-bold" size="md" asChild>
      <Link href={`/${currentUser.handle}/edit`} scroll={false}>
        {t('editProfile')}
      </Link>
    </Button>
  );
}
