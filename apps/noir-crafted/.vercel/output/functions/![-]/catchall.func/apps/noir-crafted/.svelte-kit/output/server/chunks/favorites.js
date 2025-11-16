import { w as writable } from "./index.js";
function createFavoritesStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    add: (product) => {
      update((items) => {
        if (items.find((item) => item.id === product.id)) {
          return items;
        }
        return [...items, product];
      });
    },
    remove: (productId) => {
      update((items) => items.filter((item) => item.id !== productId));
    },
    toggle: (product) => {
      update((items) => {
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          return items.filter((item) => item.id !== product.id);
        }
        return [...items, product];
      });
    },
    isFavorite: (productId) => {
      let isFav = false;
      const unsubscribe = subscribe((items) => {
        isFav = items.some((item) => item.id === productId);
      });
      unsubscribe();
      return isFav;
    },
    clear: () => {
      set([]);
    }
  };
}
const favorites = createFavoritesStore();
export {
  favorites as f
};
