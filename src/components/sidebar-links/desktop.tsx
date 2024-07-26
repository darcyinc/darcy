'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import clsx from 'clsx';
import { House, Bell, Search, Bookmark, User } from 'lucide-react';
import Link from 'next/link';

interface SidebarLinksProps {
  activeLink: string;
}

export default function DesktopSidebarLinks({ activeLink }: SidebarLinksProps) {
  const currentUser = useCurrentUser();

  return (
    <aside className="h-screen flex flex-col max-w-[281px] w-full p-2 pt-4 border-r">
      <Link href="/" className="text-white font-semibold mb-10 text-2xl">darcy</Link>

      <nav className="flex flex-col gap-2">
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg p-2 pr-10 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'home'}
        >
          <House className="size-7" />
          Início
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg p-2 pr-10 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'search'}
        >
          <Search className="size-7" />
          Pesquisa
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg p-2 pr-10 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'notifications'}
        >
          <Bell className="size-7" />
          Notificações
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg p-2 pr-10 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'notifications'}
        >
          <Bookmark className="size-7" />
          Itens salvos
        </Link>
        <Link
          href="#"
          className={clsx(
            'flex items-center text-lg p-2 pr-10 rounded-2xl gap-2',
            'data-[active="true"]:bg-info/10 data-[active="true"]:font-bold hover:!bg-info/20 active:!bg-info/20'
          )}
          data-active={activeLink === 'profile'}
        >
          <User className="size-7" />
          Perfil
        </Link>
      </nav>

      {currentUser._ready && currentUser.handle && (
        <div className="flex items-center gap-2 p-2 px-4 cursor-pointer mt-auto rounded-full hover:bg-info/10 active:bg-info/20">
          <img src={currentUser.avatar_url ?? 'https://picsum.photos/seed/1/100/100'} alt={currentUser.full_name} className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="font-semibold overflow-hidden text-ellipsis">{currentUser.full_name}</p>
            <span className="block text-info overflow-hidden text-ellipsis">{currentUser.handle}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
