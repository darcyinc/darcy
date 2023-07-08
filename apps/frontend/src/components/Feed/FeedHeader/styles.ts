'use client';

import styled from 'styled-components';

export const Container = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  width: 100%;

  > h3 {
    padding: 15px 20px 15px;
    user-select: none;
  }

  > button {
    position: relative;
    cursor: pointer;

    border: none;
    background-color: transparent;

    font-size: 1rem;

    width: 50%;

    &:hover {
      background-color: ${({ theme }) => theme.effects.hover};
    }

    > div {
      color: ${({ theme }) => theme.text.secondary};
      margin: auto;
      width: fit-content;

      &:has(.divider) {
        color: ${({ theme }) => theme.text.primary};
        font-weight: bold;
        font-size: 1.05rem;
      }

      &:not(:has(.divider)) {
        height: 44px;
      }

      > span {
        line-height: 40px;
      }

      .divider {
        display: block;
        background-color: ${({ theme }) => theme.colors.blue};
        border-radius: 2px;
        height: 4px;
      }
    }
  }
`;
