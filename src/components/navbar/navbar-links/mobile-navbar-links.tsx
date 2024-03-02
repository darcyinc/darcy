import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DesktopLinks } from './desktop-navbar-links';

const links = DesktopLinks.slice(0, 4);

export default function MobileNavbarLinks() {
  return links.map((link) => (
    <Link href={link.href} key={link.i18nName}>
      <Button variant="ghost" className="p-3 py-6 rounded-full">
        <link.Icon className="h-7 w-7" />
      </Button>
    </Link>
  ));
}
