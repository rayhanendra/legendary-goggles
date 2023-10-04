import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      error: {
        light: string;
        main: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        default: string;
      };
      gray: {
        [key: string]: string;
      };
    };
  }
}
