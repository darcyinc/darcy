'use client';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    color-scheme: dark light;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: #000;
  }

  html, body {
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
