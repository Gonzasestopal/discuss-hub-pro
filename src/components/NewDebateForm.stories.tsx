import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { NewDebateForm } from './NewDebateForm';

const meta: Meta<typeof NewDebateForm> = {
  title: 'Components/NewDebateForm',
  component: NewDebateForm,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof NewDebateForm>;

export const Default: Story = {
  args: { onSubmit: () => {} },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.findByRole('heading', { name: /start new debate/i })).resolves.toBeTruthy();
  },
};
