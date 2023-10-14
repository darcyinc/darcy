import { NavbarLinks } from './NavbarLinks';

export default function MobileNavbar() {
  return (
    <div className="sticky bottom-0 w-full border-t border-t-grayBorder bg-black/80 p-1 backdrop-blur-md sm:hidden">
      <nav className="flex items-center justify-evenly xl:items-start">
        <NavbarLinks.Mobile />
      </nav>
    </div>
  );
}
