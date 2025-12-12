'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/lib/hooks/useProducts';
import { ProductGrid } from '@/components/products/ProductGrid';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading } = useSearchProducts(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Search Results</h1>
      {query && (
        <p className="text-muted-foreground mb-8">
          Found {products.length} results for &quot;{query}&quot;
        </p>
      )}
      <ProductGrid products={products} loading={loading} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

