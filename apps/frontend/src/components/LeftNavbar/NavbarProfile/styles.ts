'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { maxRounded } from '@/styles/common/maxRounded';

export const Container = styled(Link)`
  ${maxRounded}
  cursor: pointer;
  text-decoration: none !important;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;
  padding: 12px;
  margin-top: auto;

  @media (max-width: 1240px) {
    padding: 0;
  }

  @media (max-width: 1240px) {
    > div.profileInfo {
      display: none;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.effects.hover};
  }

  > img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }

  > div.profileInfo {
    > p {
      color: ${({ theme }) => theme.text.primary};
      font-weight: bold;
    }

    > span {
      color: ${({ theme }) => theme.text.secondary};
    }
  }
`;
