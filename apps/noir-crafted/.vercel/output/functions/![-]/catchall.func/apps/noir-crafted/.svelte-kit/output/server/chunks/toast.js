import { w as writable } from "./index.js";
function createToastStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    add: (message, type = "success", duration = 3e3) => {
      const id = `toast_${Date.now()}_${Math.random()}`;
      const toast2 = { id, message, type, duration };
      update((toasts) => [...toasts, toast2]);
      setTimeout(() => {
        update((toasts) => toasts.filter((t) => t.id !== id));
      }, duration);
    },
    remove: (id) => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    },
    clear: () => {
      set([]);
    }
  };
}
const toast = createToastStore();
export {
  toast as t
};
