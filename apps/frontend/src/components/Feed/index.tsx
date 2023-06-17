import dynamic from 'next/dynamic';

import { Container } from './styles';

const FeedHeader = dynamic(() => import('./FeedHeader'));
const FeedPost = dynamic(() => import('./FeedPost'));

export default function Feed() {
  return (
    <Container>
      <FeedHeader filter="foryou" />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Container>
  );
}
