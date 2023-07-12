import UserProfile from '@/components/UserProfile';

interface HomeProps {
  params: {
    username: string;
  };
}

export default function Home({ params }: HomeProps) {
  return <UserProfile handle={params.username} />;
}
