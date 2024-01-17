'use client';

import { apiClient } from '@/api/client';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useState } from 'react';

export default function UserEditButton({ handle }: { handle: string }) {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const currentUser = useCurrentUser();

  const [_displayName, setDisplayName] = useState(currentUser.displayName);
  const [_userHandle, setUserHandle] = useState(currentUser.handle);

  if (currentUser.handle !== handle) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiClient.get('/users/@me').then((res) => {
      currentUser.setData(res.data);
    });

    setEditProfileModalOpen(false);
  };

  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };

  return (
    <div className="absolute -bottom-14 right-2.5 flex items-end justify-center sm:-bottom-14">
      {editProfileModalOpen && (
        <Modal onClose={() => setEditProfileModalOpen(false)} showSolidBackground>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <h1 className="text-xl font-bold">Editar perfil</h1>

            <label htmlFor="displayName">
              Nome
              <Input
                type="text"
                id="displayName"
                placeholder={currentUser.displayName}
                minLength={2}
                maxLength={32}
                required
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>

            <label htmlFor="handle">
              Nome de usuário
              <Input
                type="text"
                id="handle"
                placeholder={currentUser.displayName}
                maxLength={16}
                minLength={2}
                required
                pattern="^[a-zA-Z0-9_]*$"
                onChange={(e) => setUserHandle(e.target.value)}
              />
            </label>

            <Button variant="secondary" className="font-bold rounded-full" type="submit">
              Editar
            </Button>
          </form>
        </Modal>
      )}

      <Button variant="secondary" className="rounded-full font-bold" size="md" onClick={handleOpen}>
        Editar perfil
      </Button>
    </div>
  );
}
