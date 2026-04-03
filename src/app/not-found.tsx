import Link from 'next/link';
import { Container } from '@/components/shared/container';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center py-10">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">404</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Product not found</h1>
          <p className="mt-3 text-slate-600">The page you requested does not exist or may have been moved.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Return to products
          </Link>
        </div>
      </Container>
    </main>
  );
}
