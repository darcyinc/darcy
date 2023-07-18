import UserProfile from '@/components/UserProfile';

interface UserRouteParams {
  username: string;
}

export default function Home({ params }: { params: UserRouteParams }) {
  return <UserProfile handle={params.username} />;
}
