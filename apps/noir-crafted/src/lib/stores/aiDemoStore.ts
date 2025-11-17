/**
 * AI Demo Store (Zustand)
 *
 * Client-side state management for the AI Case Study demo page.
 * Manages UI preferences: theme, selected tab, sidebar state, and auto-refresh settings.
 *
 * Architecture: Zustand store with persistence middleware for localStorage.
 * Compatible with SvelteKit SSR (client-side only).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AIDemoState {
  // Client state: UI preferences
  theme: 'light' | 'dark';
  selectedTab:
    | 'demo'
    | 'architecture'
    | 'metrics'
    | 'testing'
    | 'reflection'
    | 'renderer';
  sidebarOpen: boolean;

  // Client state: User preferences
  autoRefresh: boolean;
  refreshInterval: number;

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setSelectedTab: (
    tab:
      | 'demo'
      | 'architecture'
      | 'metrics'
      | 'testing'
      | 'reflection'
      | 'renderer',
  ) => void;
  toggleSidebar: () => void;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (interval: number) => void;
}

export const useAIDemoStore = create<AIDemoState>()(
  persist(
    (set) => ({
      // Initial state
      theme: 'dark' as const,
      selectedTab: 'demo' as const,
      sidebarOpen: false,
      autoRefresh: false,
      refreshInterval: 30000, // 30 seconds

      // Actions
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      setSelectedTab: (
        tab:
          | 'demo'
          | 'architecture'
          | 'metrics'
          | 'testing'
          | 'reflection'
          | 'renderer',
      ) => set({ selectedTab: tab }),
      toggleSidebar: () =>
        set((state: AIDemoState) => ({ sidebarOpen: !state.sidebarOpen })),
      setAutoRefresh: (enabled: boolean) => set({ autoRefresh: enabled }),
      setRefreshInterval: (interval: number) =>
        set({ refreshInterval: interval }),
    }),
    {
      name: 'ai-demo-store', // localStorage key
    },
  ),
);
