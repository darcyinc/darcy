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

export default function RootLayout({ children, params }: PropsWithChildren<LayoutProps>) {
  const modal = params.modal;

  if (!modal) return children;
  if (modal.length > 1) notFound();

  const firstModal = modal[0];

  const showFollowersModal = firstModal === 'followers';
  const showFollowingModal = firstModal === 'following';

  return (
    <>
      {children}
      {showFollowersModal && <FollowersModal username={params.username} />}
      {showFollowingModal && <FollowingModal username={params.username} />}
    </>
  );
}
