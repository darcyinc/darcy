'use client';

import styled from 'styled-components';

export const Container = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  width: 100%;

  > h3 {
    padding: 10px;
  }

  > button {
    position: relative;
    cursor: pointer;

    border: none;
    background-color: transparent;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-size: 1rem;

    height: 50px;
    width: 50%;

    color: ${({ theme }) => theme.text.secondary};

    &:has(.divider) {
      color: ${({ theme }) => theme.text.primary};
      font-weight: bold;
      font-size: 1.05rem;
    }

    &:hover {
      background-color: ${({ theme }) => theme.effects.hover};
    }

    .divider {
      display: block;
      background-color: ${({ theme }) => theme.colors.blue};
      border-radius: 2px;
      height: 4px;

      position: absolute;
      bottom: 0;
    }
  }
`;
