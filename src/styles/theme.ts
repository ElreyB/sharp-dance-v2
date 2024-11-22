import { css, FlattenInterpolation, ThemeProps } from 'styled-components';

const primaryColors = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0,0,0)',
  silver: 'rgb(140, 133, 133)',
  red: 'rgb(207, 31, 34)',
};

const secondaryColors = {
  orange: 'rgb(246,139,32)',
  green: 'rgb(89, 145, 23)',
  blue: 'rgb(30, 91, 204)',
  purple: 'rgb(201,30,204)',
};

const favorites = {
  teal: 'rgb(31, 206, 203)',
  hunterGreen: 'rgb(17, 110,109)',
};

const colors = {
  black: '#000000',
  white: '#ffffff',
  red: '#B12427',
  blue: '#00fdff',
  primaryColors,
  secondaryColors,
  favorites,
  mainBg: primaryColors.white,
  mainTC: primaryColors.black,
};

const spacing = {
  XS: '4px',
  S: '8px',
  M: '16px',
  L: '24px',
  XL: '32px',
};

const fonts = {
  sansSerif: `'Montserrat', sans-serif`,
  serif: `'Libre Baskerville', serif`,
};

const device = {
  desktop: '(min-width: 1185px)',
  mobile: '(max-width: 1184px)',
  phone: '(max-width: 700px)',
};

type Device = typeof device;
type DeviceKey = keyof Device;

export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

type Media = {
  [key in DeviceKey]: (
    ...args: Parameters<typeof css>
  ) => FlattenInterpolation<ThemeProps<any>>;
};

export const media = (Object.keys(device) as DeviceKey[]).reduce(
  (accumulator: Partial<Media>, label: DeviceKey) => {
    accumulator[label] = (...args: Parameters<typeof css>) => css`
      @media ${device[label]} {
        ${css(...args)}
      }
    `;
    return accumulator;
  },
  {} as Partial<Media>
) as Media;

export const theme = {
  colors,
  fonts,
  spacing,
  breakpoints,
  device,
  media,
};
