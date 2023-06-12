import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colorScheme: 'only dark',
  background: '#000000',
  colors: {
    blue: 'rgb(29, 155, 240)',
    darkGray: 'rgb(22, 24, 28)',
    grayBorder: 'rgb(47, 51, 54)',
    red: 'rgb(249, 24, 128)',
    green: 'rgb(0, 186, 124)',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgb(113, 118, 123)',
  },
  effects: {
    hover: 'rgba(231, 233, 234, 0.1)',
  },
};
