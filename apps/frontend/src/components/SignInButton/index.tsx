'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

import GithubSignInButton from './GithubSignInButton';
import GoogleSignInButton from './GoogleSignInButton';

interface SignInButtonProps {
  provider: 'github' | 'google';
}

const providers = {
  github: GithubSignInButton,
  google: GoogleSignInButton,
};

export default function SignInButton({
  provider,
}: SignInButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
  const { data: session } = useSession();
  const SignInButton = providers[provider];

  if (session) {
    return (
      <>
        Signed in as {session.user?.email}
        <br />
        <SignInButton onClick={() => signOut()}>Sign out</SignInButton>
      </>
    );
  }
  return (
    <>
      Not signed in {provider}
      <br />
      <SignInButton onClick={() => signIn(provider)}>Sign in</SignInButton>
    </>
  );
}
