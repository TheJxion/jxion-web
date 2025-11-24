/**
 * Fix for react-reconciler/constants module resolution
 * The module uses CommonJS exports, but Vite expects ES modules
 * This stub provides ES module exports for the constants
 */

// Re-export from the actual module, but handle CommonJS format
// These constants are used by React Three Fiber and other React libraries
export const ConcurrentRoot = 1;
export const LegacyRoot = 0;
export const ContinuousEventPriority = 8;
export const DefaultEventPriority = 32;
export const DiscreteEventPriority = 2;
export const IdleEventPriority = 268435456;
export const NoEventPriority = 0;

// Also provide as default export for compatibility
export default {
  ConcurrentRoot: 1,
  LegacyRoot: 0,
  ContinuousEventPriority: 8,
  DefaultEventPriority: 32,
  DiscreteEventPriority: 2,
  IdleEventPriority: 268435456,
  NoEventPriority: 0,
};
