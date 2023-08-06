import NavbarLinks from './NavbarLinks';

export default function AsideNavbar() {
  return (
    <div className="hidden w-full max-w-[275px] flex-col items-center px-1 sm:flex">
      {/* Logo */}
      <div></div>

      {/* Links */}
      <nav className="">
        <NavbarLinks />

        <button type="button">
          <p className="hidden xl:block">Publicar</p>
        </button>
      </nav>

      {/* User Profile */}
      <div></div>
    </div>
  );
}
