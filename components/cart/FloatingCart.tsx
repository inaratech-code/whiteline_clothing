'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCart() {
  const { items, totalItems, totalPrice } = useCartContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating cart when items are added or changed
    if (items.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [items.length, totalItems]);

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300, duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <div className="bg-slate-900 text-white rounded-lg shadow-2xl border-2 border-slate-700 p-4 min-w-[320px] max-w-[400px] ring-2 ring-[#1e40af]/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="font-bold text-lg">Cart Updated</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-slate-800"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
              {items.slice(-3).map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-slate-800 rounded overflow-hidden">
                    {item.product.images && item.product.images.length > 0 ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-slate-400">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">NPR {item.price.toLocaleString()}</p>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-slate-400 text-center pt-2">
                  +{items.length - 3} more item{items.length - 3 > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="border-t border-slate-700 pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total ({totalItems} items)</span>
                <span className="font-bold text-lg">NPR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => setIsVisible(false)}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button
                  className="flex-1 bg-[#1e40af] text-white hover:bg-[#1e3a8a]"
                  onClick={() => setIsVisible(false)}
                  asChild
                >
                  <Link href="/checkout" className="flex items-center justify-center gap-1">
                    Checkout
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

