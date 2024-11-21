// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      red: string;
      blue: string;
      primaryColors: {
        white: string;
        black: string;
        silver: string;
        red: string;
      };
      secondaryColors: {
        orange: string;
        green: string;
        blue: string;
        purple: string;
      };
      favorites: {
        teal: string;
        hunterGreen: string;
      };
      mainBg: string;
      mainTC: string;
    };
    fonts: {
      sansSerif: string;
      serif: string;
    };
    spacing: {
      XS: string;
      S: string;
      M: string;
      L: string;
      XL: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    device: {
      desktop: string;
      mobile: string;
      phone: string;
    };
    media: {
      [key: string]: (...args: any[]) => any; // You can be more specific if desired
    };
  }
}
