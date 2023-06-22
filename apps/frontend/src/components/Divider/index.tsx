'use client';

import styled, { css } from 'styled-components';

interface BaseDividerProps {
  $addMargin: boolean;
}

const BaseDivider = styled.span<BaseDividerProps>`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 2px;
  user-select: none;
  width: 100%;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grayBorder};
  }

  ${({ $addMargin }) =>
    $addMargin &&
    css`
      &::before {
        margin-right: 8px;
      }

      &::after {
        margin-left: 8px;
      }
    `}
`;

interface DividerProps {
  text?: string;
}

export default function Divider({ text }: DividerProps) {
  return <BaseDivider $addMargin={Boolean(text)}>{text}</BaseDivider>;
}
