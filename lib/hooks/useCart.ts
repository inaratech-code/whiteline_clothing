import { useState, useEffect, useRef } from 'react';
import { CartItem } from '@/lib/types';

const CART_STORAGE_KEY_PREFIX = 'whiteline_cart_';
const GUEST_CART_KEY = 'whiteline_cart_guest';

function getStorageKey(uid: string | null) {
  if (!uid) return GUEST_CART_KEY;
  return `${CART_STORAGE_KEY_PREFIX}${uid}`;
}

function mergeCartItems(existing: CartItem[], incoming: CartItem[]): CartItem[] {
  const merged = [...existing];

  for (const item of incoming) {
    const matchIndex = merged.findIndex(
      (entry) => entry.productId === item.productId && entry.size === item.size
    );

    if (matchIndex >= 0) {
      merged[matchIndex] = {
        ...merged[matchIndex],
        quantity: merged[matchIndex].quantity + item.quantity,
      };
    } else {
      merged.push(item);
    }
  }

  return merged;
}

function readCart(storageKey: string): CartItem[] {
  if (typeof window === 'undefined') return [];

  const savedCart = localStorage.getItem(storageKey);
  if (!savedCart) return [];

  try {
    return JSON.parse(savedCart) as CartItem[];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
}

export function useCart(userId: string | null) {
  const [items, setItems] = useState<CartItem[]>([]);
  const previousUserIdRef = useRef<string | null | undefined>(undefined);
  const skipNextSaveRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const previousUserId = previousUserIdRef.current;
    const currentUserId = userId;
    const storageKey = getStorageKey(currentUserId);
    let nextItems = readCart(storageKey);

    if (previousUserId !== undefined && previousUserId !== currentUserId) {
      if (currentUserId && previousUserId === null) {
        const guestItems = readCart(GUEST_CART_KEY);
        if (guestItems.length > 0) {
          nextItems = mergeCartItems(nextItems, guestItems);
          localStorage.removeItem(GUEST_CART_KEY);
        }
      }
    }

    skipNextSaveRef.current = true;
    setItems(nextItems);
    previousUserIdRef.current = currentUserId;
  }, [userId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    if (userId === null && items.length === 0) return;

    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, userId]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (entry) => entry.productId === item.productId && entry.size === item.size
      );

      if (existing) {
        return prev.map((entry) =>
          entry.productId === item.productId && entry.size === item.size
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prev) => prev.filter((entry) => !(entry.productId === productId && entry.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems((prev) =>
      prev.map((entry) =>
        entry.productId === productId && entry.size === size ? { ...entry, quantity } : entry
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(getStorageKey(userId));
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
