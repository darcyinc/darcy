'use client';

import { apiClient } from '@/api/client';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [handle, setUserHandle] = useState('');

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  useEffect(() => {
    setDisplayName(currentUser.displayName);
    setUserHandle(currentUser.handle);
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    apiClient.get('/users/@me').then((res) => {
      currentUser.setData(res.data);
      setOpen(false);
      setLoading(false);
    });
  };

  if (!currentUser.token || currentUser.handle !== params.handle) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <label htmlFor="displayName">
            <p className="font-bold">Nome</p>
            <Input
              type="text"
              id="displayName"
              placeholder={currentUser.displayName}
              minLength={2}
              maxLength={32}
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 peer"
            />
            <p className="hidden peer-invalid:block text-sm text-red-500 mt-1">Nome inválido</p>
          </label>

          <label htmlFor="handle">
            <p className="font-bold">Nome de usuário</p>
            <Input
              type="text"
              id="handle"
              placeholder={currentUser.handle}
              maxLength={16}
              minLength={2}
              required
              pattern="^[a-zA-Z0-9_]*$"
              value={handle}
              onChange={(e) => setUserHandle(e.target.value)}
              className="mt-1 peer"
            />
            <p className="hidden peer-invalid:block text-sm text-red-500 mt-1">Nome de usuário inválido</p>
          </label>

          <Button variant="secondary" className="font-bold rounded-full gap-2" type="submit">
            {loading && <LoadingSpinner />}
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
