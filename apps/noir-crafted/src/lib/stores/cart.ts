import { writable } from 'svelte/store';
import type { Product } from '$types';

// SSR-safe browser check
const isBrowser =
  typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export interface CartItem {
  product: Product;
  quantity: number;
}

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([]);
  const animationTrigger = writable<boolean>(false);

  // Load from localStorage on init (client-side only)
  if (isBrowser) {
    try {
      const stored = localStorage.getItem('noir-cart');
      if (stored) {
        set(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }

  // Save to localStorage on changes (client-side only)
  if (isBrowser) {
    subscribe((items) => {
      try {
        localStorage.setItem('noir-cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    });
  }

  return {
    subscribe,
    animationTrigger: {
      subscribe: animationTrigger.subscribe,
    },
    add: (product: Product, quantity: number = 1) => {
      update((items) => {
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          existing.quantity += quantity;
          return items;
        }
        return [...items, { product, quantity }];
      });

      // Trigger animation
      animationTrigger.set(true);
      setTimeout(() => animationTrigger.set(false), 500);
    },
    remove: (productId: string) => {
      update((items) => items.filter((item) => item.product.id !== productId));
    },
    updateQuantity: (productId: string, quantity: number) => {
      update((items) => {
        if (quantity <= 0) {
          return items.filter((item) => item.product.id !== productId);
        }
        return items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        );
      });
    },
    clear: () => {
      set([]);
    },
    getItemCount: () => {
      let count = 0;
      const unsubscribe = subscribe((items) => {
        count = items.reduce((sum, item) => sum + item.quantity, 0);
      });
      unsubscribe();
      return count;
    },
    getTotal: () => {
      let total = 0;
      const unsubscribe = subscribe((items) => {
        total = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      });
      unsubscribe();
      return total;
    },
  };
}

export const cart = createCartStore();
