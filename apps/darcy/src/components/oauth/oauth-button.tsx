'use client';

import { cn } from '@/lib/utils';
import { DISCORD_AUTH_URL, GITHUB_AUTH_URL } from '@/utils/api/auth/oauth/data';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

interface OAuth2ButtonProps {
  service: 'discord' | 'google' | 'github';
}

const Services = {
  discord: {
    link: DISCORD_AUTH_URL,
    styles: '!bg-indigo-700 !text-white hover:!bg-indigo-700/80',
    Icon: BsDiscord
  },
  google: {
    // TODO: replace in the future
    link: '',
    styles: '!bg-white !text-black hover:!bg-white/80',
    Icon: FcGoogle
  },
  github: {
    link: GITHUB_AUTH_URL,
    styles: '!bg-neutral-600 !text-white hover:!bg-neutral-600/80',
    Icon: BsGithub
  }
};

export default function OAuthButton({ service, children }: PropsWithChildren<OAuth2ButtonProps>) {
  const router = useRouter();
  const serviceData = Services[service];

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const randomString = Math.random().toString(36);
    const oauthLink = `${serviceData.link}&state=${randomString}`;

    sessionStorage.setItem(`oauth2-state:${service}`, randomString);
    router.push(oauthLink);
  };

  return (
    <Button className={cn('rounded-full font-bold text-lg w-full gap-2', serviceData.styles)} onClick={handleRedirect}>
      <serviceData.Icon className="h-6 w-6" />
      {children}
    </Button>
  );
}
