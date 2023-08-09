import Feed from '@/components/Feed';
import FeedFilter from '@/components/Feed/FeedFilter';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedPost from '@/components/Feed/FeedPost';
import FeedPostComposer from '@/components/Feed/FeedPostComposer';

export default function Home() {
  return (
    <>
      <Feed>
        <FeedHeader>
          <p className="p-4 text-xl font-bold">Página inicial</p>
          <FeedFilter currentFilter="foryou" />
        </FeedHeader>

        <FeedPostComposer />

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
        />
      </Feed>
    </>
  );
}
