import React, { PropsWithChildren } from 'react';

interface LayoutProps {
  modals: React.ReactNode;
}

export default function RootLayout({ children, modals }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {modals}
      {children}
    </>
  );
}
