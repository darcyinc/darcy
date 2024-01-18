'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';

export default function UserEditButton({ handle }: { handle: string }) {
  const currentUser = useCurrentUser();
  if (currentUser.handle !== handle) return null;

  return (
    <Button variant="secondary" className="rounded-full font-bold" size="md" asChild>
      <Link href={`/${currentUser.handle}/edit`}>Editar perfil</Link>
    </Button>
  );
}
