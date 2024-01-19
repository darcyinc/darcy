'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditUserForm from '@/features/forms/edit-user';
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

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>

        <EditUserForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
