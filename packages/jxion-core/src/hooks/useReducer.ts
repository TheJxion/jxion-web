/**
 * @fileoverview Universal useReducer Hook
 *
 * Provides consistent reducer-based state management API across all frameworks in the Jxion ecosystem.
 * Optimized for complex state logic and predictable state updates.
 */

export type Reducer<S, A> = (state: S, action: A) => S;

export interface UseReducerResult<S, A> {
  state: S;
  dispatch: (action: A) => void;
}

/**
 * Universal useReducer hook for complex state management
 *
 * @param reducer - Reducer function for state updates
 * @param initialState - Initial state value
 * @returns Object with state and dispatch function
 *
 * @todo(@janberk) Implement framework-specific state management
 * @todo(@janberk) Add middleware support for reducers
 * @todo(@janberk) Add state persistence capabilities
 */
export function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): UseReducerResult<S, A> {
  let state = initialState;

  const dispatch = (action: A) => {
    state = reducer(state, action);
  };

  return { state, dispatch };
}

// Framework-specific implementations
export const useReducerReact = useReducer;
export const useReducerVue = useReducer;
export const useReducerSvelte = useReducer;
export const useReducerSolidJS = useReducer;
export const useReducerAngular = useReducer;
