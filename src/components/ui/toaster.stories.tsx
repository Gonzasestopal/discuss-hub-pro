import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toaster } from './toaster';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Ui/Toaster',
  component: Toaster,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};
