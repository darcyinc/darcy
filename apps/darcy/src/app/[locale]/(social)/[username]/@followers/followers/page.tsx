import FollowersModal from '@/components/Modal/FollowersModal';

interface PageProps {
  params: {
    username: string;
  };
}

export default function Page({ params }: PageProps) {
  return <FollowersModal username={params.username} />;
}
