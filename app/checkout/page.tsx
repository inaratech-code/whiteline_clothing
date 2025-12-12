'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartContext } from '@/contexts/CartContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createOrder } from '@/lib/firebase/orders';
import { ShoppingBag, MapPin, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCartContext();
  const { user, userData, loading: authLoading } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: userData?.name || '',
    email: user?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || '',
    city: '',
    postalCode: '',
    country: 'Nepal',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const finalTotal = totalPrice + (totalPrice >= 1500 ? 0 : 200);

      // Create order in Firestore
      const orderId = await createOrder({
        userId: user.uid,
        items: items.map((item) => ({
          productId: item.productId,
          product: item.product,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: finalTotal,
        status: 'pending',
        shippingInfo,
      });

      clearCart();
      router.push(`/orders/${orderId}`);
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/auth/login?redirect=/checkout');
    }
    return null;
  }

  if (items.length === 0) {
    if (typeof window !== 'undefined') {
      router.push('/cart');
    }
    return null;
  }

  const shippingCost = totalPrice >= 1500 ? 0 : 200;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Complete your order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Shipping Information */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base font-medium">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base font-medium">Phone</Label>
                    <Input
                      id="phone"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm sm:text-base font-medium">City</Label>
                    <Input
                      id="city"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-sm sm:text-base font-medium">Address</Label>
                    <Input
                      id="address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="Street address, apartment, suite, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-sm sm:text-base font-medium">Postal Code</Label>
                    <Input
                      id="postalCode"
                      required
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      placeholder="44600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm sm:text-base font-medium">Country</Label>
                    <Input
                      id="country"
                      required
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 sm:top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-4 pb-4 border-b">
                    <Link href={`/products/${item.productId}`} className="relative w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-semibold text-sm hover:underline line-clamp-1">{item.product.name}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="text-base font-bold mt-2">NPR {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium">NPR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? 'Free' : `NPR ${shippingCost}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#1e40af]">NPR {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                type="submit" 
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-[#1e40af] text-white hover:bg-[#1e3a8a] shadow-lg" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Place Order - </span>NPR {finalTotal.toLocaleString()}
                  </span>
                )}
              </Button>

              <Link href="/cart" className="block">
                <Button type="button" variant="outline" className="w-full h-11 sm:h-12 text-sm sm:text-base">
                  Edit Cart
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      </form>
    </div>
  );
}

