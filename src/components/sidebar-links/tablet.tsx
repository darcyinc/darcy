'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import clsx from 'clsx';
import { House, Bell, Search, Bookmark, User } from 'lucide-react';
import Link from 'next/link';

interface SidebarLinksProps {
  activeLink: string;
}

export default function TabletSidebarLinks({ activeLink }: SidebarLinksProps) {
  const currentUser = useCurrentUser();

  return (
    <aside className="h-screen flex flex-col items-center p-0 py-10 border-r">
      <nav className="flex flex-col gap-3">
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg w-fit p-2 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'home'}
        >
          <House className="size-6" />
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg w-fit p-2 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'search'}
        >
          <Search className="size-6" />
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg w-fit p-2 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'notifications'}
        >
          <Bell className="size-6" />
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg w-fit p-2 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'notifications'}
        >
          <Bookmark className="size-6" />
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg w-fit p-2 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'profile'}
        >
          <User className="size-6" />
        </Link>
      </nav>

      {currentUser._ready && currentUser.handle && (
        <div className="flex items-center gap-2 mx-2 cursor-pointer mt-auto w-8 h-8 rounded-full flex-shrink-0 hover:bg-info/10 active:bg-info/20">
          <img
            src={currentUser.avatar_url ?? 'https://picsum.photos/seed/1/100/100'}
            alt={currentUser.full_name}
            className="w-full h-full rounded-full flex-shrink-0"
          />
        </div>
      )}
    </aside>
  );
}
