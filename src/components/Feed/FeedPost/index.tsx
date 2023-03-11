import { AiFillHeart, AiOutlineHeart } from 'solid-icons/ai';
import { BiRegularRepost, BiSolidCommentDetail } from 'solid-icons/bi';
import { createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';
import {
  PostContainer,
  PostContent,
  PostFooter,
  PostHeader,
  PostHeaderAuthorInfo,
} from './styles';
import type { SyntheticEvent } from '~/types/events';

interface PostEmbed {
  type: 'image' | 'url';
  url: string;
}

interface FeedPostProps {
  content: string;
  embeds: PostEmbed[];
  hasLiked: boolean;
  hasReposted: boolean;
  postURL: string;
  stats: {
    comments: number;
    likes: number;
    reposts: number;
  };
  user: {
    avatar: string;
    handle: string;
    name: string;
  };
}

const handleLike = (e: SyntheticEvent<HTMLButtonElement>) => {
  e.preventDefault();

  return 0;
};

const handleRepost = (e: SyntheticEvent<HTMLButtonElement>) => {
  e.preventDefault();

  return 1;
};

export default function FeedPost(props: FeedPostProps) {
  const navigate = useNavigate();

  const handleComment = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`${props.postURL}#comment`);
  };

  const [isPopoverOpen, setIsPopoverOpen] = createSignal(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = (wait?: boolean) => {
    if (wait) setTimeout(() => setIsPopoverOpen(false), 1_000);
    else setIsPopoverOpen(false);
  };

  return (
    <PostContainer>
      <PostHeader>
        <PostHeaderAuthorInfo href={`/${props.user.handle}`}>
          <img src={props.user.avatar} alt={props.user.name} />
          <div>
            <p class="name">{props.user.name}</p>
            <p class="handle">@{props.user.handle}</p>
          </div>
        </PostHeaderAuthorInfo>

        <div class="post-date">
          {isPopoverOpen() && (
            <span
              class="tooltip"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={() => handlePopoverClose()}
            >
              1 de fevereiro de 2023 10:30
            </span>
          )}

          <span
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={() => handlePopoverClose(true)}
          >
            12m ago
          </span>
        </div>
      </PostHeader>

      <PostContent href={props.postURL}>
        <article>
          <p>{props.content}</p>
        </article>
      </PostContent>

      {props.embeds.length > 0 && <h1>TODO: EMBED</h1>}

      <PostFooter>
        <button
          class="like"
          data-liked={props.hasLiked}
          type="button"
          onClick={handleLike}
        >
          {props.hasLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          <span>{props.stats.likes}</span>
        </button>

        <button
          class="repost"
          data-reposted={props.hasReposted}
          type="button"
          onClick={handleRepost}
        >
          <BiRegularRepost />
          <span>{props.stats.reposts}</span>
        </button>

        <button class="comment" type="button" onClick={handleComment}>
          <BiSolidCommentDetail />
          <span>{props.stats.comments}</span>
        </button>
      </PostFooter>
    </PostContainer>
  );
}
