'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AlignLeft, Settings } from 'lucide-react';
import Link from 'next/link';

export default function MobileNavbarProfile() {
  const currentUser = useCurrentUser();

  return (
    <div className="flex items-center justify-between sm:hidden w-full py-2 px-4">
      {currentUser.token && (
        <Avatar>
          <AvatarImage src={currentUser.avatarUrl} alt="Your profile picture" />
          {/* TODO */}
          <AvatarFallback>??</AvatarFallback>
        </Avatar>
      )}

      <Link className="rounded-full p-2 hover:bg-accent" href="/">
        <AlignLeft size={26} />
      </Link>

      <button type="button" className="hover:bg-accent p-2 mx-2 rounded-full block sm:hidden">
        <Settings size={18} />
      </button>
    </div>
  );
}
