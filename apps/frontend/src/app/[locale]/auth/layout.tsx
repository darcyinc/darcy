import Image from 'next/image';

import AuthSideImage from './assets/auth_side_image.jpg';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full flex-col items-center justify-center md:grid md:h-[100vh] md:grid-cols-[55%_1fr] md:justify-start xl:grid-cols-[70%_1fr]">
      <Image
        alt="Blue sky"
        className="hidden h-full max-h-[100vh] w-full rounded-br rounded-tr object-cover md:block"
        decoding="async"
        draggable={false}
        loading="lazy"
        placeholder="blur"
        quality={100}
        sizes="70%"
        src={AuthSideImage}
      />

      {children}
    </main>
  );
}
