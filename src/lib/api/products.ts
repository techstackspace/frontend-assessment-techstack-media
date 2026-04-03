import type { Product, ProductListResponse } from '@/types/product';

const API_BASE = 'https://dummyjson.com';
const PAGE_SIZE = 20;

async function request<T>(path: string, revalidate: number): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate }
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(page: number): Promise<ProductListResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  return request<ProductListResponse>(`/products?limit=${PAGE_SIZE}&skip=${skip}`, 300);
}

export async function getProduct(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`, 600);
}

export async function getCategories(): Promise<string[]> {
  return request<string[]>('/products/category-list', 3600);
}

export async function getRelatedProducts(category: string): Promise<Product[]> {
  const response = await request<ProductListResponse>(`/products/category/${encodeURIComponent(category)}?limit=4`, 600);
  return response.products;
}

export const PRODUCTS_PER_PAGE = PAGE_SIZE;
