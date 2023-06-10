'use client';

import styled, { css } from 'styled-components';
import { ButtonProps } from '.';
import { maxRounded } from '@/styles/maxRounded';

export const Container = styled.button<ButtonProps>`
  ${maxRounded}
  appearance: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 1.15rem;
  text-transform: capitalize;

  &:hover {
    opacity: 0.9;
  }

  &[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }

  background-color: ${({ theme, $variant }) =>
    $variant === 'blue' ? theme.colors.blue : '#fff'};
  color: ${({ $variant }) => ($variant === 'blue' ? '#fff' : '#000')};
  padding: ${({ $size }) => ($size === 'large' ? '15px' : '9px')} 0;
`;
