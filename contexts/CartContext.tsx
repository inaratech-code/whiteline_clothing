'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { useAuthContext } from '@/contexts/AuthContext';
import { CartItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const userId = user?.uid || null;
  const cart = useCart(userId);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

