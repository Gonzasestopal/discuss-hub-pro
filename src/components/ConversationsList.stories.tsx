import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';

import { ConversationsList } from './ConversationsList';

const mockFetchDecorator: Decorator = (Story) => {
  const original = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.includes('/conversations') && !url.includes('/messages')) {
      return new Response(
        JSON.stringify([
          { id: 'c1', topic: 'Cats vs Dogs', side: 'pro', created_at: '', updated_at: '' },
          { id: 'c2', topic: 'Is AI helpful?', side: 'con', created_at: '', updated_at: '' },
        ]),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return original(input as RequestInfo, init);
  };

  return <Story />;
};

const meta: Meta<typeof ConversationsList> = {
  title: 'Components/ConversationsList',
  component: ConversationsList,
  decorators: [mockFetchDecorator],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ConversationsList>;

export const Default: Story = {
  args: { onSelectConversation: () => {} },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.findByText('Cats vs Dogs')).resolves.toBeTruthy();
    await expect(c.findByText('Is AI helpful?')).resolves.toBeTruthy();
  },
};
