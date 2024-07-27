import DesktopSidebarLinks from './desktop';
import TabletSidebarLinks from './tablet';

export default function SidebarLinks() {
  return (
    <>
      <div className="hidden w-fit lg:block">
        <DesktopSidebarLinks activeLink="" />
      </div>

      <div className="block w-fit lg:hidden">
        <TabletSidebarLinks activeLink="" />
      </div>
    </>
  );
}
