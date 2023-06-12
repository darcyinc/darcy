import FeedHeader from './FeedHeader';
import FeedPost from './FeedPost';
import { Container } from './styles';

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
