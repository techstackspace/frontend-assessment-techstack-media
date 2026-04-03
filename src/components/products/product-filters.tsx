'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedSearch } from '@/hooks/use-debounced-search';

interface ProductFiltersProps {
  categories: string[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? '';

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const debouncedSearch = useDebouncedSearch(search, 400);

  useEffect(() => {
    setSearch(initialQuery);
    setCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  const nextUrl = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set('q', debouncedSearch.trim());
    } else {
      params.delete('q');
    }

    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    params.delete('page');

    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [category, debouncedSearch, pathname, searchParams]);

  useEffect(() => {
    router.replace(nextUrl, { scroll: false });
  }, [nextUrl, router]);

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Search products</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, description, or brand"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
