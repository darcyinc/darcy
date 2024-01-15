'use client';

import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import Feed, { FeedHeader, FeedPost, FeedPostComposer, FeedPostLoader } from '@/components/Feed';
import UserProfile from '@/components/UserProfile';
import useUser from '@/hooks/api/useUser';
import useUserPosts from '@/hooks/api/useUserPosts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';

interface HomeProps {
  params: {
    handle: string;
  };
}

export default function Home({ params }: HomeProps) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetUserPostsResponse[]>([]);

  const currentUser = useCurrentUser();
  const { data: userData, error, loading } = useUser(params.handle);
  const { data: userPosts, error: errorUserPosts, loading: loadingUserPosts } = useUserPosts(params.handle, { page });

  useEffect(() => {
    if (errorUserPosts || loadingUserPosts) return;
    if (userPosts.length === 0) return setHasMore(false);
    setPosts((prev) => [...prev, ...userPosts]);
  }, [userPosts, errorUserPosts, loadingUserPosts]);

  const handleLoadMore = useCallback(async () => {
    if (errorUserPosts || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [errorUserPosts, hasMore]);

  if (loading || error || errorUserPosts) {
    return (
      <Feed>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>

        {error && <p className="text-center mt-2 text-xl">User not found.</p>}
      </Feed>
    );
  }

  return (
    <Feed>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold text-textPrimary">{userData.displayName}</h1>
          <p className="text-sm text-textSecondary">{userData.postCount} posts</p>
        </div>
      </FeedHeader>

      <UserProfile {...userData} bannerUrl="https://picsum.photos/800/200" />

      {currentUser.handle === userData.handle && <FeedPostComposer showProfilePicture={false} />}

      {posts.map((post) => (
        <FeedPost
          hasLiked={false}
          hasReposted={false}
          avatar={userData.avatarUrl}
          comments={post.commentCount}
          content={post.content}
          createdAt={new Date(post.createdAt).getTime()}
          handle={userData.handle}
          likes={post.likeCount}
          postId={post.id}
          username={userData.displayName}
          reposts={0}
          views={0}
          key={post.id}
        />
      ))}

      <FeedPostLoader onVisible={handleLoadMore} />
    </Feed>
  );
}
