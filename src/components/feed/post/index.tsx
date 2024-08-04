import type { GetPostResponse } from '@/types/api/posts';
import { Ellipsis, Repeat2 } from 'lucide-react';
import Link from 'next/link';
import PostSocial from './post-social';

interface PostProps {
  post: GetPostResponse;
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-nowrap gap-2 p-2 border-b overflow-hidden">
      <img
        src={post.author.avatar_url ?? 'https://picsum.photos/64/64'}
        alt={post.author.full_name}
        className="w-10 h-10 flex-shrink-0 rounded-full"
      />

      <div className="flex flex-col w-full">
        {post.reposted_by && (
          <div className="flex items-center text-sm text-info">
            <Repeat2 className="size-4 mr-1" />
            <span>Repostado por {post.reposted_by.full_name}</span>
          </div>
        )}

        {/* Post author profile info and settings */}
        <div className="flex items-center justify-between">
          <div className="grid items-center leading-tight gap-x-px grid-cols-[max(45%),max(55%)] md:grid-cols-1">
            <Link href={`/${post.author.handle}`} className="link link-hover font-semibold text-base truncate max-w-sm">
              {post.author.full_name}
            </Link>
            <Link href={`/${post.author.handle}`} className="link link-hover truncate text-info">
              @{post.author.handle}
            </Link>
          </div>

          <div>
            <button type="button" title="More options" className="md:btn-ghost rounded-full p-1 ml-2 ">
              <Ellipsis className="size-5" />
            </button>
          </div>
        </div>

        {/* Post info */}
        <article className="mt-1">
          <p className="leading-snug">{post.content}</p>
        </article>

        {/* Likes, reposts, comments */}
        <PostSocial post={post} />
      </div>
    </div>
  );
}
