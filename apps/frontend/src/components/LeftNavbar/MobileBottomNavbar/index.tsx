import Link from 'next/link';
import { HiHome, HiOutlineBell, HiOutlineMail, HiSearch } from 'react-icons/hi';

import { Wrapper } from './styles';

const LINKS = [
  { href: '/', icon: HiHome, active: true, label: 'Início' },
  { href: '/search', icon: HiSearch, label: 'Explorar' },
  { href: '/notifications', icon: HiOutlineBell, label: 'Notificações' },
  { href: '/messages', icon: HiOutlineMail, label: 'Mensagens' },
];

export default function MobileBottomNavbar() {
  return (
    <Wrapper>
      {LINKS.map(({ href, icon: Icon, active, label }) => (
        <Link aria-label={`Ir para ${label}`} data-active={active} href={href} key={href}>
          <Icon />
        </Link>
      ))}
    </Wrapper>
  );
}
