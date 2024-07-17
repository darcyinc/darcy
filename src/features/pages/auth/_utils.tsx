import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/constants';
import type { useTranslations } from 'next-intl';

export type AuthFormFields = 'email' | 'password' | 'fullName';

export type AuthFormFieldsErrors = {
  [key in AuthFormFields]?: string | null;
};

export type AuthFormFieldsValues = {
  [key in AuthFormFields]?: string;
};

interface ValidateFieldOptions {
  field: AuthFormFields;
  value: string;
  t: ReturnType<typeof useTranslations>;
  setErrors: React.Dispatch<React.SetStateAction<AuthFormFieldsErrors>>;
}

export const validateField = ({ field, value, setErrors, t }: ValidateFieldOptions) => {
  setErrors((prev) => ({ ...prev, [field]: null }));

  if (field === 'password') {
    if (value.length < 8) return setErrors((prev) => ({ ...prev, [field]: t('Password.min') }));
    if (!/^.*[A-Z].*$/.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Password.uppercase') }));
    if (!/^.*[a-z].*$/.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Password.lowercase') }));
    if (!/^.*[0-9].*$/.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Password.number') }));
    if (!PASSWORD_REGEX.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Password.special') }));
  }

  if (field === 'email') {
    if (!value) return setErrors((prev) => ({ ...prev, [field]: t('Email.required') }));
    if (!EMAIL_REGEX.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Email.invalid') }));
  }

  if (field === 'fullName') {
    if (!value) return setErrors((prev) => ({ ...prev, [field]: t('Name.required') }));
    if (!/^.{3,}$/.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Name.invalid') }));

    if (!/^.*[a-zA-Z].*$/.test(value)) return setErrors((prev) => ({ ...prev, [field]: t('Name.letter') }));
  }
};
