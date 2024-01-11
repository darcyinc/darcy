import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import FollowersModal from '@/components/Modal/FollowersModal';
import FollowingModal from '@/components/Modal/FollowingModal';

interface LayoutProps {
  params: {
    username: string;
    modal?: string[];
  };
}

const supportedModals = new Set(['followers', 'following']);

export default function RootLayout({ children, params }: PropsWithChildren<LayoutProps>) {
  const modal = params.modal;
  if (!modal) return children;

  const firstModal = modal[0];

  if (modal.length > 1 || !supportedModals.has(firstModal)) notFound();

  return (
    <>
      {children}
      {firstModal === 'followers' && <FollowersModal username={params.username} />}
      {firstModal === 'following' && <FollowingModal username={params.username} />}
    </>
  );
}
