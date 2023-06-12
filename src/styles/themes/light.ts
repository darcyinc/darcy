import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colorScheme: 'only light',
  background: '#ffffff',
  colors: {
    blue: 'rgb(29, 155, 240)',
    darkGray: 'rgb(247, 249, 249)',
    grayBorder: 'rgb(239, 243, 244)',
    red: 'rgb(249, 24, 128)',
    green: 'rgb(0, 186, 124)',
  },
  text: {
    primary: '#000000',
    secondary: 'rgb(83, 100, 113)',
  },
  effects: {
    hover: 'rgba(15, 20, 25, 0.1)',
  },
};
