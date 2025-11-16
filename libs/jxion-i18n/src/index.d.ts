/**
 * Jxion Stack — i18n Package
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: Translation manager + hooks + cache adapter (matching ustad pattern)
 *
 * This package provides:
 * - Runtime translation loading and caching
 * - File-based translations (Phase 1) with future DB adapter support
 * - Framework-agnostic translation hooks
 * - Interpolation support
 * - Turkish-first localization
 * - Dictionary system matching ustad-web pattern
 *
 * MIGRATED FROM: ustad-web/shared/src/language/
 * - get-dictionary.ts → getDictionary() function
 * - use-dictionary.ts → useDictionary() React hook
 * - dictionary/tr-TR.json, en-US.json → Full translation files
 * - getCorrectFromDictionary() → Helper utility
 */
import type { Locale } from "./i18n-config";
export type { Locale } from "./i18n-config";
export type { Dictionary } from "./use-dictionary";
export type { UseDictionaryOptions, UseDictionaryResult, } from "./use-dictionary";
export { i18n } from "./i18n-config";
export { getDictionary, getSupportedLocale } from "./get-dictionary";
export { useDictionary } from "./use-dictionary";
export { getCorrectFromDictionary } from "./utils/get-correct-from-dictionary";
export interface Translation {
    key: string;
    value: string;
    locale: string;
    namespace?: string;
}
import { type BackendConfig } from "./backend-client";
/**
 * Get translation by key
 * Phase 1: Uses backend API when available, falls back to file-based
 *
 * @param key - Dot-notation key (e.g., "hero.title")
 * @param locale - Locale code (default: "tr-TR")
 * @param params - Optional parameters for interpolation
 * @returns Translated string
 */
export declare const getTranslation: (key: string, locale?: Locale, params?: Record<string, string | number>) => Promise<string>;
/**
 * Get multiple translations at once
 * Phase 1: Uses backend API when available, falls back to file-based
 */
export declare const getTranslations: (keys: string[], locale?: Locale) => Promise<Record<string, string>>;
/**
 * React hook for translations (for React apps)
 * Phase 1: Returns hook with backend-aware translation function
 */
export declare const useTranslation: (locale?: Locale) => {
    t: (key: string, params?: Record<string, string | number>) => Promise<string>;
    locale: "tr-TR" | "en-US";
    update: (key: string, value: string) => Promise<boolean>;
};
/**
 * Clear translation cache (useful for hot reloading in development)
 * Phase 1: Also clears backend cache when available
 */
export declare const clearTranslationCache: (locale?: Locale) => Promise<void>;
/**
 * Configure backend connection
 * Phase 1: Set backend URL and enable/disable backend integration
 */
export declare const configureI18nBackend: (config: BackendConfig) => void;
/**
 * Update translation via backend API
 * Phase 1: Persist translation changes to backend
 */
export declare const updateTranslation: (key: string, locale: Locale, value: string) => Promise<boolean>;
/**
 * Update multiple translations via backend API
 * Phase 1: Batch persist translation changes
 */
export declare const updateTranslations: (translations: Array<{
    key: string;
    locale: Locale;
    value: string;
}>) => Promise<boolean>;
//# sourceMappingURL=index.d.ts.map