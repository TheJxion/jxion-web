import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
}

function createToastStore() {
	const { subscribe, set, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (message: string, type: Toast['type'] = 'success', duration: number = 3000) => {
			const id = `toast_${Date.now()}_${Math.random()}`;
			const toast: Toast = { id, message, type, duration };
			
			update((toasts) => [...toasts, toast]);
			
			// Auto remove after duration
			setTimeout(() => {
				update((toasts) => toasts.filter((t) => t.id !== id));
			}, duration);
		},
		remove: (id: string) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		},
		clear: () => {
			set([]);
		}
	};
}

export const toast = createToastStore();

