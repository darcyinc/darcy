import clsx from 'clsx';
import Link from 'next/link';
import { MdHome, MdMail, MdMailOutline, MdNotifications, MdNotificationsNone, MdSearch } from 'react-icons/md';

const DesktopMobileLinks = [
  {
    active: true,
    name: 'Página inicial',
    href: '/',
    Icon: MdHome
  },
  {
    name: 'Explorar',
    href: '/explore',
    Icon: MdSearch
  },
  {
    name: 'Notificações',
    href: '/notifications',
    Icon: MdNotificationsNone,
    ActiveIcon: MdNotifications
  },
  {
    name: 'Mensagens',
    href: '/messages',
    Icon: MdMailOutline,
    ActiveIcon: MdMail
  }
];

export default function NavbarLinks() {
  return DesktopMobileLinks.map((link) => (
    <Link className="flex w-fit items-center rounded-full p-3 text-textPrimary hover:bg-hoverEffect" href={link.href} key={link.name}>
      <link.Icon className="h-7 w-7" />
      <p className={clsx('hidden text-xl xl:ml-5 xl:mr-4 xl:block', link.active && 'font-bold')}>{link.name}</p>
    </Link>
  ));
}
