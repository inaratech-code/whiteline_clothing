/**
 * Utility functions for managing user-specific localStorage data
 */

const STORAGE_PREFIX = 'whiteline_';

/**
 * Get all localStorage keys that belong to a specific user
 */
export function getUserStorageKeys(userId: string | null): string[] {
  if (typeof window === 'undefined') return [];
  
  const keys: string[] = [];
  const prefix = userId ? `${STORAGE_PREFIX}${userId}_` : `${STORAGE_PREFIX}guest_`;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith(prefix) || key.startsWith(`${STORAGE_PREFIX}cart_${userId || 'guest'}`))) {
      keys.push(key);
    }
  }
  
  return keys;
}

/**
 * Clear all localStorage data for a specific user
 */
export function clearUserData(userId: string | null): void {
  if (typeof window === 'undefined') return;
  
  const keys = getUserStorageKeys(userId);
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Also clear any legacy keys
  if (userId) {
    localStorage.removeItem(`whiteline_cart_${userId}`);
  } else {
    localStorage.removeItem('whiteline_cart_guest');
  }
  
  // Clear any other potential user-specific keys
  const allKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      allKeys.push(key);
    }
  }
  
  // Remove keys that match user-specific patterns
  allKeys.forEach(key => {
    if (userId && key.includes(`_${userId}`)) {
      localStorage.removeItem(key);
    } else if (!userId && (key.includes('_guest') || (!key.includes('_') && key.startsWith(STORAGE_PREFIX)))) {
      // For guest, be more careful - only clear if it's clearly guest data
      if (key === 'whiteline_cart_guest') {
        localStorage.removeItem(key);
      }
    }
  });
}

/**
 * Clear all user-specific data when switching accounts
 */
export function clearAllUserData(): void {
  if (typeof window === 'undefined') return;
  
  // Get all keys that start with our prefix
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  
  // Remove all user-specific data
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
}

