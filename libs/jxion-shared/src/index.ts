/**
 * Jxion Stack — Shared Package
 * Cleanup Integration: Consolidated during safe merge pass (2025-11-13)
 * Phase Reference: All Phases
 * Description: Cross-package utils, zod types, fetch wrappers
 *
 * This package provides:
 * - Shared TypeScript types and utilities
 * - Cross-package helper functions
 * - Common validation schemas
 * - Framework-agnostic utilities
 *
 * PRESERVED: Existing type exports from packages/jxion-shared
 * - Type definitions (types/index.ts)
 * - Re-exports from @jxion/core for convenience
 *
 * DEPENDENCY BOUNDARY: This is the base layer - other libs depend on this
 * - @jxion/core → @jxion/shared only
 * - @jxion/styles → @jxion/shared only
 * - @jxion/i18n → @jxion/core + @jxion/shared
 *
 * TODO: Add zod schemas for translation keys, component props, template definitions
 * TODO: Implement fetch wrappers with error handling and retry logic
 * TODO: Add shared constants and configuration helpers
 */

// Export all types
export * from "./types";

// NOTE: We don't re-export from @jxion/core to avoid circular dependencies
// Consumers should import directly from @jxion/core when needed
