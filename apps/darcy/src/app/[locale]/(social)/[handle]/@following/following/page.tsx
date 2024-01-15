import FollowingModal from '@/components/Modal/FollowingModal';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function Page({ params }: PageProps) {
  return <FollowingModal username={params.handle} />;
}
