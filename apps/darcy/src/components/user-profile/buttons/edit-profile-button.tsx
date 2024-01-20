'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';

interface UserEditButtonProps {
  handle: string;
}

export default function UserEditButton({ handle }: UserEditButtonProps) {
  const currentUser = useCurrentUser();
  if (currentUser.handle !== handle) return null;

  return (
    <Button variant="secondary" className="rounded-full font-bold" size="md" asChild>
      <Link href={`/${currentUser.handle}/edit`} scroll={false}>
        Editar perfil
      </Link>
    </Button>
  );
}
