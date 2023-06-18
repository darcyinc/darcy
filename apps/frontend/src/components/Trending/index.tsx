import dynamic from 'next/dynamic';

import { Container } from './styles';

const TrendingSearch = dynamic(() => import('./TrendingSearch'));

export default function Trending() {
  return (
    <Container>
      <TrendingSearch />

      <div>
        <h2>Em alta</h2>
        <p>#ReactJS</p>
        <p>#NextJS</p>
        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
      </div>
    </Container>
  );
}
