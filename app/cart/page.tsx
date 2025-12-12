'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCartContext();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex gap-3 sm:gap-4 border-b pb-4">
              <Link href={`/products/${item.productId}`} className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-muted">
                {item.product.images && item.product.images.length > 0 ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No Image
                  </div>
                )}
              </Link>

              <div className="flex-1">
                <Link href={`/products/${item.productId}`}>
                  <h3 className="font-semibold hover:underline">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                <p className="text-lg font-bold mt-2">NPR {item.price.toLocaleString()}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.productId, item.size)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 sm:p-6 sticky top-20 sm:top-24">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
            <Separator className="mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} items)</span>
                <span>NPR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{totalPrice >= 1500 ? 'Free' : 'NPR 200'}</span>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>NPR {(totalPrice + (totalPrice >= 1500 ? 0 : 200)).toLocaleString()}</span>
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/shop" className="block mt-4">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

