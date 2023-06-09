'use client';

import FeedHeader from './FeedHeader';
import { Container } from './styles';

export default function Feed() {
  return (
    <Container>
      <FeedHeader filter="foryou" onChangeFilter={() => {}} />
    </Container>
  );
}
