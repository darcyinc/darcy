interface FeedPostProps {
  content: string;
  username: string;
  avatar: string;
  handle: string;
  createdAt: number;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  postId: string;
  hasLiked: boolean;
  hasReposted: boolean;
}

import Link from 'next/link';
import { useLocale } from 'next-intl';

import useRelativeTime from '@/hooks/useRelativeTime';

import FeedPostActions from './FeedPostActions';

export default function FeedPost({ content, avatar, username, handle, createdAt, ...props }: FeedPostProps) {
  const locale = useLocale();
  const relativeTime = useRelativeTime({ locale, time: createdAt });

  return (
    <div className="flex h-fit w-full max-w-xl gap-2 border-b border-b-grayBorder px-3 py-2 hover:bg-hoverEffect">
      <div className="h-11 w-11">
        <img alt={username} className="rounded-full" draggable={false} src={avatar} />
      </div>

      <div className="flex flex-col">
        <header className="flex gap-1">
          <Link className="font-bold text-textPrimary hover:underline" href={`/${handle}`}>
            {username}
          </Link>

          <p className="flex gap-1 text-textSecondary">
            <Link className="text-inherit hover:underline" href={`/${handle}`}>
              @{handle}
            </Link>
            <span className="select-none">·</span>
            <time>{relativeTime}</time>
          </p>
        </header>

        <article>
          <p className="break-words">{content}</p>
        </article>

        <footer className="mt-2 flex justify-evenly">
          <FeedPostActions {...props} />
        </footer>
      </div>
    </div>
  );
}
