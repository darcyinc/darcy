'use client';

import useSignup from '@/api/mutations/use-signup';
import useUser from '@/api/queries/use-user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ArrowRight, Eye, EyeOff, Mail, RectangleEllipsis, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'sonner';
import { type AuthFormFields, type AuthFormFieldsErrors, type AuthFormFieldsValues, validateField } from './_utils';

export default function SignupPageComponent() {
  const router = useRouter();
  const mutation = useSignup();
  const user = useUser();
  const { setCurrentUser } = useCurrentUser();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations('AuthPage.Signup');
  const genericT = useTranslations('AuthPage.Generic');
  const validationsTranslate = useTranslations('AuthPage.Validations');

  const [values, setValues] = useState<AuthFormFieldsValues>({});
  const [errors, setErrors] = useState<AuthFormFieldsErrors>({});

  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleFieldChange = (field: AuthFormFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    validateField({ field, t: validationsTranslate, setErrors, value: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha();

    mutation
      .trigger({ ...(values as Required<AuthFormFieldsValues>), captchaToken: token })
      .then((data) => {
        localStorage.setItem('_DO_NOT_SHARE_access-token', data.access_token);
        localStorage.setItem('_DO_NOT_SHARE_refresh-token', data.refresh_token);

        user.mutate().then((userData) => {
          if (!userData) return;

          setCurrentUser({ ...userData, _ready: true });
          router.replace('/');
        });
      })
      .catch((error) => {
        switch (error.message) {
          case 'email_already_in_use':
          case 'incorrect_captcha_or_timeout':
            toast.error(`Errors.${genericT(error.message)}`);
            break;
          default:
            toast.error('Erro ao tentar realizar autenticação');
            break;
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-2 group/form mx-auto w-full max-w-md"
      style={{
        animation: 'appear 1s ease-in-out'
      }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">{t('friendlyTitle')}</h1>

      <div className="flex flex-col gap-4 mt-2 w-full">
        <div>
          <label
            data-invalid={values.fullName ? Boolean(errors.fullName) : ''}
            className={
              'input border input-bordered flex items-center gap-2 data-[invalid="true"]:!input-error data-[invalid="false"]:!input-success'
            }
          >
            <UserRound className="size-5" />
            <input
              type="text"
              className="grow"
              placeholder={genericT('fullName')}
              value={values.fullName}
              onChange={handleFieldChange('fullName')}
              maxLength={100}
              minLength={3}
              required
            />
          </label>

          <div className="mt-2 text-red-500">{errors.fullName}</div>
        </div>

        <div>
          <label
            data-invalid={values.email ? Boolean(errors.email) : ''}
            className={
              'input border input-bordered flex items-center gap-2 data-[invalid="true"]:!input-error data-[invalid="false"]:!input-success'
            }
          >
            <Mail className="size-5" />
            <input
              type="email"
              className="grow"
              placeholder={genericT('email')}
              value={values.email}
              onChange={handleFieldChange('email')}
              required
            />
          </label>

          <div className="mt-2 text-red-500">{errors.email}</div>
        </div>

        <div>
          <label
            data-invalid={values.password ? Boolean(errors.password) : ''}
            className={
              'input border input-bordered flex items-center gap-2 data-[invalid="true"]:!input-error data-[invalid="false"]:!input-success'
            }
          >
            <RectangleEllipsis className="size-5" />
            <input
              type={passwordHidden ? 'password' : 'text'}
              className="grow"
              placeholder={genericT('password')}
              value={values.password}
              onChange={handleFieldChange('password')}
              required
            />
            <button type="button" className="cursor-pointer" onClick={() => setPasswordHidden(!passwordHidden)}>
              {passwordHidden && <EyeOff className="size-5 hover:text-zinc-500 active:text-zinc-500 !transition-none !duration-[0]" />}
              {!passwordHidden && <Eye className="size-5 hover:text-zinc-500 active:text-zinc-500 !transition-none !duration-[0]" />}
            </button>
          </label>

          <div className="mt-2 text-red-500">{errors.password}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={Boolean(errors.email || errors.password || mutation.isMutating)}
          className={'btn btn-primary btn-md group/btn group-invalid/form:btn-disabled'}
        >
          {mutation.isMutating && <span className="loading loading-spinner" />}
          {t('action')}
          {!mutation.isMutating && (
            <ArrowRight className={'group-enabled/btn:group-hover/btn:translate-x-2 relative transition-all duration-300'} />
          )}
        </button>

        <p>
          {t.rich('Footer.ExistingUser', {
            link: (chunks) => (
              <Link className="link link-accent link-hover" href="/auth/login">
                {chunks}
              </Link>
            )
          })}
        </p>

        <p className="mt-2 border-t pt-4">
          {genericT.rich('recaptcha', {
            privacylink: (chunks) => (
              <Link className="link link-hover link-accent" href="https://policies.google.com/privacy">
                {chunks}
              </Link>
            ),
            termslink: (chunks) => (
              <Link className="link link-hover link-accent" href="https://policies.google.com/terms">
                {chunks}
              </Link>
            )
          })}
        </p>
      </div>
    </form>
  );
}
