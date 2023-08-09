'use client';

import { PropsWithChildren, useCallback } from 'react';

import Button from '@/components/Button';

interface OAuth2ButtonProps {
  service: 'discord' | 'google' | 'github';
}

const OAuthLinks: Record<OAuth2ButtonProps['service'], string> = {
  discord: process.env.NEXT_PUBLIC_DISCORD_AUTH_URL!,
  google: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!,
  github: process.env.NEXT_PUBLIC_GITHUB_AUTH_URL!
};

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
    <Button className="rounded-md" color="blue" size="lg" type="button" onClick={handleRedirect}>
      {children}
    </Button>
  );
}
