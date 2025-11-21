import { CONTENT_API_BASE } from '$lib/config/env';

// Type definition to avoid importing @jxion/core during SSR
type ContentManagerOptions = {
  baseUrl?: string;
  enableLiveUpdates?: boolean;
  updateInterval?: number;
  onUpdate?: (update: any) => void;
};

// Lazy import to avoid SSR issues with SvelteKit's fetcher
let createContentManagerFn: any = null;
let importPromise: Promise<any> | null = null;

async function getCreateContentManager() {
  // Double-check we're on client side
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  if (!createContentManagerFn && !importPromise) {
    // Only import on client side - use a promise to avoid multiple imports
    // Import @jxion/core - the Vite plugin will ensure we get the real module on client
    // (not the SSR stub)
    importPromise = import('@jxion/core')
      .then((module) => {
        createContentManagerFn = module.createContentManager;
        return createContentManagerFn;
      })
      .catch((err) => {
        console.error(
          '[noir-content-manager] Failed to import @jxion/core:',
          err,
        );
        importPromise = null;
        return null;
      });
  }

  if (importPromise) {
    return importPromise;
  }

  return createContentManagerFn;
}

export const createNoirContentManager = async (
  options?: ContentManagerOptions,
) => {
  // Only create on client side
  if (typeof window === 'undefined') {
    return null;
  }

  const createContentManager = await getCreateContentManager();
  if (!createContentManager) {
    throw new Error('Content manager not available on server');
  }

  return createContentManager({
    baseUrl: CONTENT_API_BASE,
    ...options,
  });
};
