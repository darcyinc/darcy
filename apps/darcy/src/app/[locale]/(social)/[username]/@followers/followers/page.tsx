import FollowersModal from '@/components/Modal/FollowersModal';
import { PropsWithChildren } from 'react';

interface PageProps {
  params: {
    username: string;
  };
}

export default function Page({ params }: PropsWithChildren<PageProps>) {
  return <FollowersModal username={params.username} />;
}
