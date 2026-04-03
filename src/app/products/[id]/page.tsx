import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { Container } from '@/components/shared/container';
import { getProduct, getRelatedProducts } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils/format-price';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return {
      title: 'Product not found',
      description: 'The requested product could not be found.'
    };
  }

  try {
    const product = await getProduct(numericId);

    return {
      title: `${product.title} | Content Explorer`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.thumbnail]
      }
    };
  } catch {
    return {
      title: 'Product not found',
      description: 'The requested product could not be found.'
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  let product;

  try {
    product = await getProduct(numericId);
  } catch {
    notFound();
  }

  const relatedProducts = (await getRelatedProducts(product.category)).filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <main className="py-10">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/products' },
            { label: 'Products', href: '/products' },
            { label: product.title }
          ]}
        />

        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={product.images[0] || product.thumbnail || '/placeholder.svg'}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{product.title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Price</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{formatPrice(product.price)}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Rating</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{product.rating.toFixed(1)} / 5</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Brand</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{product.brand ?? 'Unknown'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Stock</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{product.stock} available</p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium text-slate-700">Discount</dt>
                <dd>{product.discountPercentage}%</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium text-slate-700">Availability</dt>
                <dd>{product.availabilityStatus ?? 'Available'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium text-slate-700">Shipping</dt>
                <dd>{product.shippingInformation ?? 'Standard shipping'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium text-slate-700">Warranty</dt>
                <dd>{product.warrantyInformation ?? 'Manufacturer coverage varies'}</dd>
              </div>
            </dl>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:border-slate-950"
            >
              Back to listing
            </Link>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">More to explore</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">Related products</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-4 font-semibold text-slate-950">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
