import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-soft">
      <h2 className="text-2xl font-semibold text-slate-950">No products found</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        Try a different search term or clear the current filter to see more results.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Clear filters
      </Link>
    </div>
  );
}
