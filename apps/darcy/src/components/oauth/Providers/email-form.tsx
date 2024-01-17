'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/components/button';

interface EmailFormProps {
  error?: string;
}

const EMAIL_REGEX = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/;

interface AuthFormData {
  submitting: boolean;
  email: string;
  showPastError: boolean;
  validationError?: string;
}

export default function EmailForm({ error }: EmailFormProps) {
  const t = useTranslations('Auth.AuthErrors');
  const [authData, setAuthData] = useState<AuthFormData>({
    submitting: false,
    email: '',
    showPastError: Boolean(error),
    validationError: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authData.submitting) return;
    setAuthData((prev) => ({ ...prev, submitting: true, validationError: '' }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData((prev) => ({
      ...prev,
      email: e.target.value,
      showPastError: false,
      validationError: ''
    }));

    if (!EMAIL_REGEX.test(e.target.value)) {
      setAuthData((prev) => ({ ...prev, validationError: 'invalid_email' }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-1 w-full">
        <input
          required
          autoComplete="on"
          className="w-full rounded-2xl border bg-transparent p-2.5 text-sm outline-none placeholder:text-muted-foreground valid:border-border invalid:border-error invalid:placeholder-shown:border-border focus:border-blue disabled:bg-slate-600/10 disabled:text-muted-foreground disabled:hover:cursor-not-allowed"
          disabled={authData.submitting}
          maxLength={255}
          pattern={EMAIL_REGEX.source}
          placeholder="E-mail"
          type="email"
          value={authData.email}
          onChange={handleEmailChange}
        />

        {authData.showPastError && error && (
          <p className="mt-2.5 text-error">
            <span className="font-bold">{t('error_while_auth')}</span> {t(error)}
          </p>
        )}

        {authData.validationError && <p className="mt-2.5 text-error">{t(authData.validationError)}</p>}
      </label>

      <Button
        className="my-2.5"
        color="blue"
        disabled={!!authData.validationError || authData.email.length === 0}
        loading={authData.submitting}
        size="lg"
        type="submit"
      >
        <p className="text-lg font-semibold">Enviar link de autenticação</p>
      </Button>
    </form>
  );
}
