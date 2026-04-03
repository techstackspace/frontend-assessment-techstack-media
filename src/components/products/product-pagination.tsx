import Link from 'next/link';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
  category: string;
}

function buildHref(page: number, query: string, category: string): string {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (query) params.set('q', query);
  if (category) params.set('category', category);
  const queryString = params.toString();
  return queryString ? `/products?${queryString}` : '/products';
}

export function ProductPagination({ currentPage, totalPages, query, category }: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
      <Link
        href={buildHref(Math.max(1, currentPage - 1), query, category)}
        aria-disabled={currentPage === 1}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          currentPage === 1
            ? 'pointer-events-none border-slate-200 text-slate-400'
            : 'border-slate-300 bg-white text-slate-900 hover:border-slate-950'
        }`}
      >
        Previous
      </Link>

      <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1), query, category)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          currentPage === totalPages
            ? 'pointer-events-none border-slate-200 text-slate-400'
            : 'border-slate-300 bg-white text-slate-900 hover:border-slate-950'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
