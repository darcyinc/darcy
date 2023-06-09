'use client';

import styled from 'styled-components';

export const Container = styled.section`
  padding-top: 20px;

  width: 100%;
  max-width: 348px;

  @media (max-width: 990px) {
    display: none;
  }

  > div {
    border-radius: 16px;
    background-color: rgb(22, 24, 28);
    padding: 20px;
  }
`;
