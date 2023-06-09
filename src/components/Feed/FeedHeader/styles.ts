'use client';

import styled from 'styled-components';

export const Container = styled.header`
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

    &:has(.active) {
      color: #fff;
      font-weight: bold;
    }

    &:hover {
      background-color: rgba(231, 233, 234, 0.1);
    }

    .active {
      display: block;
      background-color: #fff;
      border-radius: 2px;
      height: 3px;

      position: absolute;
      bottom: 0;
    }
  }
`;
