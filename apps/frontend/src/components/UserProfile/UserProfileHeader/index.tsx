import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HiOutlineArrowLeft, HiOutlineCalendar, HiOutlineIdentification, HiOutlineLink, HiOutlineLocationMarker } from 'react-icons/hi';

import Button from '@/components/Button';

interface UserProfileHeaderProps {
  username: string;
  posts: number;
  handle: string;
  bio: string;
  banner: string;
  avatar: string;
}

export default function UserProfileHeader({ username, posts, handle, bio, banner, avatar }: UserProfileHeaderProps) {
  const t = useTranslations('ProfileHeader');

  return (
    <header className="border-b border-grayBorder">
      <header className="flex w-full items-center gap-3 p-1 px-5">
        <Link
          className="flex h-10 w-10 items-center justify-center rounded-full text-textPrimary hover:bg-hoverEffect focus:bg-hoverEffect focus:ring"
          href="/"
        >
          <HiOutlineArrowLeft className="text-2xl" />
        </Link>

        <div>
          <h3 className="text-lg font-bold text-textPrimary">{username}</h3>
          <p className="text-sm text-textSecondary">{t('posts', { posts })}</p>
        </div>
      </header>

      <section>
        <div className="relative">
          <img alt="User banner" className="max-h-52 w-full object-cover" decoding="async" draggable={false} loading="lazy" src={banner} />

          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            alt="User profile picture"
            className="absolute -bottom-[50px] ml-5 h-20 w-20 rounded-full border border-background object-cover sm:h-32 sm:w-32"
            decoding="async"
            draggable={false}
            loading="lazy"
            src={avatar}
          />
        </div>

        <div className="ml-auto w-fit">
          <Button className="mr-3 mt-3 px-5" size="small" variant="transparent">
            Editar perfil
          </Button>
        </div>

        <section className="px-5 py-1">
          <div>
            <h1 className="text-xl font-bold text-textPrimary">{username}</h1>
            <p className="text-base text-textSecondary">@{handle}</p>

            <p className="mt-1">{bio}</p>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
              <HiOutlineIdentification className="text-xl" />
              <span>Programador</span>
            </div>
            <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
              <HiOutlineLocationMarker className="text-xl" />
              <span>São Paulo, Brasil</span>
            </div>
            <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
              <HiOutlineCalendar className="text-xl" />
              <span>Entrou em 1 de julho de 2023</span>
            </div>
            <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
              <HiOutlineLink className="text-xl" />
              <Link className="max-w-[165px] overflow-hidden overflow-ellipsis whitespace-nowrap" href="https://google.com">
                extremely-large-website.com
              </Link>
            </div>
          </div>

          <div className="mt-3 flex gap-4 text-sm">
            <a className="text-textSecondary decoration-darkGray hover:underline" href="#followers">
              <span className="mr-1 font-bold text-textPrimary">1</span>Seguindo
            </a>
            <a className="text-textSecondary decoration-darkGray hover:underline" href="#followers">
              <span className="mr-1 font-bold text-textPrimary">1</span>
              Seguidores
            </a>
          </div>
        </section>
      </section>
    </header>
  );
}
