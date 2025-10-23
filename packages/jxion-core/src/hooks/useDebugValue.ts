/**
 * @fileoverview Universal useDebugValue Hook
 *
 * Provides consistent debug value management API across all frameworks in the Jxion ecosystem.
 * Optimized for development debugging and React DevTools integration.
 */

/**
 * Universal useDebugValue hook for debugging
 *
 * @param value - Value to display in debugger
 * @param formatter - Optional formatter function for value display
 *
 * @todo(@janberk) Implement framework-specific debug integration
 * @todo(@janberk) Add React DevTools integration
 * @todo(@janberk) Add conditional debugging for production builds
 */
export function useDebugValue<T>(
  value: T,
  formatter?: (value: T) => string
): void {
  if (formatter) {
    console.log(formatter(value));
  } else {
    console.log(value);
  }
}

// Framework-specific implementations
export const useDebugValueReact = useDebugValue;
export const useDebugValueVue = useDebugValue;
export const useDebugValueSvelte = useDebugValue;
export const useDebugValueSolidJS = useDebugValue;
export const useDebugValueAngular = useDebugValue;
