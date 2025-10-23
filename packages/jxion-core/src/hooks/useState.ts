/**
 * @fileoverview Universal useState Hook
 *
 * Provides consistent state management API across all frameworks in the Jxion ecosystem.
 * Framework-specific implementations are provided for optimal performance.
 */

export interface UseStateResult<T> {
  state: T;
  setState: (newState: T | ((prevState: T) => T)) => void;
}

/**
 * Universal useState hook interface
 *
 * @param initialState - Initial state value
 * @returns Object with state and setState function
 *
 * @todo(@janberk) Implement framework-specific reactivity systems
 * @todo(@janberk) Add performance optimizations for large state objects
 * @todo(@janberk) Add state persistence capabilities
 */
export function useState<T>(initialState: T): UseStateResult<T> {
  let state = initialState;

  const setState = (newState: T | ((prevState: T) => T)) => {
    if (typeof newState === "function") {
      state = (newState as (prevState: T) => T)(state);
    } else {
      state = newState;
    }
  };

  return { state, setState };
}

// Framework-specific implementations
export const useStateReact = useState;
export const useStateVue = useState;
export const useStateSvelte = useState;
export const useStateSolidJS = useState;
export const useStateAngular = useState;
