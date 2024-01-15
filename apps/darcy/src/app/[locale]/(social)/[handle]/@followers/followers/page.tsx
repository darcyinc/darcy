import FollowersModal from '@/components/Modal/FollowersModal';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function Page({ params }: PageProps) {
  return <FollowersModal username={params.handle} />;
}
