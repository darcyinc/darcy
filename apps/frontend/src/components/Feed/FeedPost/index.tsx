'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { HiOutlineChat, HiOutlineHeart, HiOutlineShare } from 'react-icons/hi';

import { getUser } from '@/api/users/getUser';
import isEnterOrClick, { EnterOrClickEvent } from '@/lib/utils/isEnterOrClick';

import { Container, PostContent, PostFooter, PostHeader } from './styles';

export default function FeedPost() {
  const router = useRouter();

  const handlePostClick = useCallback(
    (e: EnterOrClickEvent) => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      router.push('/post/9041203120312');
    },
    [router]
  );

  const handleImageClick = useCallback(
    (e: EnterOrClickEvent<HTMLButtonElement>) => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      router.push('/post/9041203120312');
    },
    [router]
  );

  const handlePostInteraction = useCallback(
    async (e: EnterOrClickEvent, action: 'like' | 'retweet' | 'comment') => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      alert(`You ${action}d this post!`);

      await getUser('davipatricio');
    },
    []
  );

  return (
    <Container
      onClick={handlePostClick}
      onKeyDown={handlePostClick}
      tabIndex={0}
      role="button"
    >
      <img
        src="https://via.placeholder.com/42"
        alt="User"
        decoding="async"
        loading="lazy"
      />
      <div>
        <PostHeader>
          <Link href="/davipatricio">
            <p>Davi Patricio</p> <span>@davipatricio</span>{' '}
          </Link>
          <time dateTime="2023-05-12">2 de mai</time>
        </PostHeader>

        <PostContent>
          <p>
            Hello everyone! Please checkout my GitHub:{' '}
            <a href="https://github.com/davipatricio" target="_blank">
              https://github.com/davipatricio
            </a>{' '}
            and my LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/davipatricio/" target="_blank">
              https://www.linkedin.com/in/davipatricio/
            </a>
            .
          </p>
          {/* TODO: transform this into a FeedPostMedia component */}
          <button type="button" className="media" onClick={handleImageClick}>
            <img
              src="https://via.placeholder.com/480x280.webp"
              alt="Post"
              decoding="async"
              loading="lazy"
            />
          </button>
        </PostContent>

        <PostFooter>
          <button
            type="button"
            className="comment"
            onClick={(e) => handlePostInteraction(e, 'comment')}
          >
            <HiOutlineChat />
            <span>1</span>
          </button>
          <button
            type="button"
            className="retweet retweeted"
            onClick={(e) => handlePostInteraction(e, 'retweet')}
          >
            <HiOutlineShare />
            <span>1</span>
          </button>
          <button
            type="button"
            className="like"
            onClick={(e) => handlePostInteraction(e, 'like')}
          >
            <HiOutlineHeart />
            <span>1</span>
          </button>
        </PostFooter>
      </div>
    </Container>
  );
}
