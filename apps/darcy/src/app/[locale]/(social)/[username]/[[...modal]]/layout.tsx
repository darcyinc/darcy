import { notFound } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  followers: React.ReactNode;
  following: React.ReactNode;
  params: {
    username: string;
    modal?: string[];
  };
}

export default function RootLayout({ children, followers, following, params }: LayoutProps) {
  const modal = params.modal;

  if (!modal) return children;
  if (modal.length > 1) return notFound();

  const firstModal = modal[0];

  const showFollowersModal = firstModal === 'followers';
  const showFollowingModal = firstModal === 'following';

  return (
    <>
      {children}
      {showFollowersModal && followers}
      {showFollowingModal && following}
    </>
  );
}
