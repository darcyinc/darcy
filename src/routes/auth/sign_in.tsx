import { useNavigate } from '@solidjs/router';
import { createMemo, createSignal, lazy } from 'solid-js';
import { A, Style, Title } from 'solid-start';
import {
  ActionsContainer,
  AuthButtonContainer,
  AuthContainer,
  Button,
  CardContainer,
  FormContainer,
  FormFieldContainer,
  LogoContainer,
  PageContainer,
  SpanDivider,
} from './styles';
import FacebookLogo from '~/assets/facebook-logo-signin.png?webp&w=30&h=30&imagetools';
import GoogleLogo from '~/assets/google-logo-signin.png?webp&w=30&h=30&imagetools';
import DarcyLogo from '~/assets/logo-cropped.png?webp&w=80&h=80&imagetools';
import type { SyntheticEvent } from '~/types/imagetools';
import emailRegex from '~/utils/emailRegex';

const ValidUserCheck = lazy(() => import('~/components/ValidUserCheck'));

export interface LoginData {
  email: string;
  errors?: {
    email?: string;
    password?: string;
  };

  password: string;
}

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = createSignal<LoginData>({
    email: '',
    password: '',
  });

  const hasValidationErrors = createMemo(() =>
    Boolean(data().errors?.email ?? data().errors?.password)
  );

  const handleValidations = () => {
    // Cleanup errors
    setData((prev) => ({ ...prev, errors: {} }));

    // Email validation
    if (data().email.length === 0)
      return setData((prev) => ({
        ...prev,
        errors: { email: 'O campo email é obrigatório.' },
      }));

    if (!emailRegex().test(data().email))
      return setData((prev) => ({
        ...prev,
        errors: { email: 'O campo email deve ser um email válido.' },
      }));

    // Password validation
    if (data().password.length === 0)
      return setData((prev) => ({
        ...prev,
        errors: { password: 'O campo senha é obrigatório.' },
      }));

    if (data().password.length < 8)
      return setData((prev) => ({
        ...prev,
        errors: { password: 'A senha deve ter no mínimo 8 caracteres.' },
      }));
  };

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
    handleValidations();
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasValidationErrors()) return;

    try {
      const doUserLogin = (await import('~/api/doUserLogin')).default;
      const res = await doUserLogin({
        email: data().email,
        password: data().password,
      });

      if (res.errors?.[0]) {
        setData((prev) => ({
          ...prev,
          errors: {
            email: res.errors[0].message,
            password: res.errors[0].message,
          },
        }));
        return;
      }

      localStorage.setItem('token', res.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch {
      setData((prev) => ({
        ...prev,
        errors: {
          email: 'Ocorreu um erro ao tentar se autenticar.',
          password: 'Ocorreu um erro ao tentar se autenticar.',
        },
      }));
    }
  };

  return (
    <PageContainer>
      <Title>Darcy - Login</Title>
      <ValidUserCheck redirectToIfLogged="/" navigate={navigate} />

      <Style>
        {`
        body {
          background-color: #191b22;
        }
  `}
      </Style>

      <CardContainer>
        <LogoContainer>
          <img
            alt="Logo"
            decoding="async"
            draggable={false}
            height={72}
            src={DarcyLogo}
            width={80}
          />
          <span>Darcy</span>
        </LogoContainer>

        <AuthContainer>
          <AuthButtonContainer data-provider="google">
            <img
              decoding="async"
              draggable={false}
              src={GoogleLogo}
              alt="Google Logo"
              height={30}
              width={30}
            />
            <span>Entrar com Google</span>
          </AuthButtonContainer>

          <AuthButtonContainer data-provider="facebook">
            <img
              decoding="async"
              draggable={false}
              src={FacebookLogo}
              alt="React Logo"
              height={30}
              width={30}
            />
            <span>Entrar com Facebook</span>
          </AuthButtonContainer>
        </AuthContainer>

        <SpanDivider>ou</SpanDivider>

        <FormContainer onSubmit={handleSubmit}>
          <FormFieldContainer>
            <input
              id="email"
              name="email"
              onInput={handleInput}
              placeholder="E-mail"
              type="email"
              value={data().email}
            />

            <label for="email">{data().errors?.email}</label>
          </FormFieldContainer>

          <FormFieldContainer>
            <input
              id="password"
              name="password"
              onInput={handleInput}
              placeholder="Senha"
              type="password"
              value={data().password}
            />

            <label for="password">{data().errors?.password}</label>
          </FormFieldContainer>

          <ActionsContainer>
            <Button
              disabled={
                Boolean(hasValidationErrors()) ||
                data().email.length === 0 ||
                data().password.length === 0 ||
                data().password.length < 8 ||
                !data().email.includes('@')
              }
              type="submit"
            >
              Acessar sua conta
            </Button>

            <span>
              <A href="/auth/sign_up">Criar conta</A>
              {' - '}
              <A href="#forgot_password">Esqueceu sua senha?</A>
            </span>
          </ActionsContainer>
        </FormContainer>
      </CardContainer>
    </PageContainer>
  );
}
