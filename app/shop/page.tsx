'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/lib/hooks/useProducts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const [sortBy, setSortBy] = useState('latest');

  const { products, loading } = useProducts({
    category: category,
  });

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shop</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Discover our premium collection</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-muted-foreground">
          {sortedProducts.length} products found
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductGrid products={sortedProducts} loading={loading} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

