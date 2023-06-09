'use client';

import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px !important;
  border: 1px solid transparent;
  border-radius: 30px !important;

  > svg {
    color: rgb(113, 118, 123);
    font-size: 1.25rem;
  }

  > input[type='text'] {
    appearance: none;
    background-color: transparent;
    border: none;
    outline: 0;
    font-size: 0.95rem;
    width: 100%;
  }

  &:has(:focus-within) {
    border: 1px solid rgb(29, 161, 242);
    background-color: #000;
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
    background-color: rgb(29, 161, 242);
    border: none;
    border-radius: 50%;

    padding: 2px;

    height: 20px;
    width: 20px;

    &:hover {
      opacity: 0.8 !important;
    }

    > svg {
      color: #000;
      font-size: 1.1rem;
    }
  }
`;
