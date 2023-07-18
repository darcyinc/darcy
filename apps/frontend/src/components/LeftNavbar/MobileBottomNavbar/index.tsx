import { LINKS } from '@/util/constants';
import clsx from 'clsx';
import Link from 'next/link';

export default function MobileBottomNavbar() {
  return (
    <footer className="fixed bottom-0 left-0 flex h-14 w-full items-center justify-between border-t border-grayBorder bg-background/80 px-6 py-2 backdrop-blur-sm md:justify-between">
      {LINKS.map(({ href, icon: Icon, active, label }) => (
        <Link aria-label={`Ir para ${label}`} className="text-textPrimary" href={href} key={href}>
          <Icon className={clsx('h-7 w-7', active && 'fill-blue')} />
        </Link>
      ))}
    </footer>
  );
}
