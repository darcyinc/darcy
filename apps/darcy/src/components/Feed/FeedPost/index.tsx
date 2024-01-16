import { useLocale } from 'next-intl';
import Link from 'next/link';

import useRelativeTime from '@/hooks/useRelativeTime';

import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import ClickablePost from './ClickablePost';
import FeedPostActions from './FeedPostActions';

interface FeedPostProps {
  content: string;
  username: string;
  avatar: string;
  handle: string;
  createdAt: string;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  postId: string;
  hasLiked: boolean;
  hasReposted: boolean;
  updatePostData?: (postId: string, newData: Partial<GetUserPostsResponse>) => void;
}

export default function FeedPost({ content, avatar, username, handle, createdAt, ...props }: FeedPostProps) {
  const locale = useLocale();
  const relativeTime = useRelativeTime({ locale, time: createdAt });

  return (
    <ClickablePost postId={props.postId}>
      <div className="flex gap-2">
        <Link className="h-10 w-10 flex-shrink-0" href={`/${handle}`}>
          <img alt={username} className="rounded-full" draggable={false} src={avatar} />
        </Link>

        <div className="flex flex-col overflow-hidden">
          <header className="flex items-center gap-x-1 truncate">
            <Link className="truncate font-bold text-textPrimary hover:underline" href={`/${handle}`}>
              {username}
            </Link>

            <Link className="hidden truncate text-textSecondary hover:underline sm:inline" href={`/${handle}`}>
              @{handle}
            </Link>

            {/* {verified !== 'NONE' && <UserBadge badge={verified} />} */}

            <p className="flex flex-1 gap-1 overflow-hidden text-textSecondary">
              <span className="select-none">·</span>
              <time className="truncate" dateTime={new Date(createdAt).toISOString()}>
                {relativeTime}
              </time>
            </p>
          </header>

          <article className="break-words">{content}</article>
        </div>
      </div>

      <FeedPostActions {...props} />
    </ClickablePost>
  );
}
