'use client';

import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import usePopularPosts from '@/hooks/api/usePopularPosts';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { toast } from 'sonner';
import FeedPostComposer from '../feed-post-composer';
import FeedPostLoader from '../feed-post-loader';
import FeedPost from '../post';
import SkeletonPost from '../post/skeleton-post';

export default function TimelinePostFetcher() {
  // TODO: don't use usePopularPosts for authenticated users
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading, fetchNextPage } = usePopularPosts();

  if (isLoading || isError) {
    if (isError) toast.error('Não foi possível carregar as publicações', { description: error.message, duration: 5000 });

    return (
      <>
        <FeedPostComposer />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </>
    );
  }

  const updatePostData = (postId: string, newData: Partial<GetUserPostsResponse>) => {
    if (!data) return;

    const newDataPages = data.pages.map((page) => {
      const index = page.findIndex((post) => post.id === postId);
      const post = page[index];
      if (!post) return page;

      return [...page.slice(0, index), { ...post, ...newData }, ...page.slice(index + 1)];
    });

    queryClient.setQueryData(['popularPosts'], (data: { pageParams: number }) => ({
      pages: newDataPages,
      pageParams: data.pageParams
    }));
  };

  return (
    <>
      <FeedPostComposer queryKeys={['popularPosts']} />

      {data?.pages?.map((pagePosts, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: pages will always be in order
        <Fragment key={i}>
          {pagePosts.map((post) => (
            <FeedPost
              hasLiked={post.hasLiked}
              hasReposted={false}
              avatar={post.author.avatarUrl}
              comments={post.commentCount}
              content={post.content}
              createdAt={post.createdAt}
              handle={post.author.handle}
              likes={post.likeCount}
              postId={post.id}
              username={post.author.displayName}
              reposts={0}
              views={0}
              key={post.id}
              updatePostData={updatePostData}
            />
          ))}
        </Fragment>
      ))}

      <FeedPostLoader onVisible={fetchNextPage} />
    </>
  );
}
