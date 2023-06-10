'use client';

import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding-top: 10px;

  color: ${({ theme }) => theme.text.primary};

  width: 100%;
  max-width: 348px;

  @media (max-width: 990px) {
    display: none;
  }

  > div,
  > form {
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.darkGray};
    padding: 20px;
  }
`;
