'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md';

import Button from '../Button';

import { NavbarLinks } from './NavbarLinks';
import DesktopNavbarProfile from './NavbarProfile/DesktopNavbarProfile';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function AsideNavbar() {
  const currentUser = useCurrentUser();
  const t = useTranslations('Navbar');

  return (
    <div className="sticky top-0 hidden h-screen w-fit max-w-[275px] flex-col items-center gap-2 px-1 py-2 sm:flex xl:items-start xl:pr-4">
      {/* Logo */}
      <Link className="rounded-full p-2 text-textPrimary hover:bg-hoverEffect" href="/">
        <AiOutlineAlignLeft className="text-4xl" />
      </Link>

      {/* Links */}
      <nav className="flex flex-col items-center xl:items-start">
        <NavbarLinks.Desktop />

        {currentUser.token && (
          <Button className="mt-2 w-fit !p-4 xl:mt-5 xl:w-full xl:p-5" color="blue" size="lg">
            <MdCreate className="block text-2xl xl:mr-2 xl:hidden" />
            <p className="hidden xl:block">{t('publish')}</p>
          </Button>
        )}
      </nav>

      {/* User Profile */}
      <DesktopNavbarProfile />
    </div>
  );
}
