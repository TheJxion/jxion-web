import { w as writable } from "./index.js";
function createCartStore() {
  const { subscribe, set, update } = writable([]);
  const animationTrigger = writable(false);
  return {
    subscribe,
    animationTrigger: {
      subscribe: animationTrigger.subscribe
    },
    add: (product, quantity = 1) => {
      update((items) => {
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          existing.quantity += quantity;
          return items;
        }
        return [...items, { product, quantity }];
      });
      animationTrigger.set(true);
      setTimeout(() => animationTrigger.set(false), 500);
    },
    remove: (productId) => {
      update((items) => items.filter((item) => item.product.id !== productId));
    },
    updateQuantity: (productId, quantity) => {
      update((items) => {
        if (quantity <= 0) {
          return items.filter((item) => item.product.id !== productId);
        }
        return items.map(
          (item) => item.product.id === productId ? { ...item, quantity } : item
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
        total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      });
      unsubscribe();
      return total;
    }
  };
}
const cart = createCartStore();
export {
  cart as c
};
