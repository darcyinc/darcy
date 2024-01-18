import { FeedFilter, FeedHeader } from '@/components/feed';
import { TimelinePostFetcher } from '@/components/feed/feed-fetcher';
import { MobileNavbarProfile } from '@/components/navbar/navbar-profile';

export default function Home() {
  return (
    <>
      <FeedHeader>
        <MobileNavbarProfile />
        <FeedFilter />
      </FeedHeader>

      <TimelinePostFetcher />
    </>
  );
}
