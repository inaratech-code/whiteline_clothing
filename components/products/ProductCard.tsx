'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="group overflow-hidden border-0 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product.images && product.images.length > 0 ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-lg font-bold">NPR {product.price.toLocaleString()}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

