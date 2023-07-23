'use client';

import { PropsWithChildren, useCallback } from 'react';

interface OAuth2ButtonProps {
  link: string;
  service: string;
}

export default function OAuth2Button({ link, service, children }: PropsWithChildren<OAuth2ButtonProps>) {
  const handleRedirect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const randomString = Math.random().toString(36);
      const oauthLink = `${link}&state=${randomString}`;

      sessionStorage.setItem(`oauth2-state:${service}`, randomString);

      window.location.href = oauthLink;
    },
    [link, service]
  );

  return (
    <button type="button" onClick={handleRedirect}>
      {children}
    </button>
  );
}
