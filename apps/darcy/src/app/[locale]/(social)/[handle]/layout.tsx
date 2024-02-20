import { prisma } from '@/utils/api/prisma';
import { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';

interface LayoutProps {
  modals: React.ReactNode;
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: PropsWithChildren<LayoutProps>): Promise<Metadata> {
  const user = await prisma.user.findFirst({
    where: {
      handle: params.handle
    }
  });

  if (!user)
    return {
      title: 'Not found',
      robots: {
        index: false
      }
    };

  return {
    title: `${user.displayName} (@${params.handle})`,
    description: `See ${params.handle} posts on Darcy. ${user.bio}`,
    keywords: [params.handle, user.displayName, 'darcy', 'social network', 'darcy social network'],
    robots: {
      index: true
    }
  };
}

export default function RootLayout({ children, modals }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {modals}
      {children}
    </>
  );
}
