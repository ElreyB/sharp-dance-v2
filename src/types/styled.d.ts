import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    black: '#000',
    white: '#fff',
    red: '#ff0000',
    blue: '#0000ff',
    primaryColors: {
      white: '#ffffff',
      black: '#000000',
      silver: '#c0c0c0',
      red: '#ff6347',
    },
    secondaryColors: {
      orange: '#ffa500',
      green: '#008000',
      blue: '#add8e6',
      purple: '#800080',
    },
    favorites: {
      teal: '#008080',
      hunterGreen: '#355e3b',
    },
    mainBg: '#f0f0f0',
    mainTC: '#333333',
  },
  fonts: {
    sansSerif: "'Arial', sans-serif",
    serif: "'Times New Roman', serif",
  },
  spacing: {
    XS: '4px',
    S: '8px',
    M: '16px',
    L: '24px',
    XL: '32px',
  },
  breakpoints: {
    xs: '320px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
  },
  device: {
    desktop: '@media (min-width: 1024px)',
    mobile: '@media (max-width: 768px)',
    phone: '@media (max-width: 480px)',
  },
  media: {
    desktop: (...args) => `@media (min-width: 1024px) { ${args} }`,
    mobile: (...args) => `@media (max-width: 768px) { ${args} }`,
    phone: (...args) => `@media (max-width: 480px) { ${args} }`,
  },
};
