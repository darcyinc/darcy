import Button from '../Button';
import NavbarProfile from './NavbarProfile';
import { Container, NavbarLink } from './styles';
import {
  HiBell,
  HiHome,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineMail,
  HiOutlineUser,
  HiSearch,
} from 'react-icons/hi';
import { MdEditNote } from 'react-icons/md';

export default function LeftNavbar() {
  return (
    <Container>
      <NavbarLink href="/">
        <MdEditNote />
      </NavbarLink>

      <NavbarLink active href="/">
        <HiHome />
        <span>Início</span>
      </NavbarLink>
      <NavbarLink href="/search">
        <HiSearch />
        <span>Explorar</span>
      </NavbarLink>
      <NavbarLink href="/search">
        <HiOutlineBell />
        <span>Notificações</span>
      </NavbarLink>
      <NavbarLink href="/messages">
        <HiOutlineMail />
        <span>Mensagens</span>
      </NavbarLink>
      <NavbarLink href="/bookmarks">
        <HiOutlineBookmark />
        <span>Itens salvos</span>
      </NavbarLink>
      <NavbarLink href="/davipatricio">
        <HiOutlineUser />
        <span>Perfil</span>
      </NavbarLink>

      <Button $variant="blue" $size="large">
        Tweetar
      </Button>

      <NavbarProfile />
    </Container>
  );
}
