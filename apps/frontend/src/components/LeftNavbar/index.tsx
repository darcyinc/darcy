import {
  HiHome,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineMail,
  HiOutlineUser,
  HiPencilAlt,
  HiSearch,
} from 'react-icons/hi';
import { MdEditNote } from 'react-icons/md';

import Button from '../Button';

import NavbarProfile from './NavbarProfile';
import { Container, NavbarLink } from './styles';

const LINKS = [
  { href: '/', icon: HiHome, label: 'Início', active: true },
  { href: '/search', icon: HiSearch, label: 'Explorar' },
  { href: '/notifications', icon: HiOutlineBell, label: 'Notificações' },
  { href: '/messages', icon: HiOutlineMail, label: 'Mensagens' },
  { href: '/bookmarks', icon: HiOutlineBookmark, label: 'Itens salvos' },
  { href: '/davipatricio', icon: HiOutlineUser, label: 'Perfil' },
];

export default function LeftNavbar() {
  return (
    <Container>
      <NavbarLink href="/">
        <MdEditNote />
      </NavbarLink>

      {LINKS.map(({ href, icon: Icon, label, active }) => (
        <NavbarLink
          key={href}
          href={href}
          $active={active}
          aria-label={`Ir para ${label}`}
        >
          <Icon />
          <span>{label}</span>
        </NavbarLink>
      ))}

      <Button $variant="blue" $size="large">
        <p>Tweetar</p>
        {/* Icon only shown on mobile */}
        <HiPencilAlt />
      </Button>

      <NavbarProfile />
    </Container>
  );
}
