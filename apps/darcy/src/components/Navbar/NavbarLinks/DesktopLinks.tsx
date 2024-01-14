import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { MdHome, MdMail, MdMailOutline, MdNotifications, MdNotificationsNone, MdSearch } from 'react-icons/md';

interface DesktopLink {
  active?: boolean;
  i18nName: string;
  href: string;
  Icon: IconType;
  ActiveIcon?: IconType;
  requiresAuth?: boolean;
}

const DesktopLinks: DesktopLink[] = [
  {
    active: true,
    i18nName: 'home',
    href: '/',
    Icon: MdHome
  },
  {
    i18nName: 'explore',
    href: '/explore',
    Icon: MdSearch
  },
  {
    i18nName: 'notifications',
    href: '/notifications',
    Icon: MdNotificationsNone,
    ActiveIcon: MdNotifications
  },
  {
    i18nName: 'messages',
    href: '/messages',
    Icon: MdMailOutline,
    ActiveIcon: MdMail
  }
];

export default function DesktopNavbarLinks() {
  const t = useTranslations('Navbar');

  return DesktopLinks.map((link) => (
    <Link className="flex w-fit items-center rounded-full p-3 text-textPrimary hover:bg-hoverEffect" href={link.href} key={link.i18nName}>
      <link.Icon className="h-7 w-7" />
      <p className={clsx('hidden text-xl xl:ml-5 xl:mr-4 xl:block', link.active && 'font-bold')}>{t(link.i18nName)}</p>
    </Link>
  ));
}
