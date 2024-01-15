import React, { PropsWithChildren } from 'react';

interface LayoutProps {
  followers: React.ReactNode;
  following: React.ReactNode;
}

export default function RootLayout({ children, followers, following }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {followers}
      {following}
      {children}
    </>
  );
}
