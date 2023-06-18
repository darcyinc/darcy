import { Container } from './styles';
import TrendingSearch from './TrendingSearch';

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
