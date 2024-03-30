import { apiClient } from '@/api/client';
import type { GetUserResponse } from '@/types/api/user';
import type { Metadata } from 'next';
import type React from 'react';
import type { PropsWithChildren } from 'react';

interface LayoutProps {
  modals: React.ReactNode;
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: PropsWithChildren<LayoutProps>): Promise<Metadata> {
  try {
    const request = await apiClient.get(`users/${params.handle}`);
    const data = (await request.json()) as GetUserResponse;

    return {
      title: `${data.displayName} (@${params.handle})`,
      description: `See ${params.handle} posts on Darcy. ${data.bio}`,
      keywords: [params.handle, data.displayName, 'darcy', 'social network', 'darcy social network'],
      robots: {
        index: true
      }
    };
  } catch {
    return {
      title: 'Not found',
      robots: {
        index: false
      }
    };
  }
}

export default function RootLayout({ children, modals }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {modals}
      {children}
    </>
  );
}
