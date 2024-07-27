import SidebarLinks from '@/components/sidebar-links';
import AsideTrending from '@/components/trending/desktop';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full mx-auto max-w-screen-xl xl:max-w-screen-2xl">
      <SidebarLinks />
      {children}
      <AsideTrending />
    </div>
  );
}
