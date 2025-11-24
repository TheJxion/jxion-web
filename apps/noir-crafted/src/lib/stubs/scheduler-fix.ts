/**
 * Stub for scheduler CommonJS module
 * Provides ES module exports for scheduler@0.25.0
 * This ensures unstable_IdlePriority, unstable_scheduleCallback and other exports are available as ES modules
 *
 * IMPORTANT: This file imports directly from the node_modules path to avoid circular dependency
 * with the alias. The plugin detects this self-import and bypasses the alias.
 */

// Import directly from node_modules to bypass the alias and avoid circular dependency
// The plugin will detect this self-import and resolve to the actual pre-bundled scheduler
// @ts-ignore - scheduler doesn't have TypeScript definitions, but it's a valid module
import * as schedulerModule from 'scheduler';

// Explicitly re-export all the exports that @react-three/fiber needs
// Using explicit exports to avoid circular dependency with the alias
export const unstable_now = schedulerModule.unstable_now;
export const unstable_IdlePriority = schedulerModule.unstable_IdlePriority;
export const unstable_ImmediatePriority =
  schedulerModule.unstable_ImmediatePriority;
export const unstable_LowPriority = schedulerModule.unstable_LowPriority;
export const unstable_NormalPriority = schedulerModule.unstable_NormalPriority;
export const unstable_Profiling = schedulerModule.unstable_Profiling;
export const unstable_UserBlockingPriority =
  schedulerModule.unstable_UserBlockingPriority;
export const unstable_cancelCallback = schedulerModule.unstable_cancelCallback;
export const unstable_continueExecution =
  schedulerModule.unstable_continueExecution;
export const unstable_forceFrameRate = schedulerModule.unstable_forceFrameRate;
export const unstable_getCurrentPriorityLevel =
  schedulerModule.unstable_getCurrentPriorityLevel;
export const unstable_getFirstCallbackNode =
  schedulerModule.unstable_getFirstCallbackNode;
export const unstable_next = schedulerModule.unstable_next;
export const unstable_pauseExecution = schedulerModule.unstable_pauseExecution;
export const unstable_requestPaint = schedulerModule.unstable_requestPaint;
export const unstable_runWithPriority =
  schedulerModule.unstable_runWithPriority;
export const unstable_scheduleCallback =
  schedulerModule.unstable_scheduleCallback;
export const unstable_shouldYield = schedulerModule.unstable_shouldYield;
export const unstable_wrapCallback = schedulerModule.unstable_wrapCallback;

// Provide default export for compatibility
export default schedulerModule;
