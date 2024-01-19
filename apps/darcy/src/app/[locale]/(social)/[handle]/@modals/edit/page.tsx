'use client';

import { apiClient } from '@/api/client';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  const [bio, setUserBio] = useState('');

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    apiClient.patch('/users/@me', { displayName, handle, bio }).then((res) => {
      setOpen(false);
      setLoading(false);

      if (res.status !== 200) {
        toast('Ocorreu um erro ao editar o perfil', {
          description: res.data.error
        });
        return;
      }

      currentUser.setData(res.data);
      toast('Perfil editado com sucesso!');
    });
  };

  if (!currentUser.token || currentUser.handle !== params.handle) return router.back();

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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 peer"
            />
            <p className="hidden peer-focus-within:peer-invalid:block text-sm text-red-500 mt-1">Nome inválido</p>
          </label>

          <label htmlFor="handle">
            <p className="font-bold">Nome de usuário</p>
            <Input
              type="text"
              id="handle"
              placeholder={currentUser.handle}
              maxLength={16}
              minLength={2}
              pattern="^[a-zA-Z0-9_]*$"
              value={handle}
              onChange={(e) => setUserHandle(e.target.value)}
              className="mt-1 peer"
            />
            <p className="hidden peer-focus-within:peer-invalid:block text-sm text-red-500 mt-1">Nome de usuário inválido</p>
          </label>

          <label htmlFor="bio">
            <p className="font-bold">Biografia</p>
            <Textarea
              id="handle"
              placeholder={currentUser.bio}
              maxLength={120}
              minLength={0}
              value={bio}
              onChange={(e) => setUserBio(e.target.value)}
              className="mt-1 peer max-h-40"
            />
            <p className="hidden  peer-focus-withinpeer-invalid:block text-sm text-red-500 mt-1">Biografia inválida</p>
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
