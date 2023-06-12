'use client';

import styled from 'styled-components';

export const Container = styled.section`
  border-right: 1px solid ${({ theme }) => theme.colors.grayBorder};

  max-width: 600px;

  @media (max-width: 680px) {
    border-right: none;
  }

  @media (max-width: 500px) {
    padding-bottom: 48px;
  }
`;
