import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilters } from '@/components/products/product-filters';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/products',
  useSearchParams: () => new URLSearchParams('page=3')
}));

describe('ProductFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    replace.mockClear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('updates the URL with debounced search and resets pagination', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    const input = screen.getByPlaceholderText('Search by title, description, or brand');
    await user.type(input, 'chair');

    vi.advanceTimersByTime(450);

    await waitFor(() => {
      expect(replace).toHaveBeenLastCalledWith('/products?q=chair', { scroll: false });
    });
  });

  it('updates the URL when category changes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<ProductFilters categories={['beauty', 'furniture']} />);

    await user.selectOptions(screen.getByRole('combobox'), 'furniture');
    vi.advanceTimersByTime(450);

    await waitFor(() => {
      expect(replace).toHaveBeenLastCalledWith('/products?category=furniture', { scroll: false });
    });
  });
});
