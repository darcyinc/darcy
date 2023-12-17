import Feed from '@/components/Feed';
import FeedFilter from '@/components/Feed/FeedFilter';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedPost from '@/components/Feed/FeedPost';
import FeedPostComposer from '@/components/Feed/FeedPostComposer';
import FeedPostLoader from '@/components/Feed/FeedPostLoader';
import MobileNavbarProfile from '@/components/Navbar/NavbarProfile/MobileNavbarProfile';

export default function Home() {
  return (
    <Feed>
      <FeedHeader>
        <MobileNavbarProfile />
        <FeedFilter />
      </FeedHeader>

      <FeedPostComposer />

      {Array.from({ length: 10 }).map((_) => (
        <FeedPost
          hasLiked
          hasReposted
          avatar="https://picsum.photos/44/44.webp"
          comments={0}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          createdAt={Date.now()}
          handle="davipatricio"
          likes={0}
          postId="unknown"
          reposts={0}
          username="Davi Patricio"
          views={100}
          key={Math.random().toString(36).substring(7)}
        />
      ))}

      {/* TODO */}
      <FeedPostLoader onVisible={undefined} />
    </Feed>
  );
}
