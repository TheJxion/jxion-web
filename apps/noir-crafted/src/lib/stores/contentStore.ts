import { writable, type Readable } from 'svelte/store';
import { content as defaultContent } from '$lib/i18n/content';
import { createNoirContentManager } from '$lib/utils/noir-content-manager';
import { DEFAULT_CONTENT_PATH } from '$lib/config/env';

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
}

const createState = () =>
  writable<ContentState>({
    content: defaultContent,
    loading: true,
    error: null,
    lastUpdate: Date.now(),
  });

const state = createState();

let initialized = false;
let contentManager: any = null;
let unsubscribeManager: (() => void) | null = null;

const normalizeContent = (payload: unknown): Content => {
  if (!payload) {
    return defaultContent;
  }

  const maybeEnvelope = payload as { content?: Content };

  if (maybeEnvelope.content) {
    return maybeEnvelope.content;
  }

  return (payload as Content).home ? (payload as Content) : defaultContent;
};

async function loadContent() {
  state.update((current) => ({ ...current, loading: true, error: null }));

  try {
    if (!contentManager) {
      throw new Error('Content manager not initialized');
    }

    const response = await contentManager.loadContent(DEFAULT_CONTENT_PATH);
    const resolved = normalizeContent(response);

    state.set({
      content: resolved,
      loading: false,
      error: null,
      lastUpdate: Date.now(),
    });
  } catch (error) {
    console.warn('[contentStore] ⚠️ Falling back to bundled content', error);
    state.set({
      content: defaultContent,
      loading: false,
      error:
        error instanceof Error
          ? error.message
          : 'İçerik yüklenemedi, yerel veri gösteriliyor.',
      lastUpdate: Date.now(),
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
    });
  }
}

export async function refreshContentStore() {
  if (!initialized) {
    await ensureContentStore();
    return;
  }

  await loadContent();
}

export function resetContentStore() {
  if (contentManager) {
    contentManager.stopLiveUpdates();
  }
  if (unsubscribeManager) {
    unsubscribeManager();
    unsubscribeManager = null;
  }

  initialized = false;
  contentManager = null;
  state.set({
    content: defaultContent,
    loading: true,
    error: null,
    lastUpdate: Date.now(),
  });
}
