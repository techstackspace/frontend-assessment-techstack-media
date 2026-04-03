'use client';

export default function ProductsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center shadow-soft">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Something went wrong</p>
        <h1 className="text-3xl font-semibold text-slate-950">We couldn’t load the products</h1>
        <p className="mt-3 text-slate-600">
          Please try again. If the issue continues, refresh the page or check your network connection.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
