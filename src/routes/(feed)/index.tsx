import { lazy } from 'solid-js';
import './globals.css';

const Feed = lazy(() => import('~/components/Feed'));
const ValidUserCheck = lazy(() => import('~/components/ValidUserCheck'));

export default function Home() {
  return (
    <>
      <ValidUserCheck redirectToIfNotLogged="/auth/sign_in" />
      <Feed />
    </>
  );
}
