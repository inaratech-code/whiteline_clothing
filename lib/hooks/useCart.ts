import { useState, useEffect, useRef } from 'react';
import { CartItem } from '@/lib/types';
import { clearUserData } from '@/lib/utils/storage';

const CART_STORAGE_KEY_PREFIX = 'whiteline_cart_';

export function useCart(userId: string | null) {
  const [items, setItems] = useState<CartItem[]>([]);
  const previousUserIdRef = useRef<string | null>(null);

  // Get storage key based on user ID
  const getStorageKey = (uid: string | null) => {
    if (!uid) return 'whiteline_cart_guest';
    return `${CART_STORAGE_KEY_PREFIX}${uid}`;
  };

  // Load cart when user changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentUserId = userId;
    const previousUserId = previousUserIdRef.current;

    // If user changed, clear the cart and load new user's cart
    if (previousUserId !== null && previousUserId !== currentUserId) {
      // Clear previous user's cart from state
      setItems([]);
      
      // Clear all previous user's data when switching users
      clearUserData(previousUserId);
    }

    // Load cart for current user
    const storageKey = getStorageKey(currentUserId);
    const savedCart = localStorage.getItem(storageKey);
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
      }
    } else {
      setItems([]);
    }

    // Update previous user ID
    previousUserIdRef.current = currentUserId;
  }, [userId]);

  // Save cart when items change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (userId === null && items.length === 0) return; // Don't save empty guest cart

    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, userId]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== 'undefined' && userId) {
      const storageKey = getStorageKey(userId);
      localStorage.removeItem(storageKey);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}

