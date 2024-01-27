'use client';

import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import usePopularPostsReactQuery from '@/hooks/api/usePopularPosts';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import FeedPostComposer from '../feed-post-composer';
import FeedPostLoader from '../feed-post-loader';
import FeedPost from '../post';
import SkeletonPost from '../post/skeleton-post';
import { toast } from 'sonner';

export default function TimelinePostFetcher() {
  // TODO: don't use usePopularPosts for authenticated users
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading, fetchNextPage } = usePopularPostsReactQuery();

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

  const onComposerPublish = (newPost: GetPostResponse) => {
    if (!data) return;

    const newData = structuredClone(data.pages);
    newData[0] = [newPost, ...newData[0]];

    queryClient.setQueryData(['popularPosts'], (data: { pageParams: number }) => ({
      pages: newData,
      pageParams: data.pageParams
    }));
  };

  return (
    <>
      <FeedPostComposer onPublish={onComposerPublish} />

      {data?.pages?.map((pagePosts, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
