'use client';

import styled from 'styled-components';

export const Container = styled.section`
  border-right: 1px solid rgb(47, 51, 54);

  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    border-right: none;
  }
`;
