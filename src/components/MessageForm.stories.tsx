import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { MessageForm } from './MessageForm';

const meta: Meta<typeof MessageForm> = {
  title: 'Components/MessageForm',
  component: MessageForm,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof MessageForm>;

export const Default: Story = {
  args: { onSubmit: () => {} },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const send = c.getByRole('button', { name: /send/i });
    await expect(send).toBeDisabled();
    await userEvent.type(c.getByRole('textbox'), 'hello');
    await expect(send).toBeEnabled();
  },
};
