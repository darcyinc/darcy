'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { maxRounded } from '@/styles/common/maxRounded';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-right: 1px solid ${({ theme }) => theme.colors.grayBorder};
  padding: 10px 20px 15px 40px;

  height: 100%;
  width: fit-content;

  position: sticky;
  top: 0;
  left: 0;

  @media (min-width: 1400px) {
    padding-left: 70px;
  }

  @media (max-width: 950px) {
    padding-left: 20px;
  }

  @media (max-width: 1240px) {
    align-items: center;
    gap: 4px;
    padding: 10px;
  }

  /* Tweet button */
  > button {
    margin-top: 15px;
    width: 100%;

    > svg {
      display: none;
    }

    @media (max-width: 1240px) {
      height: 53px;
      width: 53px;

      > svg {
        display: block;
      }

      > p {
        display: none;
      }
    }
  }
`;

export const NavbarLink = styled(Link)<{ $active?: boolean }>`
  ${maxRounded}

  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;

  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;

  width: fit-content;

  ${({ $active }) => $active && `font-weight: bold;`}

  > svg {
    height: 26px;
    width: 26px;
  }

  > span {
    font-size: 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.effects.hover};
  }

  @media (max-width: 1240px) {
    padding: 10px;
    width: fit-content;

    > span {
      display: none;
    }
  }
`;
