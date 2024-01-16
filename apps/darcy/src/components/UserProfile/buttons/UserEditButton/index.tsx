'use client';

import { apiClient } from '@/api/client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useState } from 'react';

export default function UserEditButton({ handle }: { handle: string }) {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const currentUser = useCurrentUser();

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [userHandle, setUserHandle] = useState(currentUser.handle);

  if (currentUser.handle !== handle) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiClient.get('/users/@me').then((res) => {
      currentUser.setData(res.data);
    });

    setEditProfileModalOpen(false);
  };

  return (
    <div className="absolute -bottom-14 right-2.5 flex items-end justify-center sm:-bottom-14">
      {editProfileModalOpen && (
        <Modal onClose={() => setEditProfileModalOpen(false)} showSolidBackground>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <h1 className="text-xl font-bold">Editar perfil</h1>

            <p>Nome</p>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

            <p>Nome de usuário</p>
            <input type="text" value={userHandle} onChange={(e) => setUserHandle(e.target.value)} />

            <button type="submit">Editar</button>
          </form>
        </Modal>
      )}

      <Button color="white" size="sm" onClick={() => setEditProfileModalOpen(true)}>
        <p>Editar perfil</p>
      </Button>
    </div>
  );
}
