import Image from 'next/image';

import AuthSideImage from './assets/auth_side_image.jpg';
import { Container } from './styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Image
        alt="Blue sky"
        decoding="async"
        draggable={false}
        loading="lazy"
        placeholder="blur"
        quality={100}
        sizes="70%"
        src={AuthSideImage}
      />

      {children}
    </Container>
  );
}
