'use client';

import { apiClient } from '@/api/client';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { patchUserSchema } from '@/utils/api/schemas/user';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

interface PageProps {
  params: {
    handle: string;
  };
}

type EditUserDataState = z.infer<typeof patchUserSchema>;

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<EditUserDataState>({});

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  if (!currentUser.token || currentUser.handle !== params.handle) return router.back();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    apiClient
      .patch('/users/@me', {
        displayName: newData.displayName,
        handle: newData.handle,
        bio: newData.bio
      })
      .then((res) => {
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

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewData((prev) => ({ ...prev, [id]: value || undefined }));
  };

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
              minLength={1}
              maxLength={32}
              value={newData.displayName}
              onChange={handleEdit}
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
              value={newData.handle}
              onChange={handleEdit}
              className="mt-1 peer"
            />
            <p className="hidden peer-focus-within:peer-invalid:block text-sm text-red-500 mt-1">Nome de usuário inválido</p>
          </label>

          <label htmlFor="bio">
            <p className="font-bold">Biografia</p>
            <Textarea
              id="bio"
              placeholder={currentUser.bio}
              maxLength={120}
              minLength={0}
              value={newData.bio}
              onChange={handleEdit}
              className="mt-1 peer max-h-40"
            />
            <p className="hidden peer-focus-withinpeer-invalid:block text-sm text-red-500 mt-1">Biografia inválida</p>
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
