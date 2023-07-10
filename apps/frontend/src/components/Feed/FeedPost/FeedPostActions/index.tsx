'use client';

import clsx from 'clsx';
import { useCallback } from 'react';
import { HiChartSquareBar, HiChatAlt2, HiOutlineHeart, HiOutlineShare } from 'react-icons/hi';

import { getUser } from '@/api/users/getUser';
import isEnterOrClick, { EnterOrClickEvent } from '@/lib/utils/isEnterOrClick';

import { FeedPostProps } from '..';

type FeedPostActionsProps = FeedPostProps['stats'];

export default function FeedPostActions({ likes, reposts, comments, views, hasLiked, hasReposted }: FeedPostActionsProps) {
  const handlePostInteraction = useCallback(async (e: EnterOrClickEvent, action: 'like' | 'repost' | 'comment' | 'about_views') => {
    if (!isEnterOrClick(e)) return;
    e.stopPropagation();

    alert(`You ${action}d this post!`);

    await getUser('davipatricio');
  }, []);

  return (
    <footer className="mt-2 flex items-start justify-around text-sm text-textSecondary">
      <button
        className="flex items-center gap-px hover:text-blue [&>svg]:hover:bg-blue/[0.1]"
        type="button"
        onClick={(e) => handlePostInteraction(e, 'comment')}
      >
        <HiChatAlt2 className="rounded-full p-1 text-3xl" />
        <span>{comments}</span>
      </button>

      <button
        className={clsx('flex items-center gap-px hover:text-green [&>svg]:hover:bg-green/[0.1]', hasReposted && 'text-green')}
        type="button"
        onClick={(e) => handlePostInteraction(e, 'repost')}
      >
        <HiOutlineShare className="rounded-full p-1 text-3xl" />
        <span>{reposts}</span>
      </button>

      <button
        className={clsx('flex items-center gap-px hover:text-red [&>svg]:hover:bg-red/[0.1]', hasLiked && 'text-red')}
        type="button"
        onClick={(e) => handlePostInteraction(e, 'like')}
      >
        <HiOutlineHeart className={clsx('rounded-full p-1 text-3xl', hasLiked && 'fill-red')} />
        <span>{likes}</span>
      </button>

      <button
        className={clsx('flex items-center gap-px hover:text-stone-500 [&>svg]:hover:bg-stone-500/[0.1]')}
        type="button"
        onClick={(e) => handlePostInteraction(e, 'about_views')}
      >
        <HiChartSquareBar className="rounded-full p-1 text-3xl" />
        <span>{views}</span>
      </button>
    </footer>
  );
}
