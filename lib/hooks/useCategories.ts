import useSWR from 'swr';
import { getCategories } from '@/lib/firebase/categories';
import { Category } from '@/lib/types';

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR('categories', getCategories);

  return {
    categories: (data as Category[]) || [],
    loading: isLoading,
    error,
    mutate,
  };
}

