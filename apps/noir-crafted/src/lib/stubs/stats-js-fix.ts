/**
 * Fix for stats.js module resolution
 * The module uses CommonJS exports, but @react-three/drei's Stats component tries to import it as default
 * This wrapper provides both named and default exports
 *
 * Note: When this file imports 'stats.js', Vite resolves it to the actual node_modules
 * version (not our alias), so there's no circular dependency.
 */

// Import the actual stats.js module
// Vite will handle the CommonJS to ES module conversion automatically
// @ts-ignore - stats.js uses CommonJS export = pattern, types may not match
// eslint-disable-next-line import/no-default-export
import * as statsModule from 'stats.js';

// Extract the default export (CommonJS modules export everything as default when imported with *)
// stats.js exports a constructor function as default
const Stats = (statsModule as any).default || statsModule;

// Re-export as default for code that imports it as default (e.g., @react-three/drei Stats component)
export default Stats;

// Also export as named export for compatibility
export { Stats };
