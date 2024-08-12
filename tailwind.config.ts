/* eslint-disable global-require */
import type { Config } from 'tailwindcss';

const ROOT_PX = 16;

const px0to100: { [x: number]: string } = {
  ...Array.from(Array(101)).map((_, i) => `${i / ROOT_PX}rem`),
};
const px0to2000: { [x: number]: string } = {
  ...Array.from(Array(2001)).map((_, i) => `${i / ROOT_PX}rem`),
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: px0to2000,
      height: px0to2000,
      maxWidth: px0to2000,
      maxHeight: px0to2000,
      minWidth: px0to2000,
      minHeight: px0to2000,
      borderWidth: px0to100,
      gap: px0to100,
      padding: px0to100,
      margin: px0to2000,
      lineHeight: px0to100,
      fontSize: px0to100,
      inset: px0to2000,
      translate: px0to2000,
      rotate: px0to2000,
      skew: px0to2000,
    },
  },
  plugins: [
    require('daisyui'),
    ({ addComponents }: any) => {
      const theme = {
        '.h-w-full': {
          width: '100%',
          height: '100%',
        },
        '.h-w-screen': {
          width: '100vw',
          height: '100vh',
        },
        '.flex-center': {
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.absolute-center': {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.absolute-x-center': {
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.absolute-y-center': {
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.line-clamp-none': {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          overflow: 'hidden',
        },
      };
      addComponents(theme);
    },
  ],
  daisyui: {
    themes: ['lofi', 'black'],
  },
};

export default config;
