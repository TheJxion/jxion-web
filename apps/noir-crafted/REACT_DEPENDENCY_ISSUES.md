# React Dependency Issues - Root Cause Analysis

## Problem

When integrating React Three Fiber with GSAP in SvelteKit, we encounter multiple module resolution errors:

1. `react-reconciler` default export issues
2. `react/jsx-runtime` Fragment export issues
3. `scheduler` version conflicts (nested dependencies in `@react-three/fiber`)
4. `react-reconciler` needs React's `ReactSharedInternals` at module load time

## Root Cause

The core issue is **dependency version conflicts and nested node_modules**:

- `@react-three/fiber` bundles its own `scheduler` in `node_modules/@react-three/fiber/node_modules/scheduler`
- This nested scheduler version doesn't match the root-level React's scheduler
- `@gsap/react` is installed but not used, adding unnecessary complexity
- CommonJS/ES module interop issues with React dependencies
- `react-reconciler` requires React's `ReactSharedInternals.S` which is only available at runtime after React is initialized

## Current Workarounds

We've created stubs for:

- `react-reconciler/constants` → `src/lib/stubs/react-reconciler-constants-fix.ts`
- `scheduler` → `src/lib/stubs/scheduler-fix.ts` (provides ES module exports for CommonJS scheduler)
- `use-sync-external-store/shim/with-selector` → `src/lib/stubs/use-sync-external-store-fix.ts`
- `stats.js` → `src/lib/stubs/stats-js-fix.ts` (provides default export for CommonJS module)

## Fixes Applied

✅ **Fixed**: Added `scheduler` to `resolve.dedupe` in `vite.config.ts`

- Forces Vite to use root-level scheduler@0.25.0 instead of nested versions
- Added `scheduler` to `optimizeDeps.include` to ensure it's pre-bundled and transformed

✅ **Fixed**: Created `scheduler-fix.ts` stub

- Provides ES module exports for CommonJS scheduler module
- Explicitly exports all `unstable_*` functions including `unstable_scheduleCallback` and `unstable_IdlePriority`
- Handles circular dependency by detecting self-imports in the plugin

✅ **Fixed**: Configured `react-reconciler` exclusion from pre-bundling

- Excluded from `optimizeDeps.include` to allow runtime loading
- This ensures React's `ReactSharedInternals` is available when `react-reconciler` loads
- CommonJS transformation handled by Vite's build process

## Current Status (2024-12-24)

### Working:

- ✅ Scheduler stub provides all required exports
- ✅ Build process completes successfully
- ✅ Scheduler version conflicts resolved via deduplication

### Current Issue:

- ❌ **`react-reconciler` default export error**: When excluded from pre-bundling, `react-reconciler` loads as CommonJS which doesn't provide a default export that ES modules expect
- Error: `The requested module 'react-reconciler/index.js' does not provide an export named 'default'`

### Next Steps to Resolve:

1. **Option A: Create react-reconciler stub** (Recommended)
   - Create `src/lib/stubs/react-reconciler-fix.ts` that provides a default export
   - Import the CommonJS module and re-export as default
   - Add alias in `vite.config.ts` and handle in `vite-plugin-three-r3f.ts`
   - Ensure it loads at runtime (not pre-bundled) so React's internals are available

2. **Option B: Configure pre-bundling with React available**
   - Keep `react-reconciler` in `optimizeDeps.include` but ensure React is loaded first
   - Configure esbuildOptions to make React available during pre-bundling
   - May require additional configuration to preserve ReactSharedInternals connection

3. **Option C: Use dynamic import wrapper**
   - Create a wrapper that dynamically imports `react-reconciler` after React is loaded
   - This ensures ReactSharedInternals is available
   - May require changes to how `@react-three/fiber` imports `react-reconciler`

## Remaining Issues

1. **`@gsap/react` is unused** - Consider removing from `package.json` (we use GSAP directly)
2. **`params` warnings** - These are SvelteKit dev-mode warnings, not critical errors
3. **`react-reconciler` default export** - Needs stub or configuration fix (see Next Steps above)

## Files Modified

- `apps/noir-crafted/vite.config.ts` - Added scheduler deduplication, excluded react-reconciler from pre-bundling
- `apps/noir-crafted/vite-plugin-three-r3f.ts` - Added scheduler resolution handling
- `apps/noir-crafted/src/lib/stubs/scheduler-fix.ts` - Created scheduler ES module stub
- `apps/noir-crafted/src/lib/stubs/stats-js-fix.ts` - Created stats.js default export stub
- `apps/noir-crafted/src/lib/stubs/use-sync-external-store-fix.ts` - Created use-sync-external-store stub
- `apps/noir-crafted/src/lib/stubs/react-reconciler-constants-fix.ts` - Created react-reconciler/constants stub

## Branch

Working on: `feature/version-1.5-dependencyissue`
