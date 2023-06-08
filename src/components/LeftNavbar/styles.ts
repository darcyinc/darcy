'use client';

import { maxRounded } from '@/styles/maxRounded';
import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;

  border-right: 1px solid rgb(47, 51, 54);
  padding: 10px;

  width: fit-content;

  /* Tweet button */
  > button {
    margin-top: 15px;
  }
`;

export const NavbarLink = styled(Link)<{ active?: boolean }>`
  ${maxRounded}

  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;

  color: #fff;
  text-decoration: none;

  width: fit-content;

  ${(props) => props.active && `font-weight: bold;`}

  > svg {
    height: 26px;
    width: 26px;
  }

  > span {
    font-size: 20px;
  }

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;
