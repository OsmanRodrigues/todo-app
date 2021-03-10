import { css } from 'styled-components';

export enum PalleteColor {
  Primary = '#612F74',
  Secondary = '#E5E5E5',
  Acessory = '#C4C4C4',
  Gray = '#828282',
  Black = '#333333',
  White = '#f5f5f5'
}
export enum Typography {
  Font = 'Roboto',
  Family = 'sans-serif',
  Medium = '1rem',
  Large = '1.5rem'
}
export enum Breakpoint {
  XXSmall = '20rem',
  XSmal = '36rem',
  Small = '48rem',
  Medium = '62rem',
  Large = '75rem',
  XLarge = '100rem'
}
export enum ZIndex {
  Low = -1,
  Neutral = 0,
  High = 100
}
export enum Transition {
  Fast = 'all 0.2s linear 0.2s'
}
export enum ColumnGap {
  Small = '0.5rem',
  Medium = '1rem',
  Large = '1.5rem'
}
export const border = {
  radius: '0.5rem',
  thickness: '0.25rem'
};
export const padding = {
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
  xlarge: '3rem'
};
export const overlayStyle = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${ZIndex.High};
`;
export const buttonRawStyle = css`
  border: none;
  background: none;
`;
export const boxShadowStyle = `
  6px 6px 4px rgba(0, 0, 0, 0.086)
`;
