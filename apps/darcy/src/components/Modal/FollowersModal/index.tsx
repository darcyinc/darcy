'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal';

interface FollowersModalProps {
  username: string;
}

export default function FollowersModal({ username }: FollowersModalProps) {
  const router = useRouter();
  const onClose = () => router.replace(`/${username}`);

  return (
    <Modal showSolidBackground onClose={onClose}>
      Followers
      {username}
    </Modal>
  );
}
