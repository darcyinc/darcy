'use client';

import EditUserModal from '@/features/modals/edit-user';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  if (!currentUser.token || currentUser.handle !== params.handle) return router.back();

  return <EditUserModal open={open} onOpenChange={setOpen} />;
}
