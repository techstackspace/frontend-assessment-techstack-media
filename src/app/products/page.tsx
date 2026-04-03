import { EmptyState } from '@/components/products/empty-state';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductPagination } from '@/components/products/product-pagination';
import { Container } from '@/components/shared/container';
import { getCategories, getProducts, PRODUCTS_PER_PAGE } from '@/lib/api/products';
import { filterProducts } from '@/lib/utils/filter-products';
import { normalizeQueryState } from '@/lib/utils/query-params';

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
  title: 'Content Explorer | Products',
  description: 'Explore searchable products with responsive cards, filters, and fast server rendering.'
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = normalizeQueryState(await searchParams);
  const [{ products, total }, categories] = await Promise.all([
    getProducts(resolvedParams.page),
    getCategories()
  ]);

  const filteredProducts = filterProducts(products, resolvedParams.query, resolvedParams.category);
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <main className="py-10">
      <Container>
        <header className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Frontend assessment</p>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Content Explorer</h1>
            <p className="max-w-2xl text-slate-600">
              Browse product content, inspect details, and share filtered results through URL-driven search state.
            </p>
          </div>
        </header>

        <ProductFilters categories={categories} />

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-950">{filteredProducts.length}</span> result(s) on page{' '}
            <span className="font-semibold text-slate-950">{resolvedParams.page}</span>
          </p>
        </div>

        {filteredProducts.length > 0 ? <ProductGrid products={filteredProducts} /> : <EmptyState />}

        <ProductPagination
          currentPage={resolvedParams.page}
          totalPages={totalPages}
          query={resolvedParams.query}
          category={resolvedParams.category}
        />
      </Container>
    </main>
  );
}
