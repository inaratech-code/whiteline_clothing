import useSWR from 'swr';
import { getOrders, getOrderById } from '@/lib/firebase/orders';
import { Order } from '@/lib/types';

export function useOrders(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ['orders', userId],
    () => getOrders(userId)
  );

  return {
    orders: (data as Order[]) || [],
    loading: isLoading,
    error,
    mutate,
  };
}

export function useOrder(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ['order', id] : null,
    () => (id ? getOrderById(id) : null)
  );

  return {
    order: data || null,
    loading: isLoading,
    error,
    mutate,
  };
}

