import { Container } from '@/components/shared/container';
import { ProductSkeleton } from '@/components/products/product-skeleton';

export default function LoadingProductsPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="mb-8 space-y-3">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-80 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="mb-8 h-28 animate-pulse rounded-2xl bg-slate-200" />
        <ProductSkeleton count={8} />
      </Container>
    </main>
  );
}
