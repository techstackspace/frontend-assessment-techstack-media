# Frontend Assessment – Content Explorer

A production-style Content Explorer built with Next.js App Router, TypeScript, and Tailwind CSS.

## Live Demo

- **Live URL:** https://frontend-assessment-techstack-media.vercel.app/products  
- **GitHub Repository:** https://github.com/techstackspace/frontend-assessment-techstack-media

> Deployed on Vercel for speed and simplicity within the assessment timeframe. The implementation prioritizes correctness, performance, and maintainability.

---

## API Choice

This application uses the [DummyJSON Products API](https://dummyjson.com/docs/products).

**Why this API:**
- No authentication overhead
- Stable and paginated
- Rich metadata (images, categories, ratings, pricing)
- Supports realistic UI scenarios (listing, filtering, detail pages)

This allowed focus on architecture, performance, and UX rather than API constraints.

---

## Setup

```bash
git clone https://github.com/techstackspace/frontend-assessment-techstack-media.git
cd frontend-assessment-techstack-media
npm install
npm run dev
```

## Architecture decisions

- **App Router** keeps routing, metadata, loading states, and server fetching aligned with modern Next.js.
- **Server-side data access** is centralized in `src/lib/api/products.ts` so components never call `fetch()` directly.
- **Shared types** live in `src/types` for reuse across UI, pages, and tests.
- **URL-driven search/filter state** makes results shareable and removes hidden client state.
- **Feature-oriented components** keep product-specific UI isolated and easy to test.

## Required features implemented

- Server-rendered listing page with at least 20 products
- Dynamic detail route using server data fetching
- Search with 400ms debounce
- Category filter
- Shareable URL query state via `searchParams`
- Pagination
- Breadcrumbs on detail page
- `generateMetadata` for detail routes
- Skeleton loading UI
- Route error boundary
- Empty-state UI
- Responsive 1 / 2 / 4-column grid
- Two meaningful component tests

## Performance optimizations applied

1. **`next/image` everywhere** with explicit dimensions and `priority` for above-the-fold images to reduce layout shift and improve LCP.
2. **`next/font`** via Geist to avoid blocking font loads and reduce CLS.
3. **Next.js fetch caching** using `revalidate` values tuned to product data freshness:
   - listing page: `revalidate: 300`
   - detail page: `revalidate: 600`
4. **Small client surface area**: most data fetching stays on the server; only search/filter controls are client components.
5. **URL-driven pagination** avoids extra client-side data orchestration and keeps rendering predictable.

## Why pagination instead of infinite scroll

Pagination was chosen because it provides better accessibility, clearer navigation, easier shareable URLs, more predictable performance, and simpler server-rendering behavior than infinite scroll for this assessment.

## Testing

Tests use Vitest + React Testing Library.

Included tests:
- `product-card.test.tsx`
- `product-filters.test.tsx`

## Known trade-offs

- Search and category filtering are handled client-side from the current page data to keep the implementation simple and readable with this API. With more time, I would add server query support that combines search, filter, and pagination more precisely.
- The image gallery on the detail page is intentionally lightweight to preserve performance and keep the focus on the assessed requirements.
- Cloudflare-specific edge caching headers were not implemented in this base version because the core assessment requirements were prioritized first.

## If I had 2 more hours

- Add a Cloudflare Workers deployment with OpenNext and expose `x-cache-status`.
- Expand test coverage to pagination and metadata-related utilities.
- Run and document an accessibility audit with Lighthouse and axe-core.
- Add richer detail-page streaming for related products with Suspense.

## Verification checklist

- `npm run dev`
- open `/products`
- search by title or brand
- filter by category
- paginate results
- open any product detail page
- test loading, empty, and error states
- run `npm test`
