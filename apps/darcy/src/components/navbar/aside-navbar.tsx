'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md';
import { Button } from '../ui/button';
import { DesktopNavbarLinks } from './NavbarLinks';
import DesktopNavbarProfile from './NavbarProfile/desktop-navbar-profile';

export default function AsideNavbar() {
  const currentUser = useCurrentUser();
  const t = useTranslations('Navbar');

  return (
    <div className="sticky top-0 hidden h-screen w-fit max-w-[275px] flex-col items-center gap-2 py-2 sm:flex xl:items-start xl:pr-4">
      {/* Logo */}
      <Button variant="ghost" className="rounded-full p-2" size="icon" asChild>
        <Link href="/">
          <AiOutlineAlignLeft className="text-6xl" />
        </Link>
      </Button>

      {/* Links */}
      <nav className="flex flex-col gap-1 items-center xl:items-start">
        <DesktopNavbarLinks />

        {currentUser.token && (
          <div className="xl:w-full mt-2 xl:mt-5">
            <Button className="rounded-full w-fit xl:w-full p-3 py-6" size="icon">
              <MdCreate className="text-2xl xl:hidden" />
              <p className="hidden xl:block font-bold text-xl">{t('publish')}</p>
            </Button>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <DesktopNavbarProfile />
    </div>
  );
}
