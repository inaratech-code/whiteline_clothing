'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { useProduct } from '@/lib/hooks/useProducts';
import { updateProduct } from '@/lib/firebase/products';
import { uploadImage, getImagePath } from '@/lib/firebase/storage';
import { useCategories } from '@/lib/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const productId = params.id as string;
  const { product, loading } = useProduct(productId);
  const { categories } = useCategories();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    gender: 'men',
    sizes: [] as string[],
    stock: '',
    images: [] as string[],
  });
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        gender: product.gender || 'men',
        sizes: product.sizes,
        stock: product.stock.toString(),
        images: product.images || [],
      });
    }
  }, [product]);

  const handleSizeToggle = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size)
        ? formData.sizes.filter((s) => s !== size)
        : [...formData.sizes, size],
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload new images
      const newImageUrls: string[] = [];
      for (const image of newImages) {
        const path = getImagePath(productId, image.name);
        const url = await uploadImage(image, path);
        newImageUrls.push(url);
      }

      // Update product
      await updateProduct(productId, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        gender: formData.gender as 'men',
        sizes: formData.sizes,
        images: [...formData.images, ...newImageUrls],
        stock: Number(formData.stock),
      });

      // Invalidate all product-related caches (both list and individual product)
      mutate((key) => {
        if (Array.isArray(key)) {
          return key[0] === 'products' || (key[0] === 'product' && key[1] === productId);
        }
        return false;
      });

      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (loading) {
    return (
      <div className="max-w-4xl">
        <Skeleton className="h-8 w-64 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Product not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (NPR)</Label>
                <Input
                  id="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Sizes</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={formData.sizes.includes(size) ? 'default' : 'outline'}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Current Images</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative aspect-square bg-muted rounded">
                    <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="images">Add New Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

