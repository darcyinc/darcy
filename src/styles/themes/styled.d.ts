import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorScheme: string;
    background: string;
    colors: {
      blue: string;
      darkGray: string;
      grayBorder: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    effects: {
      hover: string;
    };
  }
}
