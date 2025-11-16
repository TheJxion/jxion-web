/**
 * Jxion Stack — Translation Refresh Utility
 * Description: Automatically refresh translations when they're updated in the admin panel
 * Date: 2025-11-14
 *
 * This module provides:
 * - Automatic translation refresh polling
 * - Cache invalidation
 * - Event-based refresh triggers
 */

import {
  clearTranslationCache,
  getTranslations,
  type Locale,
} from "@jxion/i18n";
import { onDestroy } from "svelte";

export interface TranslationRefreshOptions {
  locale?: Locale;
  interval?: number; // Polling interval in milliseconds (default: 30 seconds)
  enabled?: boolean; // Enable/disable automatic refresh (default: true)
  onUpdate?: (translations: Record<string, string>) => void; // Callback when translations are updated
}

let refreshIntervals: Map<string, number> = new Map();
let refreshCallbacks: Map<
  string,
  Set<(translations: Record<string, string>) => void>
> = new Map();

/**
 * Start automatic translation refresh
 * Checks for translation updates periodically and refreshes the cache
 */
export function startTranslationRefresh(
  keys: string[],
  options: TranslationRefreshOptions = {}
): () => void {
  const {
    locale = "tr-TR",
    interval = 30000, // 30 seconds
    enabled = true,
    onUpdate,
  } = options;

  const refreshId = `${locale}-${keys.join(",")}`;

  // Store callback
  if (onUpdate) {
    if (!refreshCallbacks.has(refreshId)) {
      refreshCallbacks.set(refreshId, new Set());
    }
    refreshCallbacks.get(refreshId)!.add(onUpdate);
  }

  if (!enabled) {
    return () => {
      // Cleanup function (no-op if not enabled)
      if (refreshCallbacks.has(refreshId)) {
        refreshCallbacks.get(refreshId)!.delete(onUpdate!);
      }
    };
  }

  // Clear any existing interval for this refresh
  if (refreshIntervals.has(refreshId)) {
    clearInterval(refreshIntervals.get(refreshId)!);
  }

  // Store previous translations to detect changes
  let previousTranslations: Record<string, string> | null = null;

  // Start polling for updates (only when page is visible to save resources)
  const intervalId = setInterval(async () => {
    // Skip if page is hidden (saves API calls and battery)
    if (typeof document !== "undefined" && document.hidden) {
      return;
    }

    try {
      console.log(
        `[TranslationRefresh] 🔄 Checking for translation updates (${refreshId})...`
      );

      // Clear cache to force fresh fetch from API
      await clearTranslationCache(locale);

      // Fetch fresh translations
      const freshTranslations = await getTranslations(keys, locale);

      // Check if translations have changed
      let hasChanges = false;
      if (previousTranslations === null) {
        // First check - store and don't trigger update
        previousTranslations = freshTranslations;
        console.log(
          `[TranslationRefresh] 📋 Initial translations stored (${refreshId})`
        );
        return;
      }

      // Compare with previous values
      for (const key of keys) {
        const oldValue = previousTranslations[key];
        const newValue = freshTranslations[key];
        if (oldValue !== newValue && newValue !== key) {
          // Translation changed and is not a placeholder
          hasChanges = true;
          console.log(
            `[TranslationRefresh] 🔄 Translation changed: ${key} = "${oldValue}" → "${newValue}"`
          );
          break;
        }
      }

      // Update previous translations
      previousTranslations = freshTranslations;

      // Only trigger callback if translations actually changed
      if (hasChanges && refreshCallbacks.has(refreshId)) {
        console.log(
          `[TranslationRefresh] ✅ Translations updated, triggering callbacks (${refreshId})`
        );
        refreshCallbacks.get(refreshId)!.forEach((callback) => {
          callback(freshTranslations);
        });
      } else {
        console.log(
          `[TranslationRefresh] ℹ️ No translation changes detected (${refreshId})`
        );
      }
    } catch (error) {
      console.warn(
        `[TranslationRefresh] ⚠️ Error refreshing translations:`,
        error
      );
    }
  }, interval) as unknown as number;

  refreshIntervals.set(refreshId, intervalId);
  console.log(
    `[TranslationRefresh] ▶️ Started automatic refresh for ${refreshId} (interval: ${interval}ms)`
  );

  // Return cleanup function
  return () => {
    console.log(`[TranslationRefresh] ⏸️ Stopping refresh for ${refreshId}`);
    if (refreshIntervals.has(refreshId)) {
      clearInterval(refreshIntervals.get(refreshId)!);
      refreshIntervals.delete(refreshId);
    }
    if (refreshCallbacks.has(refreshId) && onUpdate) {
      refreshCallbacks.get(refreshId)!.delete(onUpdate);
      if (refreshCallbacks.get(refreshId)!.size === 0) {
        refreshCallbacks.delete(refreshId);
      }
    }
  };
}

/**
 * Manually refresh translations
 * Useful for triggering refresh on-demand (e.g., after admin saves)
 */
export async function refreshTranslations(
  keys: string[],
  locale: Locale = "tr-TR"
): Promise<Record<string, string>> {
  console.log(
    `[TranslationRefresh] 🔄 Manually refreshing translations for ${keys.length} keys...`
  );

  // Clear cache
  await clearTranslationCache(locale);

  // Fetch fresh translations
  const freshTranslations = await getTranslations(keys, locale);

  // Notify all callbacks
  const refreshId = `${locale}-${keys.join(",")}`;
  if (refreshCallbacks.has(refreshId)) {
    refreshCallbacks.get(refreshId)!.forEach((callback) => {
      callback(freshTranslations);
    });
  }

  console.log(`[TranslationRefresh] ✅ Translations refreshed manually`);
  return freshTranslations;
}

/**
 * Svelte-compatible hook for automatic translation refresh
 * Use this in Svelte components to automatically refresh translations
 */
export function useTranslationRefresh(
  keys: string[],
  options: TranslationRefreshOptions = {}
): {
  refresh: () => Promise<Record<string, string>>;
  stop: () => void;
} {
  const stop = startTranslationRefresh(keys, options);

  // Auto-cleanup on component destroy
  onDestroy(() => {
    stop();
  });

  return {
    refresh: () => refreshTranslations(keys, options.locale),
    stop,
  };
}
