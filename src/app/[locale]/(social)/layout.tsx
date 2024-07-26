export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="grid grid-cols-1 w-full justify-items-start md:justify-items-center lg:px-2 xl:px-10 md:grid-cols-3">{children}</main>;
}
