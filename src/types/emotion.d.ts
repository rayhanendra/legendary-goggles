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
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        default: string;
      };
    };
  }
}
