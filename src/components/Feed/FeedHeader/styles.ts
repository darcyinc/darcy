'use client';

import styled from 'styled-components';

export const Container = styled.header`
  border-bottom: 1px solid rgb(47, 51, 54);
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

    color: rgb(113, 118, 123);

    &:has(.divider) {
      color: #fff;
      font-weight: bold;
      font-size: 1.05rem;
    }

    &:hover {
      background-color: rgba(231, 233, 234, 0.1);
    }

    .divider {
      display: block;
      background-color: rgb(29, 155, 240);
      border-radius: 2px;
      height: 4px;

      position: absolute;
      bottom: 0;
    }
  }
`;
