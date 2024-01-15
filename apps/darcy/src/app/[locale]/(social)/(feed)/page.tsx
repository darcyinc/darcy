import { FeedFilter, FeedHeader, FeedPostComposer } from '@/components/Feed';
import TimelinePostFetcher from '@/components/Feed/FeedPostFetcher/TimelinePostFetcher';
import MobileNavbarProfile from '@/components/Navbar/NavbarProfile/MobileNavbarProfile';

export default function Home() {
  return (
    <>
      <FeedHeader>
        <MobileNavbarProfile />
        <FeedFilter />
      </FeedHeader>

      <FeedPostComposer />

      <TimelinePostFetcher />
    </>
  );
}
