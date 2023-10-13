'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/components/Button';

interface EmailFormProps {
  error?: string;
}

const EMAIL_REGEX = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/;

export default function EmailForm({ error }: EmailFormProps) {
  const t = useTranslations('Auth.AuthErrors');
  const [showPastError, setShowPastError] = useState(Boolean(error));
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setValidationError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationError('');
    setShowPastError(false);

    if (!EMAIL_REGEX.test(e.target.value)) {
      return setValidationError('invalid_email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-1 w-full">
        <input
          required
          autoComplete="on"
          className="w-full rounded-2xl border bg-transparent p-2.5 text-sm outline-none placeholder:text-textSecondary valid:border-grayBorder invalid:border-error invalid:placeholder-shown:border-grayBorder focus:border-blue disabled:bg-slate-600/10 disabled:text-textSecondary disabled:hover:cursor-not-allowed"
          disabled={loading}
          maxLength={255}
          pattern={EMAIL_REGEX.source}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />

        {showPastError && error && (
          <p className="mt-2.5 text-error">
            <span className="font-bold">{t('error_while_auth')}</span> {t(error)}
          </p>
        )}

        {validationError && <p className="mt-2.5 text-error">{t(validationError)}</p>}
      </label>

      <Button
        className="my-2.5"
        color="blue"
        disabled={loading || !!validationError || email.length === 0}
        loading={loading}
        size="lg"
        type="submit"
      >
        <p className="text-lg font-semibold">Enviar link de autenticação</p>
      </Button>
    </form>
  );
}
