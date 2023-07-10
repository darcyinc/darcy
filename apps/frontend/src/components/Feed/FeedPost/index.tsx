'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import isEnterOrClick, { EnterOrClickEvent } from '@/lib/utils/isEnterOrClick';

import FeedPostActions from './FeedPostActions';
import FeedPostMedia from './FeedPostMedia';

export interface FeedPostProps {
  user: {
    username: string;
    handle: string;
    avatar: string;
  };
  content: string;
  media?: string[];
  stats: {
    comments: number;
    reposts: number;
    likes: number;
    views: string;
    hasLiked?: boolean;
    hasReposted?: boolean;
  };
}

export default function FeedPost({ user, content, media, stats }: FeedPostProps) {
  const router = useRouter();

  const handlePostClick = useCallback(
    (e: EnterOrClickEvent) => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      router.push('/post/9041203120312');
    },
    [router]
  );

  const handleUserClick = useCallback(
    (e: EnterOrClickEvent) => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      router.push('/davipatricio');
    },
    [router]
  );

  return (
    <div
      className="flex w-full cursor-pointer gap-2 border-b border-grayBorder p-4 py-1.5 hover:bg-hoverEffect focus-visible:bg-hoverEffect active:bg-hoverEffect md:px-4"
      role="button"
      tabIndex={0}
      onClick={handlePostClick}
      onKeyDown={handlePostClick}
    >
      <div className="h-fit w-fit" role="button" tabIndex={0} onClick={handleUserClick} onKeyDown={handleUserClick}>
        <img
          alt="User profile avatar"
          className="h-11 w-11 rounded-full"
          decoding="async"
          height={40}
          loading="lazy"
          src={user.avatar}
          width={40}
        />
      </div>

      <div>
        <header className="w-fit break-words text-sm">
          <Link className="flex-wrap hover:no-underline" href="/davipatricio" onClick={handleUserClick} onKeyDown={handleUserClick}>
            <p className="inline font-bold text-textPrimary hover:underline">{user.username}</p>
            <p className="ml-1 inline text-textSecondary hover:underline">@{user.handle}</p>
          </Link>

          <time className="ml-1 text-textSecondary before:mr-1 before:content-['•']" dateTime="2023-05-12">
            2 de mai
          </time>
        </header>

        <section>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <article className="break-all text-sm text-textPrimary sm:break-keep" onClick={handlePostClick}>
            {content}
          </article>

          {media && <FeedPostMedia media={media} />}
        </section>

        <FeedPostActions {...stats} />
      </div>
    </div>
  );
}
