// src/components/ConversationDetail.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { ConversationDetail } from './ConversationDetail';

const baseConversation = {
  id: 'c1',
  topic: 'Cats vs Dogs',
  side: 'pro',
  created_at: '',
  updated_at: '',
} as any;

const mockFetchDecorator = (Story: any) => {
  const original = window.fetch;
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);

    // GET conversation detail
    if (url.includes('/conversations/c1') && (!init || (init.method || 'GET') === 'GET')) {
      return new Response(
        JSON.stringify({
          conversation_id: 185,
          message: [
            {
              role: 'user',
              message: 'topic: Remote work is more productive than office work side:pro',
            },
            {
              role: 'bot',
              message:
                'I will gladly take the PRO side, arguing that remote work is more productive than office work. Remote work reduces commute time and allows for a more flexible schedule, which can lead to increased focus and efficiency. Additionally, it often results in fewer workplace distractions.',
            },
          ],
          side: 'pro',
          topic: 'Remote work is more productive than office work',
          created_at: '2025-09-10T18:13:58.951456Z',
          last_activity: null,
          message_count: null,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // POST new message
    if (url.includes('/conversations/c1/messages') && (init?.method || 'POST') === 'POST') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return original(input as any, init);
  };

  const ui = <Story />;
  // If you want isolation per story, you could restore after mount:
  // setTimeout(() => (window.fetch = original), 0);
  return ui;
};

const meta: Meta<typeof ConversationDetail> = {
  title: 'Components/ConversationDetail',
  component: ConversationDetail,
  decorators: [mockFetchDecorator],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ConversationDetail>;

export const Default: Story = {
  args: { conversation: baseConversation, onBack: () => {} },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    // Wait for mocked messages
    await expect(
      await c.findByText('topic: Remote work is more productive than office work side:pro'),
    ).toBeInTheDocument();
    // Compose and submit a new message
    await userEvent.type(c.getByRole('textbox'), 'New argument');
    await userEvent.click(c.getByRole('button', { name: /send/i }));
    await expect(await c.findByText('New argument')).toBeInTheDocument();
  },
};
