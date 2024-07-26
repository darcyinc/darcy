import DesktopSidebarLinks from './desktop';
import TabletSidebarLinks from './tablet';

export default function SidebarLinks() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopSidebarLinks activeLink="" />
      </div>

      <div className="block lg:hidden">
        <TabletSidebarLinks activeLink="" />
      </div>
    </>
  );
}
