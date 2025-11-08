import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Product } from "$types";

function createFavoritesStore() {
  const { subscribe, set, update } = writable<Product[]>([]);

  // Load from localStorage on init
  if (browser) {
    const stored = localStorage.getItem("noir-favorites");
    if (stored) {
      try {
        set(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load favorites from localStorage", e);
      }
    }
  }

  // Save to localStorage on changes
  if (browser) {
    subscribe((items) => {
      localStorage.setItem("noir-favorites", JSON.stringify(items));
    });
  }

  return {
    subscribe,
    add: (product: Product) => {
      update((items) => {
        if (items.find((item) => item.id === product.id)) {
          return items; // Already in favorites
        }
        return [...items, product];
      });
    },
    remove: (productId: string) => {
      update((items) => items.filter((item) => item.id !== productId));
    },
    toggle: (product: Product) => {
      update((items) => {
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          return items.filter((item) => item.id !== product.id);
        }
        return [...items, product];
      });
    },
    isFavorite: (productId: string) => {
      let isFav = false;
      const unsubscribe = subscribe((items) => {
        isFav = items.some((item) => item.id === productId);
      });
      unsubscribe();
      return isFav;
    },
    clear: () => {
      set([]);
    },
  };
}

export const favorites = createFavoritesStore();
