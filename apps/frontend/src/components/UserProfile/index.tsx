import { client } from '@/api/base';

import UserProfileHeader from './UserProfileHeader';

export default async function UserProfile({ handle }: { handle: string }) {
  const data = await client.users.get(handle);

  return (
    <section className="max-w-[600px] pb-14 sm:border-r sm:border-grayBorder sm:p-0">
      <UserProfileHeader
        isPrivate
        avatar="https://via.placeholder.com/150"
        banner="https://via.placeholder.com/150"
        bio={data.id}
        handle={data.handle}
        posts={0}
        username={data.displayName}
      />
    </section>
  );
}
