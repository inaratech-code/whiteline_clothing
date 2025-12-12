'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/lib/hooks/useProducts';
import { deleteProduct } from '@/lib/firebase/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
  const { products, loading, mutate } = useProducts();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; productId: string | null }>({
    open: false,
    productId: null,
  });

  const handleDelete = async () => {
    if (!deleteDialog.productId) return;
    try {
      await deleteProduct(deleteDialog.productId);
      mutate();
      setDeleteDialog({ open: false, productId: null });
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const categories = [
    { key: 'shirts', label: 'Shirts', icon: '👔' },
    { key: 'pants', label: 'Pants', icon: '👖' },
    { key: 'shorts', label: 'Shorts', icon: '🩳' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog • {products.length} products</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No products yet</p>
            <Link href="/admin/products/new">
              <Button className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryProducts = productsByCategory[category.key] || [];
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.key} className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#1e40af] pb-2">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-3xl font-bold">{category.label}</h2>
                  <span className="text-muted-foreground">({categoryProducts.length} items)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Card key={product.id} className="border-2 hover:border-[#1e40af]/50 transition-colors overflow-hidden">
                      <div className="relative aspect-square bg-muted">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                            No Image
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-xl font-bold mb-4 text-[#1e40af]">NPR {product.price.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteDialog({ open: true, productId: product.id })}
                            className="px-3"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Other categories */}
          {Object.entries(productsByCategory).map(([categoryKey, categoryProducts]) => {
            if (categories.some(c => c.key === categoryKey)) return null;
            return (
              <div key={categoryKey} className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#1e40af] pb-2">
                  <h2 className="text-3xl font-bold capitalize">{categoryKey}</h2>
                  <span className="text-muted-foreground">({categoryProducts.length} items)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Card key={product.id} className="border-2 hover:border-[#1e40af]/50 transition-colors overflow-hidden">
                      <div className="relative aspect-square bg-muted">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                            No Image
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-xl font-bold mb-4 text-[#1e40af]">NPR {product.price.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteDialog({ open: true, productId: product.id })}
                            className="px-3"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, productId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, productId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

