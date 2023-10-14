import { NavbarLinks } from './NavbarLinks';

export default function MobileNavbar() {
  return (
    <div className="sticky bottom-0 w-full border-t border-t-grayBorder p-1 sm:hidden bg-black/80  backdrop-blur-md">
      <nav className="flex items-center justify-evenly xl:items-start">
        <NavbarLinks.Mobile />
      </nav>
    </div>
  );
}
