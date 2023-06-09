'use client';

import { maxRounded } from '@/styles/maxRounded';
import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Link)`
  ${maxRounded}
  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;
  padding: 12px;
  margin-top: auto;

  @media (max-width: 1240px) {
    padding: 0;
  }

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }

  > img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }

  > div {
    > p {
      color: #fff;
      font-weight: bold;
    }

    > span {
      color: rgb(113, 118, 123);
    }
  }

  @media (max-width: 1240px) {
    > div {
      display: none;
    }
  }
`;
