'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Modal from '@/components/Modal';

interface FollowingModalProps {
  username: string;
}

export default function FollowingModal({ username }: FollowingModalProps) {
  const router = useRouter();

  const onClose = useCallback(() => {
    router.replace(`/${username}`);
  }, [router, username]);

  return (
    <Modal showSolidBackground onClose={onClose}>
      Following
      {username}
    </Modal>
  );
}
