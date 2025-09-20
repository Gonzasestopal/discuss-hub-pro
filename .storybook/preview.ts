import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: { default: 'light' },
    layout: 'padded',
  },
};

export default preview;
