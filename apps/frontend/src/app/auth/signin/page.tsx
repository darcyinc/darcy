import { Metadata } from 'next';
import Image from 'next/image';

import Button from '@/components/Button';
import Divider from '@/components/Divider';

import AuthSideImage from '../assets/auth_sideimage.jpg';
import { Container, Form } from '../styles';

export const metadata: Metadata = {
  title: 'Login | Darcy',
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function SignInPage() {
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

      <Form>
        <h1>Bem-vindo(a) de volta!</h1>
        <p>Insira seus dados para se autenticar na Darcy.</p>

        <label>
          <input
            type="email"
            placeholder="E-mail"
            autoComplete="on"
            maxLength={255}
          />
        </label>

        <Button type="submit" $size="large" $variant="blue">
          Enviar link de autenticação
        </Button>

        <Divider text="ou entre com" />
      </Form>
    </Container>
  );
}
