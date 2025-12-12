import useSWR from 'swr';
import { getProducts, getProductById, searchProducts } from '@/lib/firebase/products';
import { Product } from '@/lib/types';

export function useProducts(filters?: {
  category?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  limitCount?: number;
}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['products', filters],
    () => getProducts(filters)
  );

  return {
    products: data?.products || [],
    lastDoc: data?.lastDoc || null,
    loading: isLoading,
    error,
    mutate,
  };
}

export function useProduct(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ['product', id] : null,
    () => (id ? getProductById(id) : null)
  );

  return {
    product: data || null,
    loading: isLoading,
    error,
    mutate,
  };
}

export function useSearchProducts(searchTerm: string) {
  const { data, error, isLoading } = useSWR(
    searchTerm ? ['search', searchTerm] : null,
    () => (searchTerm ? searchProducts(searchTerm) : [])
  );

  return {
    products: (data as Product[]) || [],
    loading: isLoading,
    error,
  };
}

