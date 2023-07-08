'use client';

import styled from 'styled-components';

export const ProfileHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  padding: 15px 20px 15px;
  width: 100%;

  > h3 {
    color: ${({ theme }) => theme.text.primary};
  }

  > p {
    color: ${({ theme }) => theme.text.secondary};
  }
`;
