import Link from 'next/link';

export default function NavbarProfile() {
  return (
    <Link
      className="mt-auto flex cursor-pointer items-center justify-center gap-3 rounded-full hover:bg-hoverEffect hover:no-underline xl:p-3"
      href="/davipatricio"
    >
      <img alt="Profile" className="h-10 w-10 rounded-full" decoding="async" loading="lazy" src="https://via.placeholder.com/40" />

      <div className="hidden xl:block">
        <p className="font-bold text-textPrimary">Davi Patricio</p>
        <span className="text-textSecondary">@davipatricio</span>
      </div>
    </Link>
  );
}
