import AuthSideImage from '@/assets/images/auth-side-image.jpg';
import { DESCRIPTION } from '@/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Authentication',
    description: DESCRIPTION
  };
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full flex-col items-center justify-center md:grid md:h-screen md:grid-cols-[55%_1fr] md:justify-start xl:grid-cols-[70%_1fr]">
      <Image
        alt="Blue sky"
        className="hidden h-full max-h-screen w-full rounded-r object-cover md:block"
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
