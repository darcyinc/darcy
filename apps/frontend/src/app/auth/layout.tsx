import Image from 'next/image';

import AuthSideImage from './assets/auth_sideimage.jpg';
import { Container } from './styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Image
        src={AuthSideImage}
        alt="Blue sky"
        decoding="async"
        loading="lazy"
        quality={100}
        draggable={false}
        placeholder="blur"
        sizes="70%"
      />

      {children}
    </Container>
  );
}
