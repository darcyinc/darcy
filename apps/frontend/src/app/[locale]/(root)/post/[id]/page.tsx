import FeedPost from '@/components/Feed/FeedPost';

export default function Post() {
  return (
    <div className="max-w-[600px] pb-14 sm:border-r sm:border-grayBorder sm:pb-0">
      <FeedPost
        stats={{
          comments: 1,
          likes: 32,
          reposts: 4,
          views: '100'
        }}
        user={{
          avatar: 'https://picsum.photos/200',
          username: 'John Doe',
          handle: 'johndoe'
        }}
        content="Hey"
      />
    </div>
  );
}
