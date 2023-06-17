import Link from 'next/link';
import { HiHome, HiOutlineBell, HiOutlineMail, HiSearch } from 'react-icons/hi';

import { Wrapper } from './styles';

const LINKS = [
  { href: '/', icon: HiHome, active: true },
  { href: '/search', icon: HiSearch },
  { href: '/notifications', icon: HiOutlineBell },
  { href: '/messages', icon: HiOutlineMail },
];

export default function MobileBottomNavbar() {
  return (
    <Wrapper>
      {LINKS.map(({ href, icon: Icon, active }) => (
        <Link href={href} key={href} data-active={active}>
          <Icon />
        </Link>
      ))}
    </Wrapper>
  );
}
