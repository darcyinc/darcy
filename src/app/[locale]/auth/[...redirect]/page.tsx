import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Redirect',
  robots: {
    index: false
  }
} as Metadata;

export default function Home() {
  redirect('/auth');
}
