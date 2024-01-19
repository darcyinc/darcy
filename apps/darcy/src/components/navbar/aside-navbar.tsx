'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AlignLeft, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '../ui/button';
import { DesktopNavbarLinks } from './navbar-links';
import { DesktopNavbarProfile } from './navbar-profile';

export default function AsideNavbar() {
  const currentUser = useCurrentUser();
  const t = useTranslations('Navbar');

  return (
    <div className="sticky top-0 hidden h-screen w-fit max-w-[275px] flex-col items-center gap-2 py-2 sm:flex xl:items-start xl:pr-4">
      {/* Logo */}
      <Button variant="ghost" className="rounded-full p-2" size="icon" asChild>
        <Link href="/">
          <AlignLeft size={60} />
        </Link>
      </Button>

      {/* Links */}
      <nav className="flex flex-col gap-1 items-center xl:items-start">
        <DesktopNavbarLinks />

        {currentUser.token && (
          <div className="xl:w-full mt-2 xl:mt-5">
            <Button className="rounded-full w-fit xl:w-full p-3 py-6" size="icon">
              <Pencil size={24} className="xl:hidden" />
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
