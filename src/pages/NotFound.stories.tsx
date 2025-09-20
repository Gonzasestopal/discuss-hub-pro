// src/pages/NotFound.stories.tsx
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import NotFound from './NotFound';

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    // Prefer role + name if your page uses a heading like "404" or "Page not found"
    const headings = await c.findAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  },
};
