import type { Meta, StoryObj } from '@storybook/react-vite';

import Index from './Index';

const meta: Meta<typeof Index> = {
  title: 'Pages/Index',
  component: Index,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Index>;

export const Default: Story = {};
