import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { ProductFilters } from '@/components/products/product-filters';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
  }),
  usePathname: () => '/products',
  useSearchParams: () =>
    new URLSearchParams('page=2'),
}));

describe('ProductFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    push.mockClear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('updates the URL with debounced search and resets pagination', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    const input = screen.getByPlaceholderText(
      /search by title, description, or brand/i
    );

    await user.clear(input);
    await user.type(input, 'phone');

    act(() => {
      vi.advanceTimersByTime(450);
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalled();
    });

    expect(push).toHaveBeenLastCalledWith(
      expect.stringContaining('q=phone')
    );
    expect(push).toHaveBeenLastCalledWith(
      expect.not.stringContaining('page=2')
    );
  });

  it('updates the URL when category changes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'furniture');

    await waitFor(() => {
      expect(push).toHaveBeenCalled();
    });

    expect(push).toHaveBeenLastCalledWith(
      expect.stringContaining('category=furniture')
    );
    expect(push).toHaveBeenLastCalledWith(
      expect.not.stringContaining('page=2')
    );
  });
});