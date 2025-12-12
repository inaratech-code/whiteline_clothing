'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { createProduct } from '@/lib/firebase/products';
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

export default function NewProductPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    gender: 'men',
    sizes: [] as string[],
    stock: '',
  });
  const [images, setImages] = useState<File[]>([]);

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
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images first
      const imageUrls: string[] = [];
      for (const image of images) {
        const path = getImagePath('temp', image.name);
        const url = await uploadImage(image, path);
        imageUrls.push(url);
      }

      // Create product
      const productId = await createProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        gender: formData.gender as 'men',
        sizes: formData.sizes,
        images: imageUrls,
        stock: Number(formData.stock),
      });

      // Invalidate all product-related caches
      mutate((key) => Array.isArray(key) && key[0] === 'products');
      
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

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
                    <SelectValue placeholder="Select category" />
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
              <Label htmlFor="images">Product Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Select multiple images for the product
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

