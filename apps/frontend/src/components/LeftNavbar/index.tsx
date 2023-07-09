import { useTranslations } from 'next-intl';
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

export default function LeftNavbar() {
  const t = useTranslations('Navbar');

  const LINKS = [
    { href: '/', icon: HiHome, active: true, label: t('home') },
    { href: '/search', icon: HiSearch, label: t('explore') },
    { href: '/notifications', icon: HiOutlineBell, label: t('notifications') },
    { href: '/messages', icon: HiOutlineMail, label: t('messages') },
    { href: '/bookmarks', icon: HiOutlineBookmark, label: t('bookmarks') },
    { href: '/davipatricio', icon: HiOutlineUser, label: t('profile') },
  ];

  return (
    <Container>
      <NavbarLink href="/">
        <MdEditNote />
      </NavbarLink>

      {LINKS.map(({ href, icon: Icon, label, active }) => (
        <NavbarLink $active={active} aria-label={`Ir para ${label}`} href={href} key={href}>
          <Icon />
          <span>{label}</span>
        </NavbarLink>
      ))}

      <Button $size="large" $variant="blue">
        <p>{t('publish')}</p>
        {/* Icon only shown on mobile */}
        <HiPencilAlt />
      </Button>

      <NavbarProfile />
    </Container>
  );
}
