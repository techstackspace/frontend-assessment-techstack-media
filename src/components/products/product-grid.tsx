import type { Product } from '@/types/product';
import { ProductCard } from './product-card';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section aria-label="Products" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </section>
  );
}
