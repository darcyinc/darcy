import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Bell, Home, LucideIcon, Mail, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface DesktopLink {
  active?: boolean;
  i18nName: string;
  href: string;
  Icon: LucideIcon;
  requiresAuth?: boolean;
}

export const DesktopLinks: DesktopLink[] = [
  {
    active: true,
    i18nName: 'home',
    href: '/',
    Icon: Home
  },
  {
    i18nName: 'explore',
    href: '/explore',
    Icon: Search
  },
  {
    i18nName: 'notifications',
    href: '/notifications',
    Icon: Bell
  },
  {
    i18nName: 'messages',
    href: '/messages',
    Icon: Mail
  }
];

export default function DesktopNavbarLinks() {
  const t = useTranslations('Navbar');

  return DesktopLinks.map((link) => (
    <Link href={link.href} key={link.i18nName}>
      <Button variant="ghost" className="p-3 py-6 rounded-full">
        <link.Icon size={24} />
        <p className={clsx('hidden text-xl xl:ml-2 xl:block', link.active && 'font-bold')}>{t(link.i18nName)}</p>
      </Button>
    </Link>
  ));
}
