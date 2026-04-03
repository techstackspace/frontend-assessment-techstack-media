import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/format-price';
import type { Product } from '@/types/product';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
            <h2 className="line-clamp-2 text-lg font-semibold text-slate-950">{product.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Brand</p>
              <p className="font-medium text-slate-700">{product.brand ?? 'Unknown'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Rating</p>
              <p className="font-medium text-slate-700">{product.rating.toFixed(1)} / 5</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-lg font-bold text-slate-950">{formatPrice(product.price)}</span>
            <span className="text-sm font-medium text-emerald-700">{product.stock} in stock</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
