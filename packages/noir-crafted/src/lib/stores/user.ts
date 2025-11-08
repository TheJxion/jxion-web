import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
	id: string;
	email: string;
	name?: string;
}

function createUserStore() {
	const { subscribe, set, update } = writable<User | null>(null);

	// Load from localStorage on init
	if (browser) {
		const stored = localStorage.getItem('noir-user');
		if (stored) {
			try {
				set(JSON.parse(stored));
			} catch (e) {
				console.error('Failed to load user from localStorage', e);
			}
		}
	}

	// Save to localStorage on changes
	if (browser) {
		subscribe((user) => {
			if (user) {
				localStorage.setItem('noir-user', JSON.stringify(user));
			} else {
				localStorage.removeItem('noir-user');
			}
		});
	}

	return {
		subscribe,
		login: (email: string, password: string): Promise<User> => {
			// Mock authentication - in production, this would call an API
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simple validation
					if (email && password.length >= 6) {
						const user: User = {
							id: `user_${Date.now()}`,
							email,
							name: email.split('@')[0]
						};
						set(user);
						resolve(user);
					} else {
						reject(new Error('Invalid email or password'));
					}
				}, 500);
			});
		},
		register: (email: string, password: string): Promise<User> => {
			// Mock registration - in production, this would call an API
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simple validation
					if (email && password.length >= 6) {
						const user: User = {
							id: `user_${Date.now()}`,
							email,
							name: email.split('@')[0]
						};
						set(user);
						resolve(user);
					} else {
						reject(new Error('Invalid email or password'));
					}
				}, 500);
			});
		},
		logout: () => {
			set(null);
		},
		isAuthenticated: () => {
			let authenticated = false;
			const unsubscribe = subscribe((user) => {
				authenticated = user !== null;
			});
			unsubscribe();
			return authenticated;
		}
	};
}

export const user = createUserStore();

