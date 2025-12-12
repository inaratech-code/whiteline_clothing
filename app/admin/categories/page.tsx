'use client';

import { useState } from 'react';
import { useCategories } from '@/lib/hooks/useCategories';
import { deleteCategory } from '@/lib/firebase/categories';
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
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const { categories, loading, mutate } = useCategories();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; categoryId: string | null }>({
    open: false,
    categoryId: null,
  });

  const handleDelete = async () => {
    if (!deleteDialog.categoryId) return;
    try {
      await deleteCategory(deleteDialog.categoryId);
      mutate();
      setDeleteDialog({ open: false, categoryId: null });
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories • {categories.length} categories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No categories yet</p>
            <Link href="/admin/categories/new">
              <Button className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Category
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="border-2 hover:border-[#1e40af]/50 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 uppercase">{category.slug}</p>
                {category.description && (
                  <p className="text-sm mb-4 text-muted-foreground">{category.description}</p>
                )}
                <div className="flex gap-2">
                  <Link href={`/admin/categories/${category.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteDialog({ open: true, categoryId: category.id })}
                    className="px-3"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, categoryId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, categoryId: null })}>
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

