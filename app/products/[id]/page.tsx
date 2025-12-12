'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProduct } from '@/lib/hooks/useProducts';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { product, loading } = useProduct(productId);
  const { addToCart } = useCartContext();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    if (!product) {
      alert('Product not loaded. Please refresh the page.');
      return;
    }
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (product.stock === 0) {
      alert('This product is out of stock');
      return;
    }

    addToCart({
      productId: product.id,
      product,
      size: selectedSize,
      quantity,
      price: product.price,
    });
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) {
      alert('Product not loaded. Please refresh the page.');
      return;
    }
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (product.stock === 0) {
      alert('This product is out of stock');
      return;
    }

    addToCart({
      productId: product.id,
      product,
      size: selectedSize,
      quantity,
      price: product.price,
    });

    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-right text-sm sm:text-base">
          <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Item added to cart!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square mb-4 bg-muted overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden border-2 ${
                    selectedImage === index ? 'border-foreground' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
              {product.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{product.name}</h1>
            <p className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">NPR {product.price.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Description</p>
            <p className="text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock === 0 ? (
            <Badge variant="destructive">Out of Stock</Badge>
          ) : (
            <p className="text-sm text-muted-foreground">
              {product.stock} in stock
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize || !product || product.stock === 0}
              className="flex-1 bg-[#1e40af] text-white hover:bg-[#1e3a8a] disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Add to Cart
            </Button>
            <Button
              type="button"
              onClick={handleBuyNow}
              disabled={!selectedSize || !product || product.stock === 0}
              variant="outline"
              size="lg"
              className="border-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

