/**
 * Jxion Stack — i18n Backend Client
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: HTTP client for translation API endpoints
 * Date: 2025-11-13
 *
 * This module provides:
 * - HTTP read/write layer for translations
 * - Integration with @jxion-backend tRPC API
 * - Fallback to file-based translations when backend unavailable
 */
export interface BackendConfig {
    baseUrl?: string;
    enabled?: boolean;
}
/**
 * Configure backend client
 */
export declare function configureBackend(newConfig: Partial<BackendConfig>): void;
/**
 * Get translation from backend API
 */
export declare function fetchTranslationFromBackend(key: string, locale: string): Promise<string | null>;
/**
 * Get multiple translations from backend API
 */
export declare function fetchTranslationsFromBackend(keys: string[], locale: string): Promise<Record<string, string> | null>;
/**
 * Update translation via backend API
 */
export declare function updateTranslationInBackend(key: string, locale: string, value: string): Promise<boolean>;
/**
 * Update multiple translations via backend API
 */
export declare function updateTranslationsInBackend(translations: Array<{
    key: string;
    locale: string;
    value: string;
}>): Promise<boolean>;
/**
 * Clear translation cache via backend API
 */
export declare function clearCacheInBackend(locale?: string): Promise<boolean>;
//# sourceMappingURL=backend-client.d.ts.map