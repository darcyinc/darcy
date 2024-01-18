import FollowersModal from '@/components/modal/FollowersModal';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function Page({ params }: PageProps) {
  return <FollowersModal username={params.handle} />;
}
