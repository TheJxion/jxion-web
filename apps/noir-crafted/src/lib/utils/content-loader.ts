/**
 * Content Loader Utility
 * 
 * Reusable helper for loading content from ContentManager with fallback
 * Used across all noir-crafted pages for consistent content loading
 */

import { getContentManager, type ContentUpdate } from '@jxion/core';
import type { Locale } from '@jxion/i18n';

export interface ContentLoaderOptions {
  contentPath: string;
  lang?: Locale;
  enableLiveUpdates?: boolean;
  updateInterval?: number;
  onUpdate?: (update: ContentUpdate) => void;
}

export interface ContentLoaderResult {
  content: any;
  loading: boolean;
  error: string | null;
  lastUpdate: number;
  contentManager: any;
  loadContent: () => Promise<void>;
  handleContentUpdate: (update: ContentUpdate) => void;
}

/**
 * Initialize content loader for a page
 * Returns reactive state and helper functions
 */
export function createContentLoader(options: ContentLoaderOptions): ContentLoaderResult {
  const {
    contentPath,
    lang = 'tr-TR',
    enableLiveUpdates = true,
    updateInterval = 5000,
    onUpdate,
  } = options;

  let content: any = null;
  let loading = true;
  let error: string | null = null;
  let lastUpdate = 0;
  let contentManager: any = null;

  async function loadContent() {
    console.log(`[ContentLoader] 📂 Loading content from ContentManager: ${contentPath}`);
    loading = true;
    error = null;

    try {
      // Try to load from ContentManager API
      const loadedContent = await contentManager.loadContent(contentPath);
      content = loadedContent;
      lastUpdate = Date.now();
      loading = false;

      console.log(`[ContentLoader] ✅ Content loaded from ContentManager:`, {
        path: contentPath,
        size: JSON.stringify(content).length,
        timestamp: lastUpdate,
        contentKeys: Object.keys(content || {}),
      });
    } catch (err) {
      console.warn(`[ContentLoader] ⚠️ ContentManager API not available, using fallback content`);
      
      // Fallback: Import local content file
      try {
        const { content: localContent } = await import('$lib/i18n/content');
        content = localContent;
        lastUpdate = Date.now();
        loading = false;
        
        console.log(`[ContentLoader] ✅ Using fallback content from $lib/i18n/content.ts:`, {
          path: contentPath,
          size: JSON.stringify(content).length,
        });
      } catch (fallbackErr) {
        console.error(`[ContentLoader] ❌ Error loading fallback content:`, fallbackErr);
        error = 'Failed to load content from both ContentManager and fallback';
        loading = false;
      }
    }
  }

  function handleContentUpdate(update: ContentUpdate) {
    console.log(`[ContentLoader] 🔄 Content update received:`, {
      type: update.type,
      path: update.path,
      timestamp: update.timestamp,
    });
    
    if (update.path === contentPath) {
      content = update.content;
      lastUpdate = update.timestamp;
      console.log(`[ContentLoader] ✅ Content updated in UI - components will re-render`);
    }
    
    // Call custom onUpdate handler if provided
    if (onUpdate) {
      onUpdate(update);
    }
  }

  // Initialize content manager
  contentManager = getContentManager({
    baseUrl: '/api/content',
    enableLiveUpdates,
    updateInterval,
    onUpdate: handleContentUpdate,
  });

  return {
    content,
    loading,
    error,
    lastUpdate,
    contentManager,
    loadContent,
    handleContentUpdate,
  };
}

