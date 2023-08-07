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

import ClickablePost from './ClickablePost';
import FeedPostActions from './FeedPostActions';

export default function FeedPost({ content, avatar, username, handle, createdAt, ...props }: FeedPostProps) {
  const locale = useLocale();
  const relativeTime = useRelativeTime({ locale, time: createdAt });

  return (
    <ClickablePost>
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

        <article className="break-words">{content}</article>

        <footer className="mt-2 flex justify-evenly">
          <FeedPostActions {...props} />
        </footer>
      </div>
    </ClickablePost>
  );
}
