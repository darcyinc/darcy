import FeedPost from '@/components/Feed/FeedPost';

export default function Home() {
  return (
    <>
      <FeedPost
        avatar="https://picsum.photos/44/44.webp"
        comments={0}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        createdAt={Date.now()}
        handle="davipatricio"
        likes={0}
        reposts={0}
        username="Davi Patricio"
        views={100}
      />
    </>
  );
}
