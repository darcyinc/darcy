'use client';

import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px !important;
  border: 1px solid transparent;
  border-radius: 30px !important;

  > svg {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 1.25rem;
    margin-left: 8px;
  }

  > input[type='text'] {
    appearance: none;
    background: none;
    border: none;
    outline: 0;
    font-size: 0.95rem;
    width: 100%;
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.blue};
    background-color: transparent;
  }

  &:has(input:not(:placeholder-shown)) {
    > button.clear-icon {
      opacity: 1;
      visibility: visible;
    }
  }

  > button.clear-icon {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;
    visibility: hidden;

    appearance: none;
    background-color: ${({ theme }) => theme.colors.blue};
    border: none;
    border-radius: 50%;

    padding: 2px;

    height: 20px;
    width: 20px;

    &:hover {
      opacity: 0.8 !important;
    }

    > svg {
      color: ${({ theme }) => theme.text.primary};
      font-size: 1.1rem;
    }
  }
`;
