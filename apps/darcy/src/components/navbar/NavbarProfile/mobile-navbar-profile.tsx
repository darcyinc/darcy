'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';

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

      <Link className="rounded-full p-2 text-textPrimary hover:bg-accent" href="/">
        <AiOutlineAlignLeft className="text-2xl" />
      </Link>

      <button type="button" className="hover:bg-accent p-2 mx-2 rounded-full block sm:hidden">
        <MdOutlineSettings className="text-xl" />
      </button>
    </div>
  );
}
