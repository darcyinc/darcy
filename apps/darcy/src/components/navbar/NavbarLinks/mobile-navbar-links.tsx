import Link from 'next/link';
import { MdHome, MdMail, MdMailOutline, MdNotifications, MdNotificationsNone, MdSearch } from 'react-icons/md';

const MobileLinks = [
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

export default function MobileNavbarLinks() {
  return MobileLinks.map((link) => (
    <Link className="flex w-fit items-center rounded-full p-3 text-textPrimary hover:bg-hoverEffect" href={link.href} key={link.i18nName}>
      <link.Icon className="h-7 w-7" />
    </Link>
  ));
}
