import FollowingModal from '@/components/Modal/FollowingModal';

interface PageProps {
  params: {
    username: string;
  };
}

export default function Page({ params }: PageProps) {
  return <FollowingModal username={params.username} />;
}
