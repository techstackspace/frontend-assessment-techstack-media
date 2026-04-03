import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductFilters } from '@/components/products/product-filters';

const replaceMock = vi.fn();
const searchParams = new URLSearchParams('page=2');

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/products',
  useSearchParams: () => searchParams,
}));

vi.mock('@/hooks/use-debounced-search', () => ({
  useDebouncedSearch: (value: string) => value,
}));

describe('ProductFilters', () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it('updates the URL with search and resets pagination', async () => {
    const user = userEvent.setup();

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    const input = screen.getByPlaceholderText(
      /search by title, description, or brand/i
    );

    await user.clear(input);
    await user.type(input, 'phone');

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalled();
    });

    const lastCall = replaceMock.mock.calls.at(-1);
    expect(lastCall?.[0]).toContain('q=phone');
    expect(lastCall?.[0]).not.toContain('page=2');
    expect(lastCall?.[1]).toEqual({ scroll: false });
  });

  it('updates the URL when category changes', async () => {
    const user = userEvent.setup();

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    await user.selectOptions(screen.getByRole('combobox'), 'furniture');

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalled();
    });

    const lastCall = replaceMock.mock.calls.at(-1);
    expect(lastCall?.[0]).toContain('category=furniture');
    expect(lastCall?.[0]).not.toContain('page=2');
    expect(lastCall?.[1]).toEqual({ scroll: false });
  });
});