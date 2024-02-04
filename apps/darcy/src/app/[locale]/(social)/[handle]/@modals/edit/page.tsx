'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditUserForm from '@/features/forms/edit-user';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Modals.EditUser');

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
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <EditUserForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
