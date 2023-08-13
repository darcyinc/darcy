'use client';

import { PropsWithChildren, useCallback } from 'react';

import Button from '@/components/Button';
import clsx from 'clsx';

interface OAuth2ButtonProps {
  service: 'discord' | 'google' | 'github';
}

const OAuthLinks: Record<OAuth2ButtonProps['service'], string> = {
  discord: process.env.NEXT_PUBLIC_DISCORD_AUTH_URL!,
  google: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!,
  github: process.env.NEXT_PUBLIC_GITHUB_AUTH_URL!
};

const ButtonStyles: Record<OAuth2ButtonProps['service'], string> = {
  discord: 'bg-indigo-700 !text-white hover:bg-indigo-700/80',
  google: 'bg-white !text-black hover:bg-white/80',
  github: 'bg-neutral-600 !text-white hover:bg-neutral-600/80'
}

export default function OAuth2Button({ service, children }: PropsWithChildren<OAuth2ButtonProps>) {
  const handleRedirect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const randomString = Math.random().toString(36);
      const oauthLink = `${OAuthLinks[service]}&state=${randomString}`;

      sessionStorage.setItem(`oauth2-state:${service}`, randomString);

      window.location.href = oauthLink;
    },
    [service]
  );

  return (
    <Button className={ButtonStyles[service]} color="blue" size="md" type="button" onClick={handleRedirect}>
      {children}
    </Button>
  );
}
