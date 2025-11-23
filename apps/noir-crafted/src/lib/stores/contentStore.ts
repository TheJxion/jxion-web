import { writable, type Readable } from 'svelte/store';
import { content as defaultContent } from '$lib/i18n/content';
import { createNoirContentManager } from '$lib/utils/noir-content-manager';
import { DEFAULT_CONTENT_PATH, EVENTS_API_URL } from '$lib/config/env';
import { createSSEClient } from '$lib/utils/sse-client';

// Type import deferred to avoid SSR issues
type ContentUpdate = {
  path: string;
  content: unknown;
  timestamp: number;
};

// Infer Content type from defaultContent
type Content = typeof defaultContent;

interface ContentState {
  content: Content;
  loading: boolean;
  error: string | null;
  lastUpdate: number;
  fromApi: boolean; // Track if content came from API (not fallback)
}

const createState = () =>
  writable<ContentState>({
    content: defaultContent,
    loading: true,
    error: null,
    lastUpdate: Date.now(),
    fromApi: false,
  });

const state = createState();

let initialized = false;
let contentManager: any = null;
let unsubscribeManager: (() => void) | null = null;
let sseClient: any = null;

const normalizeContent = (payload: unknown): Content => {
  if (!payload) {
    return defaultContent;
  }

  const maybeEnvelope = payload as { content?: Content };

  if (maybeEnvelope.content) {
    return maybeEnvelope.content;
  }

  // Check if payload has expected structure (has 'home' key)
  const hasContent = (payload as Content).home !== undefined;

  // Also check if it's an error response (has 'note' key indicating not found)
  const isErrorResponse = (payload as any).note !== undefined;
  if (isErrorResponse) {
    return defaultContent;
  }

  return hasContent ? (payload as Content) : defaultContent;
};

async function loadContent(forceRefresh: boolean = false) {
  state.update((current) => ({ ...current, loading: true, error: null }));

  try {
    if (!contentManager) {
      throw new Error('Content manager not initialized');
    }

    // Clear cache if force refresh is requested
    if (forceRefresh && typeof contentManager.clearCache === 'function') {
      contentManager.clearCache(DEFAULT_CONTENT_PATH);
      console.log('[contentStore] 🗑️ Cleared cache before loading');
    }

    const response = await contentManager.loadContent(
      DEFAULT_CONTENT_PATH,
      forceRefresh,
    );

    console.log('[contentStore] 📦 Raw API response:', {
      hasContent: !!(response as any)?.content,
      hasHome: !!(response as any)?.home,
      type: typeof response,
      keys:
        response && typeof response === 'object' ? Object.keys(response) : [],
    });

    const resolved = normalizeContent(response);

    state.set({
      content: resolved,
      loading: false,
      error: null,
      lastUpdate: Date.now(),
      fromApi: true, // Content successfully loaded from API
    });

    console.log('[contentStore] ✅ Content loaded from API, fromApi=true');
  } catch (error) {
    console.warn(
      '[contentStore] ⚠️ API unavailable, using minimal fallback content',
      error,
    );
    state.set({
      content: defaultContent,
      loading: false,
      error:
        error instanceof Error
          ? `Content API unavailable: ${error.message}. Please configure content through the admin panel.`
          : 'Content API unavailable. Please configure content through the admin panel.',
      lastUpdate: Date.now(),
      fromApi: false, // Using fallback content
    });
  }
}

function handleUpdate(update: ContentUpdate) {
  if (update.path !== DEFAULT_CONTENT_PATH) return;
  state.update((current) => ({
    ...current,
    content: normalizeContent(update.content),
    lastUpdate: update.timestamp,
    loading: false,
    error: null,
    fromApi: true, // Update came from API/SSE
  }));
}

export const contentStore: Readable<ContentState> = {
  subscribe: state.subscribe,
};

export async function ensureContentStore() {
  // Only initialize on client side
  if (typeof window === 'undefined') {
    // On server, just set default content
    state.set({
      content: defaultContent,
      loading: false,
      error: null,
      lastUpdate: Date.now(),
      fromApi: false,
    });
    return;
  }

  if (initialized) return;
  initialized = true;

  try {
    contentManager = await createNoirContentManager({
      enableLiveUpdates: true,
      updateInterval: 5000,
      onUpdate: handleUpdate,
    });

    if (contentManager) {
      await loadContent();
      contentManager.startLiveUpdates();
      unsubscribeManager = contentManager.onUpdate(handleUpdate);
    }

    // Also listen to SSE events for real-time updates
    try {
      sseClient = createSSEClient({
        apiUrl: EVENTS_API_URL.replace('/api/events', ''),
        onContentUpdate: async (path: string) => {
          if (path === DEFAULT_CONTENT_PATH) {
            console.log(
              '[contentStore] 📨 SSE content_update received, refreshing content...',
            );
            // Clear cache and reload fresh content
            if (
              contentManager &&
              typeof contentManager.clearCache === 'function'
            ) {
              contentManager.clearCache(DEFAULT_CONTENT_PATH);
            }
            await loadContent(true);
          }
        },
        onError: (error) => {
          console.warn('[contentStore] ⚠️ SSE error:', error);
          // SSE is optional, continue with polling
        },
      });
      console.log(
        '[contentStore] ✅ SSE client connected for real-time updates',
      );
    } catch (sseError) {
      console.warn(
        '[contentStore] ⚠️ Failed to initialize SSE client (will use polling only):',
        sseError,
      );
      // SSE is optional, continue without it
    }
  } catch (error) {
    console.error(
      '[contentStore] Failed to initialize content manager:',
      error,
    );
    // Fall back to default content
    state.set({
      content: defaultContent,
      loading: false,
      error: null,
      lastUpdate: Date.now(),
      fromApi: false,
    });
  }
}

export async function refreshContentStore() {
  if (!initialized) {
    await ensureContentStore();
    return;
  }

  // Force refresh - clear cache and fetch fresh content
  await loadContent(true);
}

export function resetContentStore() {
  if (contentManager) {
    contentManager.stopLiveUpdates();
  }
  if (unsubscribeManager) {
    unsubscribeManager();
    unsubscribeManager = null;
  }
  if (sseClient) {
    sseClient.disconnect();
    sseClient = null;
  }

  initialized = false;
  contentManager = null;
  state.set({
    content: defaultContent,
    loading: true,
    error: null,
    lastUpdate: Date.now(),
    fromApi: false,
  });
}
