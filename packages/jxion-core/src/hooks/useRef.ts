/**
 * @fileoverview Universal useRef Hook
 *
 * Provides consistent reference management API across all frameworks in the Jxion ecosystem.
 * Optimized for DOM element access and mutable value storage.
 */

export interface UseRefResult<T> {
  current: T;
}

/**
 * Universal useRef hook for mutable references
 *
 * @param initialValue - Initial value for the ref
 * @returns Ref object with current property
 *
 * @todo(@janberk) Implement framework-specific ref handling
 * @todo(@janberk) Add DOM element type safety
 * @todo(@janberk) Add ref forwarding capabilities
 */
export function useRef<T>(initialValue: T): UseRefResult<T> {
  return { current: initialValue };
}

// Framework-specific implementations
export const useRefReact = useRef;
export const useRefVue = useRef;
export const useRefSvelte = useRef;
export const useRefSolidJS = useRef;
export const useRefAngular = useRef;
