'use client';

import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding-top: 10px;

  width: 100%;
  max-width: 348px;

  > div,
  > form {
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.darkGray};
    padding: 20px;
  }
`;
