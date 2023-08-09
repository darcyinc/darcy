import Image from 'next/image';
import { PropsWithChildren } from 'react';

import AuthSideImage from '@/assets/images/auth-side-image.jpg';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full flex-col items-center justify-center md:grid md:h-screen md:grid-cols-[55%_1fr] md:justify-start xl:grid-cols-[70%_1fr]">
      <Image
        alt="Blue sky"
        className="hidden h-full max-h-screen w-full rounded-br rounded-tr object-cover md:block"
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
