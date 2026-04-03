import type { Product } from '@/types/product';

export function filterProducts(products: Product[], query: string, category: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery = !normalizedQuery
      || product.title.toLowerCase().includes(normalizedQuery)
      || product.description.toLowerCase().includes(normalizedQuery)
      || product.brand?.toLowerCase().includes(normalizedQuery);

    const matchesCategory = !normalizedCategory || product.category.toLowerCase() === normalizedCategory;

    return matchesQuery && matchesCategory;
  });
}
