import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-4xl font-bold">404</p>
      <h1>User not found.</h1>
      <Link href="/" className="text-primary hover:text-muted-foreground mt-2">
        Return to homepage?
      </Link>
    </div>
  );
}
