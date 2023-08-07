'use client';

import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineRestartAlt,
  MdOutlineSpeakerNotes,
  MdRestartAlt,
  MdViewKanban
} from 'react-icons/md';

interface FeedPostActionsProps {
  comments: number;
  reposts: number;
  likes: number;
  views: number;
  postId: string;
  hasLiked: boolean;
  hasReposted: boolean;
}

export default function FeedPostActions({ comments, reposts, likes, views, postId, hasLiked, hasReposted }: FeedPostActionsProps) {
  const handleLike = async () => {
    console.log('Liking post', postId);
  };

  const handleRepost = async () => {
    console.log('Reposting post', postId);
  };

  return (
    <>
      <button className="group flex select-none items-center gap-2 hover:text-blue" type="button">
        <MdOutlineSpeakerNotes className="h-7 w-7 rounded-full p-1 group-hover:bg-blue/40" />
        <span>{comments}</span>
      </button>

      <button
        className="group flex select-none items-center gap-2 hover:text-green data-[reposted='true']:text-green"
        data-reposted={hasReposted}
        type="button"
        onClick={handleRepost}
      >
        {hasReposted ? (
          <MdRestartAlt className="h-7 w-7 rounded-full p-1 group-hover:bg-green/40" />
        ) : (
          <MdOutlineRestartAlt className="h-7 w-7 rounded-full p-1 group-hover:bg-green/40" />
        )}
        <span>{reposts}</span>
      </button>

      <button
        className="group flex select-none items-center gap-2 hover:text-red data-[liked='true']:text-red"
        data-liked={hasLiked}
        type="button"
        onClick={handleLike}
      >
        {hasLiked ? (
          <MdFavorite className="h-7 w-7 rounded-full p-1 group-hover:bg-red/40" />
        ) : (
          <MdOutlineFavoriteBorder className="h-7 w-7 rounded-full p-1 group-hover:bg-red/40" />
        )}

        <span>{likes}</span>
      </button>

      <button className="group flex select-none items-center gap-2 hover:text-purple-300" type="button">
        <MdViewKanban className="h-7 w-7 rounded-full p-1 group-hover:bg-purple-500/40" />
        <span>{views}</span>
      </button>
    </>
  );
}
