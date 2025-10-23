/**
 * @fileoverview Universal useImperativeHandle Hook
 *
 * Provides consistent imperative handle management API across all frameworks in the Jxion ecosystem.
 * Optimized for parent-child component communication and ref forwarding.
 */

/**
 * Universal useImperativeHandle hook for imperative APIs
 *
 * @param ref - Ref object to attach handle to
 * @param createHandle - Function that creates the imperative handle
 * @param deps - Dependency array
 *
 * @todo(@janberk) Implement framework-specific imperative handle handling
 * @todo(@janberk) Add handle validation and type safety
 * @todo(@janberk) Add automatic cleanup for imperative handles
 */
export function useImperativeHandle<T, R extends T>(
  ref: React.Ref<T>,
  createHandle: () => R,
  deps?: any[]
): void {
  if (deps) {
    // TODO(@janberk) Implement shallow comparison for dependencies
    if (typeof ref === "function") {
      ref(createHandle());
    } else if (ref && "current" in ref) {
      (ref as any).current = createHandle();
    }
  } else {
    if (typeof ref === "function") {
      ref(createHandle());
    } else if (ref && "current" in ref) {
      (ref as any).current = createHandle();
    }
  }
}

// Framework-specific implementations
export const useImperativeHandleReact = useImperativeHandle;
export const useImperativeHandleVue = useImperativeHandle;
export const useImperativeHandleSvelte = useImperativeHandle;
export const useImperativeHandleSolidJS = useImperativeHandle;
export const useImperativeHandleAngular = useImperativeHandle;
