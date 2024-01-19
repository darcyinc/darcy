'use client';

import { apiClient } from '@/api/client';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import clsx from 'clsx';
import { BarChart2, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeedPostActionsProps {
  comments: number;
  reposts: number;
  likes: number;
  views: number;
  postId: string;
  hasLiked: boolean;
  hasReposted: boolean;
  updatePostData?: (postId: string, newData: Partial<GetUserPostsResponse>) => void;
}

export default function PostActions({
  comments,
  reposts,
  likes,
  views,
  postId,
  hasLiked,
  hasReposted,
  updatePostData
}: FeedPostActionsProps) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const handleComment = () => router.push(`/post/${postId}`);

  const handleLike = async () => {
    updatePostData?.(postId, { hasLiked: !hasLiked, likeCount: likes + (hasLiked ? -1 : 1) });

    const undoOptimisticUpdate = () => updatePostData?.(postId, { hasLiked, likeCount: likes });

    if (hasLiked)
      apiClient
        .delete(`/post/${postId}/like`)
        .then((res) => {
          if (res.status !== 200) undoOptimisticUpdate();
        })
        .catch(undoOptimisticUpdate);
    else
      apiClient
        .post(`/post/${postId}/like`)
        .then((res) => {
          if (res.status !== 200) undoOptimisticUpdate();
        })
        .catch(undoOptimisticUpdate);
  };

  const handleRepost = () => {
    console.log('Reposting post', postId);
  };

  return (
    <footer className="mt-2 flex justify-evenly text-sm text-gray-500">
      <button
        className="group flex select-none items-center gap-1 hover:text-primary"
        type="button"
        onClick={handleComment}
        aria-label="See post comments"
      >
        <div className="rounded-full p-1.5 group-hover:bg-primary/20">
          <MessageCircle size={16} />
        </div>
        <span>{comments}</span>
      </button>

      <button
        className={clsx(
          'group flex select-none items-center gap-1 enabled:hover:text-repost disabled:cursor-not-allowed',
          hasReposted && 'text-repost'
        )}
        type="button"
        onClick={handleRepost}
        disabled={!currentUser.token}
        aria-label="Repost post"
      >
        <div className="rounded-full p-1.5 group-enabled:hover:bg-repost/20">
          <Repeat2 size={16} />
        </div>
        <span>{reposts}</span>
      </button>

      <button
        className={clsx(
          'group flex select-none items-center gap-1 enabled:hover:text-like disabled:cursor-not-allowed',
          hasLiked && 'text-like'
        )}
        type="button"
        onClick={handleLike}
        disabled={!currentUser.token}
        aria-label="Like post"
      >
        <div className="rounded-full p-1.5 group-enabled:hover:bg-like/20">
          <Heart size={16} className={clsx(hasLiked && 'fill-like')} />
        </div>
        <span>{likes}</span>
      </button>

      <button className="group flex select-none items-center gap-1 hover:text-purple-600" type="button" aria-label="See post views">
        <div className="rounded-full p-1.5 group-hover:bg-purple-500/20">
          <BarChart2 size={16} />
        </div>
        <span>{views}</span>
      </button>
    </footer>
  );
}
