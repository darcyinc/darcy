import FollowingModal from '@/components/Modal/FollowingModal';
import { PropsWithChildren } from 'react';

interface PageProps {
  params: {
    username: string;
  };
}

export default function Page({ params }: PropsWithChildren<PageProps>) {
  return <FollowingModal username={params.username} />;
}
