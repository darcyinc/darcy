import Image from 'next/image';

import AuthSideImage from './assets/auth_side_image.jpg';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex flex-col items-center justify-center
    md:grid md:h-[100vh] md:w-full md:grid-cols-[70%_auto]
    xl:grid-cols-[55%_auto]
    "
    >
      <Image
        alt="Blue sky"
        className="m-h-[100vh] hidden h-full w-full rounded-br rounded-tr md:block"
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
