import { NavbarLinks } from './NavbarLinks';

export default function MobileNavbar() {
  return (
    <div className="absolute bottom-0 w-full border-t border-t-grayBorder p-1 sm:hidden">
      <nav className="flex items-center justify-evenly xl:items-start">
        <NavbarLinks.Mobile />
      </nav>
    </div>
  );
}
