import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types/product';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

const product: Product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'Volumizing and lengthening mascara for dramatic lashes.',
  category: 'beauty',
  price: 10,
  discountPercentage: 7.17,
  rating: 2.56,
  stock: 99,
  tags: [],
  brand: 'Essence',
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  images: []
};

describe('ProductCard', () => {
  it('renders product content and links to the detail page', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    expect(screen.getByText('Essence')).toBeInTheDocument();
    expect(screen.getByText('2.6 / 5')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/1');
  });
});
