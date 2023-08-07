import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md';

import Button from '../Button';

import { NavbarLinks } from './NavbarLinks';

export default function AsideNavbar() {
  const t = useTranslations('Navbar');

  return (
    <div className="hidden w-fit max-w-[275px] flex-col items-center gap-2 border-r border-r-grayBorder px-1 sm:flex xl:items-start xl:pr-4">
      {/* Logo */}
      <Link className="rounded-full p-2 text-textPrimary hover:bg-hoverEffect" href="/">
        <AiOutlineAlignLeft className="text-4xl" />
      </Link>

      {/* Links */}
      <nav className="flex flex-col items-center xl:items-start">
        <NavbarLinks.Desktop />

        <Button className="mt-2 w-fit !p-4 xl:mt-5 xl:w-full xl:p-5" color="blue" size="lg">
          <MdCreate className="block text-2xl xl:mr-2 xl:hidden" />
          <p className="hidden xl:block">{t('publish')}</p>
        </Button>
      </nav>

      {/* User Profile */}
      <Link className="mb-5 mt-auto w-full rounded-full p-3 hover:bg-hoverEffect" href="/davipatricio">
        <div className="flex items-center gap-2">
          <img alt="Your profile avatar." className="h-12 w-12 rounded-full" src="https://picsum.photos/48.webp" />
          <div className="hidden w-full flex-col overflow-hidden xl:flex">
            <p className="truncate font-bold text-textPrimary">Davi Patricio</p>
            <p className="text-textSecondary">@davipatricio</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
