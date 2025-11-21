/**
 * Jxion Stack — Content Manager
 * Phase Reference: Phase 3 — Template Composition & Page Assembly
 * Description: Manages content files, live updates, and synchronization
 *
 * This module provides:
 * - Content file loading from JSON
 * - Live content updates
 * - Style/template change detection
 * - WebSocket/SSE for real-time updates
 * - Comprehensive logging
 */

export interface ContentFile {
  path: string;
  content: any;
  lastModified: number;
  checksum?: string;
}

export interface ContentUpdate {
  type: 'content' | 'style' | 'template';
  path: string;
  content: any;
  timestamp: number;
}

export interface ContentManagerOptions {
  baseUrl?: string;
  enableLiveUpdates?: boolean;
  updateInterval?: number;
  onUpdate?: (update: ContentUpdate) => void;
}

class ContentManager {
  private contentCache: Map<string, ContentFile> = new Map();
  private updateListeners: Set<(update: ContentUpdate) => void> = new Set();
  private updateInterval: number = 5000; // 5 seconds
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private baseUrl: string;
  private enableLiveUpdates: boolean = true;

  constructor(options: ContentManagerOptions = {}) {
    this.baseUrl = options.baseUrl || '/api/content';
    this.enableLiveUpdates = options.enableLiveUpdates ?? true;
    this.updateInterval = options.updateInterval || 5000;

    if (options.onUpdate) {
      this.onUpdate(options.onUpdate);
    }

    console.log('[Jxion-ContentManager] Initialized', {
      baseUrl: this.baseUrl,
      enableLiveUpdates: this.enableLiveUpdates,
      updateInterval: this.updateInterval,
    });
  }

  /**
   * Load content from JSON file
   */
  async loadContent(path: string): Promise<any> {
    const cacheKey = path;
    const cached = this.contentCache.get(cacheKey);

    if (cached) {
      console.log(`[Jxion-ContentManager] Cache HIT: ${path}`);
      return cached.content;
    }

    console.log(`[Jxion-ContentManager] Cache MISS: ${path} - loading...`);

    try {
      const response = await fetch(`${this.baseUrl}/${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }

      const content = await response.json();
      const lastModified = Date.now();

      this.contentCache.set(cacheKey, {
        path,
        content,
        lastModified,
        checksum: this.calculateChecksum(content),
      });

      console.log(
        `[Jxion-ContentManager] ✅ Loaded content: ${path} (${
          JSON.stringify(content).length
        } bytes)`
      );

      return content;
    } catch (error) {
      console.error(
        `[Jxion-ContentManager] ❌ Error loading content ${path}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Save content to JSON file
   */
  async saveContent(path: string, content: any): Promise<void> {
    console.log(`[Jxion-ContentManager] 💾 Saving content: ${path}`);

    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content, null, 2),
      });

      if (!response.ok) {
        throw new Error(`Failed to save content: ${response.statusText}`);
      }

      // Update cache
      this.contentCache.set(path, {
        path,
        content,
        lastModified: Date.now(),
        checksum: this.calculateChecksum(content),
      });

      // Notify listeners
      this.notifyUpdate({
        type: 'content',
        path,
        content,
        timestamp: Date.now(),
      });

      console.log(`[Jxion-ContentManager] ✅ Saved content: ${path}`);
    } catch (error) {
      console.error(
        `[Jxion-ContentManager] ❌ Error saving content ${path}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Check for content updates
   */
  async checkForUpdates(): Promise<void> {
    console.log('[Jxion-ContentManager] 🔍 Checking for content updates...');

    for (const [path, cached] of this.contentCache.entries()) {
      try {
        const response = await fetch(
          `${this.baseUrl}/${path}?checksum=${cached.checksum || ''}`
        );

        if (response.status === 304) {
          // Not modified
          continue;
        }

        if (!response.ok) {
          continue;
        }

        const content = await response.json();
        const newChecksum = this.calculateChecksum(content);

        if (newChecksum !== cached.checksum) {
          console.log(`[Jxion-ContentManager] 🔄 Content updated: ${path}`);

          this.contentCache.set(path, {
            path,
            content,
            lastModified: Date.now(),
            checksum: newChecksum,
          });

          this.notifyUpdate({
            type: 'content',
            path,
            content,
            timestamp: Date.now(),
          });
        }
      } catch (error) {
        console.warn(
          `[Jxion-ContentManager] ⚠️ Error checking updates for ${path}:`,
          error
        );
      }
    }
  }

  /**
   * Subscribe to content updates
   */
  onUpdate(listener: (update: ContentUpdate) => void): () => void {
    this.updateListeners.add(listener);
    console.log(
      `[Jxion-ContentManager] 📡 Added update listener (${this.updateListeners.size} total)`
    );

    return () => {
      this.updateListeners.delete(listener);
      console.log(
        `[Jxion-ContentManager] 📡 Removed update listener (${this.updateListeners.size} total)`
      );
    };
  }

  /**
   * Start live update polling
   */
  startLiveUpdates(): void {
    if (!this.enableLiveUpdates) {
      console.log('[Jxion-ContentManager] ⏸️ Live updates disabled');
      return;
    }

    if (this.intervalId) {
      console.log('[Jxion-ContentManager] ⚠️ Live updates already started');
      return;
    }

    console.log(
      `[Jxion-ContentManager] ▶️ Starting live updates (interval: ${this.updateInterval}ms)`
    );

    this.intervalId = setInterval(() => {
      this.checkForUpdates();
    }, this.updateInterval);
  }

  /**
   * Stop live update polling
   */
  stopLiveUpdates(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[Jxion-ContentManager] ⏸️ Stopped live updates');
    }
  }

  /**
   * Notify all listeners of an update
   */
  private notifyUpdate(update: ContentUpdate): void {
    console.log(
      `[Jxion-ContentManager] 📢 Notifying ${this.updateListeners.size} listeners of update:`,
      update
    );
    this.updateListeners.forEach((listener) => {
      try {
        listener(update);
      } catch (error) {
        console.error(
          '[Jxion-ContentManager] ❌ Error in update listener:',
          error
        );
      }
    });
  }

  /**
   * Calculate content checksum
   */
  private calculateChecksum(content: any): string {
    const str = JSON.stringify(content);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  /**
   * Clear content cache
   */
  clearCache(path?: string): void {
    if (path) {
      this.contentCache.delete(path);
      console.log(`[Jxion-ContentManager] 🗑️ Cleared cache for: ${path}`);
    } else {
      this.contentCache.clear();
      console.log('[Jxion-ContentManager] 🗑️ Cleared all cache');
    }
  }
}

// Singleton instance
let contentManagerInstance: ContentManager | null = null;

/**
 * Get or create ContentManager instance
 */
export const getContentManager = (
  options?: ContentManagerOptions
): ContentManager => {
  if (!contentManagerInstance) {
    contentManagerInstance = new ContentManager(options);
  }
  return contentManagerInstance;
};

/**
 * Create a new ContentManager instance
 */
export const createContentManager = (
  options?: ContentManagerOptions
): ContentManager => {
  return new ContentManager(options);
};

export default getContentManager;
