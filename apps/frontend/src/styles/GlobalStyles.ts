'use client';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ::selection {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.blue};
  }

  :root {
    color-scheme: ${({ theme }) => theme.colorScheme};
    text-rendering: optimizeLegibility;
    &, body {
      overflow: auto;
      height: 100vh;
    }
  }

  body {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.2s;
  }

  button, input, textarea {
    font-family: inherit;
  }

  body {
    a {
      color: ${({ theme }) => theme.colors.blue};
      text-decoration: none;

      &:hover,
      &:focus-visible {
        text-decoration: underline;
        outline: none;
      }
    }
  }
`;
