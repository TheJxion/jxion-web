/**
 * SSR Stub for SvelteKit Client Modules
 *
 * This stub prevents SvelteKit's client-side code (fetcher, stores, etc.)
 * from being evaluated during SSR, which would cause "window is not defined" errors.
 */

// Stub for client-side fetcher
export const browser = false;
export const dev = false;

// Stub for fetcher function
export function fetch(...args: any[]): Promise<any> {
  throw new Error('fetch should not be called during SSR');
}

// Stub for stores
export const stores = {};
export const page = { store: () => ({ subscribe: () => {} }) };
export const navigating = { store: () => ({ subscribe: () => {} }) };
export const updated = { store: () => ({ subscribe: () => {} }) };

// Stub for client module
export default {
  browser: false,
  dev: false,
  fetch,
  stores,
  page,
  navigating,
  updated,
};
