'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal';

interface FollowingModalProps {
  username: string;
}

export default function FollowingModal({ username }: FollowingModalProps) {
  const router = useRouter();

  const onClose = () => router.replace(`/${username}`);

  return (
    <Modal showSolidBackground onClose={onClose}>
      Following
      {username}
    </Modal>
  );
}
