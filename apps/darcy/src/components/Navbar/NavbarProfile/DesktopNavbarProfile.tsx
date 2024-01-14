'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';

export default function DesktopNavbarProfile() {
  const currentUser = useCurrentUser();

  return (
    currentUser.token && (
      <Link className="hidden sm:block mt-auto w-full rounded-full p-3 hover:bg-hoverEffect" href="/davipatricio">
        <div className="flex items-center gap-2">
          <img alt="Your profile avatar." className="min-h-10 max-h-12  rounded-full" src="https://picsum.photos/48.webp" />
          <div className="hidden w-full flex-col overflow-hidden xl:flex">
            <p className="truncate font-bold text-textPrimary">{currentUser.displayName}</p>
            <p className="text-textSecondary">@{currentUser.handle}</p>
          </div>
        </div>
      </Link>
    )
  );
}
