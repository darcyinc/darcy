import { HiHome, HiOutlineBell, HiOutlineMail, HiSearch } from 'react-icons/hi';

export const DESCRIPTION = 'Darcy is an open source social network where you can share your thoughts and opinions with other people.';

export const AUTH_SERVICES_CALLBACK = ['discord', 'github'];

export const LINKS = [
  { href: '/', icon: HiHome, active: true, label: 'Início' },
  { href: '/search', icon: HiSearch, label: 'Explorar' },
  { href: '/notifications', icon: HiOutlineBell, label: 'Notificações' },
  { href: '/messages', icon: HiOutlineMail, label: 'Mensagens' }
];
