/**
 * SSR Stub for $app/stores
 *
 * This stub provides SSR-safe versions of SvelteKit's app stores.
 * The stores are proper Svelte stores with subscribe methods.
 */

import { writable } from 'svelte/store';

// SSR-safe page store
export const page = writable({
  url: {
    pathname: '/',
    search: '',
    hash: '',
    params: {},
    query: new URLSearchParams(),
  },
  params: {},
  route: {
    id: null,
  },
  data: {},
  form: undefined,
  error: null,
  status: 200,
});

// SSR-safe navigating store
export const navigating = writable(null);

// SSR-safe updated store
export const updated = writable(false);
