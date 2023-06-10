'use client';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    color-scheme: dark;
    text-rendering: optimizeLegibility;
  }

  body {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
  }

  html, body {
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
  }
`;
