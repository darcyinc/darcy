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
}

import { useLocale } from 'next-intl';
import { MdOutlineFavoriteBorder, MdOutlineRestartAlt, MdOutlineSpeakerNotes, MdViewKanban } from 'react-icons/md';

import useRelativeTime from '@/hooks/useRelativeTime';

export default function FeedPost({ content, avatar, username, handle, createdAt, likes, comments, reposts, views }: FeedPostProps) {
  const locale = useLocale();
  const relativeTime = useRelativeTime({ locale, time: createdAt });

  return (
    <div className="flex h-fit w-full max-w-xl gap-2 border-b border-b-grayBorder px-3 py-2 hover:bg-hoverEffect">
      <div className="h-11 w-11">
        <img alt={username} className="rounded-full" draggable={false} src={avatar} />
      </div>

      <div className="flex flex-col">
        <header className="flex flex-col">
          <div className="flex gap-1">
            <span className="font-bold">{username}</span>
            <p className="flex gap-1 text-textSecondary">
              <span>@{handle}</span>
              <span className="select-none">·</span>
              <time>{relativeTime}</time>
            </p>
          </div>
        </header>

        <article>
          <p className="break-words">{content}</p>
        </article>

        <footer className="mt-2 flex justify-evenly">
          <div className="group flex select-none items-center gap-2 hover:text-blue">
            <MdOutlineSpeakerNotes className="h-7 w-7 rounded-full p-1 group-hover:bg-blue/40" />
            <span>{comments}</span>
          </div>

          <div data-reposted className="group flex select-none items-center gap-2 hover:text-green data-[reposted='true']:text-green">
            <MdOutlineRestartAlt className="h-7 w-7 rounded-full p-1 group-hover:bg-green/40" />
            <span>{reposts}</span>
          </div>

          <div data-liked className="group flex select-none items-center gap-2 hover:text-red data-[liked='true']:text-red">
            <MdOutlineFavoriteBorder className="h-7 w-7 rounded-full p-1 group-hover:bg-red/40" />
            <span>{likes}</span>
          </div>

          <div className="group flex select-none items-center gap-2 hover:text-blue">
            <MdViewKanban className="h-7 w-7 rounded-full p-1 group-hover:bg-blue/40" />
            <span>{views}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
