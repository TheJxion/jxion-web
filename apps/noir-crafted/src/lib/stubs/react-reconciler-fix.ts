/**
 * Provides a safe ES module wrapper around the CommonJS react-reconciler.
 * - Ensures a default export exists for packages expecting `import Reconciler from 'react-reconciler'`
 * - Re-exports named members so consumers can keep using the native API
 * - Avoids circular aliasing by letting the stub import the original package when needed
 *
 * IMPORTANT: This must load at runtime (not pre-bundled) so React's ReactSharedInternals is available
 */

// Import the actual CommonJS module. The Vite plugin skips aliasing when the importer is this file,
// so this resolves to node_modules/react-reconciler/* and not back to this stub.
import * as reconcilerModule from 'react-reconciler';

// Some bundlers attach the reconciler function to `default`, others export it directly via module.exports.
// react-reconciler exports the reconciler factory function directly
const reconcilerExport =
  reconcilerModule && reconcilerModule.default
    ? reconcilerModule.default
    : reconcilerModule;

// Ensure consumers importing the default export continue to receive the reconciler factory.
export default reconcilerExport;

// Re-export all additional named exports for compatibility with packages that import specific helpers.
export * from 'react-reconciler';

// Provide CommonJS compatibility flag for tooling that inspects __esModule.
export const __esModule = true;

