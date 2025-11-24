/**
 * Fix for use-sync-external-store/shim/with-selector default export issue
 * The module uses named exports, but some code (like Zustand SystemJS) tries to import it as default
 * This wrapper provides both named and default exports
 *
 * Note: The vite plugin checks if the importer is this file and bypasses the alias
 * to avoid circular dependency. This allows us to import the actual module.
 */

// Import using * to get all exports, then extract what we need
// The vite plugin will resolve this to the actual node_modules module when importing from this stub
// @ts-ignore - use-sync-external-store doesn't have types for the shim
import * as storeModule from 'use-sync-external-store/shim/with-selector';

// Extract the named export - handle both CommonJS and ES module formats
const useSyncExternalStoreWithSelectorOriginal =
  (storeModule as any).useSyncExternalStoreWithSelector ||
  (storeModule as any).default ||
  storeModule;

// Re-export as named export
export const useSyncExternalStoreWithSelector =
  useSyncExternalStoreWithSelectorOriginal;

// Provide default export for code that imports it as default (e.g., Zustand SystemJS)
export default useSyncExternalStoreWithSelectorOriginal;
