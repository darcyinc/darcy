'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Modal from '@/components/Modal';

interface HomeProps {
  params: {
    username: string;
  };
}

export default function Home({ params }: HomeProps) {
  const router = useRouter();

  const onClose = useCallback(() => {
    router.replace(`/${params.username}`);
  }, [router, params]);

  return (
    <Modal showSolidBackground onClose={onClose}>
      {params.username}
    </Modal>
  );
}
