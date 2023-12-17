import Link from 'next/link';

export default function DesktopNavbarProfile() {
  return (
    <Link className="hidden sm:block mt-auto w-full rounded-full p-3 hover:bg-hoverEffect" href="/davipatricio">
      <div className="flex items-center gap-2">
        <img alt="Your profile avatar." className="min-h-10 max-h-12  rounded-full" src="https://picsum.photos/48.webp" />
        <div className="hidden w-full flex-col overflow-hidden xl:flex">
          <p className="truncate font-bold text-textPrimary">Davi Patricio</p>
          <p className="text-textSecondary">@davipatricio</p>
        </div>
      </div>
    </Link>
  );
}
