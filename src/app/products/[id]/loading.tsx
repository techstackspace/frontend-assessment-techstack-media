import { Container } from '@/components/shared/container';

export default function LoadingProductDetailPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="mb-6 h-4 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-10 w-4/5 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded bg-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse rounded bg-slate-200" />
              <div className="h-20 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
