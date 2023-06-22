'use client';

import styled from 'styled-components';

export const MainWrapper = styled.main`
  display: grid;
  grid-template-columns: minmax(auto, 600px) 1fr;
  gap: 2vw;

  @media (max-width: 768px) {
    grid-template-columns: minmax(auto, 600px);
  }
`;
