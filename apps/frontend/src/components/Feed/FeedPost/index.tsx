'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { HiOutlineChat, HiOutlineHeart, HiOutlineShare } from 'react-icons/hi';

import { getUser } from '@/api/users/getUser';
import isEnterOrClick, { EnterOrClickEvent } from '@/lib/utils/isEnterOrClick';

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

  const handlePostInteraction = useCallback(async (e: EnterOrClickEvent, action: 'like' | 'repost' | 'comment') => {
    if (!isEnterOrClick(e)) return;
    e.stopPropagation();

    alert(`You ${action}d this post!`);

    await getUser('davipatricio');
  }, []);

  return (
    <div
      className="flex w-full cursor-pointer gap-2 border-b border-grayBorder p-4 py-1.5 hover:bg-hoverEffect focus:bg-hoverEffect focus-visible:bg-hoverEffect md:px-4"
      role="button"
      tabIndex={0}
      onClick={handlePostClick}
      onKeyDown={handlePostClick}
    >
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        alt="User profile picture (avatar)"
        className="h-11 w-11 rounded-full"
        decoding="async"
        loading="lazy"
        src="https://via.placeholder.com/42"
      />

      <div>
        <header className="w-fit break-words text-sm">
          <Link className="flex-wrap hover:no-underline" href="/davipatricio">
            <p className="inline font-bold text-textPrimary hover:underline">Davi Patricio</p>
            <p className="ml-1 inline text-textSecondary hover:underline">@davipatricio</p>
          </Link>

          <time className="ml-1 text-textSecondary before:mr-1 before:content-['•']" dateTime="2023-05-12">
            2 de mai
          </time>
        </header>

        <section>
          <p className="break-all text-sm text-textPrimary sm:break-keep">
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
          <button className="mt-3 cursor-pointer rounded-2xl border-none bg-none" type="button" onClick={handleImageClick}>
            <img
              alt="Post"
              className="h-full max-h-[512px] w-full rounded-2xl border border-grayBorder"
              decoding="async"
              height={250}
              loading="lazy"
              src="https://via.placeholder.com/250x320.webp"
              width={320}
            />
          </button>
        </section>

        <footer className="mt-2 flex items-start justify-around">
          <button
            className="flex cursor-pointer items-center gap-[1px] border-none bg-none text-textSecondary hover:text-blue [&>svg]:hover:bg-blue/[0.1]"
            type="button"
            onClick={(e) => handlePostInteraction(e, 'comment')}
          >
            <HiOutlineChat className="rounded-full p-1 text-3xl" />
            <span>1</span>
          </button>

          <button
            className="reposted group flex cursor-pointer items-center gap-[1px] border-none bg-none text-textSecondary hover:text-green [&.reposted]:text-green [&>svg]:hover:bg-green/[0.1]"
            type="button"
            onClick={(e) => handlePostInteraction(e, 'repost')}
          >
            <HiOutlineShare className="rounded-full p-1 text-3xl" />
            <span>1</span>
          </button>

          <button
            className="liked group flex cursor-pointer items-center gap-[1px] border-none bg-none text-textSecondary hover:text-red [&.liked]:text-red [&>svg]:hover:bg-red/[0.1]"
            type="button"
            onClick={(e) => handlePostInteraction(e, 'like')}
          >
            <HiOutlineHeart className="rounded-full p-1 text-3xl group-[.liked]:fill-red" />
            <span>1</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
