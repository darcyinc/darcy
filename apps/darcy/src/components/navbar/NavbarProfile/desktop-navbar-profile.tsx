'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';

export default function DesktopNavbarProfile() {
  const currentUser = useCurrentUser();

  return (
    currentUser.token && (
      <div className="mt-auto p-1">
        <Link className="hidden sm:block" href={`/${currentUser.handle}`}>
          <Button variant="ghost" className="rounded-full p-2 py-7 xl:p-4 xl:py-8">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={currentUser.avatarUrl} alt="Your profile picture" />
                {/* TODO */}
                <AvatarFallback>??</AvatarFallback>
              </Avatar>

              <div className="hidden w-full flex-col overflow-hidden xl:flex">
                <p className="text-start truncate font-bold text-textPrimary">{currentUser.displayName}</p>
                <p className="text-muted-foreground">@{currentUser.handle}</p>
              </div>
            </div>
          </Button>
        </Link>
      </div>
    )
  );
}
