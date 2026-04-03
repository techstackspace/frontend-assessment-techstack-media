import type { QueryState } from '@/types/api';

export function normalizeQueryState(searchParams?: Record<string, string | string[] | undefined>): QueryState {
  const pageParam = searchParams?.page;
  const qParam = searchParams?.q;
  const categoryParam = searchParams?.category;

  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const rawQuery = Array.isArray(qParam) ? qParam[0] : qParam;
  const rawCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  const parsedPage = Number(rawPage);

  return {
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    query: rawQuery?.trim() ?? '',
    category: rawCategory?.trim() ?? ''
  };
}
