import clsx from 'clsx';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HiHome, HiOutlineBell, HiOutlineBookmark, HiOutlineMail, HiOutlineUser, HiPencilAlt, HiSearch } from 'react-icons/hi';
import { MdEditNote } from 'react-icons/md';

import Button from '../Button';

import NavbarProfile from './NavbarProfile';

export default function LeftNavbar() {
  const t = useTranslations('Navbar');

  const LINKS = [
    { href: '/', icon: HiHome, active: true, label: t('home') },
    { href: '/search', icon: HiSearch, label: t('explore') },
    { href: '/notifications', icon: HiOutlineBell, label: t('notifications') },
    { href: '/messages', icon: HiOutlineMail, label: t('messages') },
    { href: '/bookmarks', icon: HiOutlineBookmark, label: t('bookmarks') },
    { href: '/davipatricio', icon: HiOutlineUser, label: t('profile') }
  ];

  return (
    <nav
      className={clsx(
        'sticky left-0 top-0 flex h-full w-fit flex-col items-center border-r border-grayBorder pb-4 pl-5 pr-5 pt-2.5',
        'md:items-start md:gap-0.5 md:p-2.5',
        'xl:w-fit-content xl:pl-16'
      )}
    >
      <Link className={clsx('flex w-fit items-center gap-3 rounded-full p-2 text-textPrimary hover:bg-hoverEffect xl:p-4')} href="/">
        <MdEditNote className="text-2xl" />
      </Link>

      {LINKS.map(({ href, icon: Icon, label, active }) => (
        <Link
          className={clsx(
            'flex w-fit items-center gap-3 rounded-full p-2 text-textPrimary hover:bg-hoverEffect hover:no-underline xl:p-4',
            active && 'font-bold'
          )}
          aria-label={`Ir para ${label}`}
          href={href}
          key={href}
        >
          <Icon className="text-2xl" />
          <span className="hidden text-xl xl:block">{label}</span>
        </Link>
      ))}

      <Button className="mt-4 h-[53px] w-[53px] xl:w-full" size="large" variant="blue">
        <p className="hidden xl:block">{t('publish')}</p>
        <HiPencilAlt className="block xl:hidden" />
      </Button>

      <NavbarProfile />
    </nav>
  );
}
