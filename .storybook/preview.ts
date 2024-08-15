import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import '@/app/globals.css';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'lofi',
      dark: 'black',
    },
    defaultTheme: 'lofi',
    attributeName: 'data-theme',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
