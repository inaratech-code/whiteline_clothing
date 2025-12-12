'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCartContext();
  const { user } = useAuthContext();

  const shippingCost = totalPrice >= 1500 ? 0 : 200;
  const finalTotal = totalPrice + shippingCost;

  return (
    <>
      {/* Cart Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative text-white hover:bg-slate-800 hover:text-[#1e40af]"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#1e40af] text-white text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Drawer - Centered Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400, duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
              }}
            >
              <div className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-gray-800" />
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    {totalItems > 0 && (
                      <span className="text-sm text-gray-600">({totalItems} items)</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:bg-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-lg font-semibold mb-2 text-gray-900">Your cart is empty</p>
                      <p className="text-gray-600 mb-6">Start adding items to your cart</p>
                      <Button onClick={() => setIsOpen(false)} asChild className="bg-[#1e40af] text-white hover:bg-[#1e3a8a]">
                        <Link href="/shop">Continue Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} className="flex gap-4 items-start pb-6 border-b border-gray-300 last:border-b-0">
                          {/* Product Image */}
                          <Link 
                            href={`/products/${item.productId}`}
                            onClick={() => setIsOpen(false)}
                            className="relative w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200"
                          >
                            {item.product.images && item.product.images.length > 0 ? (
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No Image
                              </div>
                            )}
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link 
                                  href={`/products/${item.productId}`}
                                  onClick={() => setIsOpen(false)}
                                  className="font-semibold text-gray-900 hover:underline block mb-1"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                                <p className="text-lg font-bold text-gray-900">NPR {item.price.toLocaleString()}</p>
                              </div>
                              
                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-red-600 hover:bg-gray-200"
                                onClick={() => removeFromCart(item.productId, item.size)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-4">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 border-gray-300 hover:bg-gray-200"
                                onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 border-gray-300 hover:bg-gray-200"
                                onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer with Summary */}
                {items.length > 0 && (
                  <div className="border-t border-gray-300 p-6 bg-white space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                        <span className="text-gray-900 font-medium">NPR {totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Shipping</span>
                        <span className="text-gray-900 font-medium">{shippingCost === 0 ? 'Free' : `NPR ${shippingCost}`}</span>
                      </div>
                      <Separator className="bg-gray-300" />
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-bold text-lg text-gray-900">Total</span>
                        <span className="font-bold text-lg text-gray-900">NPR {finalTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {user ? (
                        <Button 
                          className="w-full h-12 bg-[#1e40af] text-white hover:bg-[#1e3a8a] text-base font-semibold"
                          onClick={() => setIsOpen(false)}
                          asChild
                        >
                          <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                      ) : (
                        <Button 
                          className="w-full h-12 bg-[#1e40af] text-white hover:bg-[#1e3a8a] text-base font-semibold"
                          onClick={() => setIsOpen(false)}
                          asChild
                        >
                          <Link href="/auth/login?redirect=/checkout">Login to Checkout</Link>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-100 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                        asChild
                      >
                        <Link href="/shop">Continue Shopping</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

