import { notFound } from 'next/navigation';

import { client } from '@/api/base';

import UserProfileHeader from './UserProfileHeader';

export default async function UserProfile({ handle }: { handle: string }) {
  const data = await client.users.get(handle);

  if (data.error) {
    notFound();
  }

  return (
    <section className="max-w-[600px] pb-14 sm:border-r sm:border-grayBorder sm:p-0">
      <UserProfileHeader
        avatar="https://via.placeholder.com/150"
        banner="https://via.placeholder.com/150"
        bio={data.id}
        handle={data.handle}
        isPrivate={true}
        posts={0}
        username={data.displayName}
      />
    </section>
  );
}
