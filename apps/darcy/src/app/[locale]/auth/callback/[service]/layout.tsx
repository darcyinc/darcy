import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Authenticating...',
  robots: {
    index: false
  }
} as Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
