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
// Export i18n config
export { i18n } from "./i18n-config";
// Export dictionary functions (ustad pattern)
export { getDictionary, getSupportedLocale } from "./get-dictionary";
export { useDictionary } from "./use-dictionary";
export { getCorrectFromDictionary } from "./utils/get-correct-from-dictionary";
const translationCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const STALE_TTL = 30 * 60 * 1000; // 30 minutes (stale but usable)
// Import backend client
import { fetchTranslationFromBackend, fetchTranslationsFromBackend, updateTranslationInBackend, updateTranslationsInBackend, clearCacheInBackend, configureBackend, } from "./backend-client";
/**
 * Load translations with stale-while-revalidate strategy
 * Phase 1: Integrates with backend API, falls back to file-based
 */
async function loadTranslations(locale) {
    const cacheKey = locale;
    const now = Date.now();
    // Check cache first (stale-while-revalidate)
    if (translationCache.has(cacheKey)) {
        const entry = translationCache.get(cacheKey);
        const age = now - entry.timestamp;
        // Return fresh cache
        if (age < CACHE_TTL) {
            console.log(`[Jxion-i18n] Cache HIT (fresh): ${locale}`);
            return entry.data;
        }
        // Return stale cache while revalidating
        if (age < STALE_TTL) {
            console.log(`[Jxion-i18n] Cache HIT (stale): ${locale} - revalidating in background`);
            // Revalidate in background (don't await)
            revalidateTranslations(locale).catch(console.error);
            return entry.data;
        }
    }
    console.log(`[Jxion-i18n] Cache MISS: ${locale} - fetching...`);
    // Try backend first, then fallback to file
    let translations = {};
    // Try backend API (for future use - currently returns null)
    // In production, this would fetch from database
    const backendData = null; // await fetchTranslationsFromBackend([], locale);
    if (backendData) {
        translations = backendData;
        console.log(`[Jxion-i18n] Loaded from backend: ${locale}`);
    }
    else {
        // Fallback to file-based
        try {
            const fileData = await import(`./translations/${locale}.json`);
            translations = fileData.default || fileData;
            console.log(`[Jxion-i18n] Loaded from file: ${locale}`);
        }
        catch (error) {
            console.error(`[Jxion-i18n] Failed to load translations for locale: ${locale}`, error);
            // Fallback to tr-TR if available
            if (locale !== "tr-TR") {
                return loadTranslations("tr-TR");
            }
            return {};
        }
    }
    // Cache the translations
    translationCache.set(cacheKey, {
        data: translations,
        timestamp: now,
        stale: false,
    });
    return translations;
}
/**
 * Revalidate translations from backend
 */
async function revalidateTranslations(locale) {
    try {
        // In production, fetch from backend
        // For now, just refresh from file
        const fileData = await import(`./translations/${locale}.json`);
        const translations = fileData.default || fileData;
        translationCache.set(locale, {
            data: translations,
            timestamp: Date.now(),
            stale: false,
        });
        console.log(`[Jxion-i18n] Cache revalidated: ${locale}`);
    }
    catch (error) {
        console.error(`[Jxion-i18n] Revalidation failed for ${locale}:`, error);
    }
}
/**
 * Get nested translation value by dot-notation key
 * Example: "hero.title" -> translations.hero.title
 */
function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
        return current && typeof current === "object" ? current[key] : undefined;
    }, obj);
}
/**
 * Interpolate translation string with parameters
 * Example: "Hello {name}" with {name: "World"} -> "Hello World"
 */
function interpolate(template, params) {
    if (!params)
        return template;
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? String(params[key]) : match;
    });
}
/**
 * Get translation by key
 * Phase 1: Uses backend API when available, falls back to file-based
 *
 * @param key - Dot-notation key (e.g., "hero.title")
 * @param locale - Locale code (default: "tr-TR")
 * @param params - Optional parameters for interpolation
 * @returns Translated string
 */
export const getTranslation = async (key, locale = "tr-TR", params) => {
    try {
        // Try backend first (for future use)
        const backendValue = await fetchTranslationFromBackend(key, locale);
        if (backendValue) {
            return interpolate(backendValue, params);
        }
        // Fallback to cached/file-based
        const translations = await loadTranslations(locale);
        const value = getNestedValue(translations, key);
        if (value === undefined) {
            console.warn(`[Jxion-i18n] Translation key not found: ${key} (locale: ${locale})`);
            return key;
        }
        return interpolate(String(value), params);
    }
    catch (error) {
        console.error(`[Jxion-i18n] Error getting translation for key: ${key}`, error);
        return key;
    }
};
/**
 * Get multiple translations at once
 * Phase 1: Uses backend API when available, falls back to file-based
 */
export const getTranslations = async (keys, locale = "tr-TR") => {
    try {
        // Try backend first (for future use)
        const backendData = await fetchTranslationsFromBackend(keys, locale);
        if (backendData) {
            return backendData;
        }
        // Fallback to cached/file-based
        const translations = await loadTranslations(locale);
        const result = {};
        for (const key of keys) {
            const value = getNestedValue(translations, key);
            result[key] = value !== undefined ? String(value) : key;
        }
        return result;
    }
    catch (error) {
        console.error(`[Jxion-i18n] Error getting translations:`, error);
        // Return keys as fallback
        const result = {};
        for (const key of keys) {
            result[key] = key;
        }
        return result;
    }
};
/**
 * React hook for translations (for React apps)
 * Phase 1: Returns hook with backend-aware translation function
 */
export const useTranslation = (locale = "tr-TR") => {
    return {
        t: (key, params) => getTranslation(key, locale, params),
        locale,
        update: (key, value) => updateTranslation(key, locale, value),
    };
};
// Backend client functions are already exported above
/**
 * Clear translation cache (useful for hot reloading in development)
 * Phase 1: Also clears backend cache when available
 */
export const clearTranslationCache = async (locale) => {
    if (locale) {
        translationCache.delete(locale);
        console.log(`[Jxion-i18n] Cache cleared: ${locale}`);
    }
    else {
        translationCache.clear();
        console.log(`[Jxion-i18n] Cache cleared: all locales`);
    }
    // Also clear backend cache
    await clearCacheInBackend(locale);
};
/**
 * Configure backend connection
 * Phase 1: Set backend URL and enable/disable backend integration
 */
export const configureI18nBackend = (config) => {
    configureBackend(config);
};
/**
 * Update translation via backend API
 * Phase 1: Persist translation changes to backend
 */
export const updateTranslation = async (key, locale, value) => {
    console.log(`[Jxion-i18n] Updating translation: ${key} (${locale})`);
    const success = await updateTranslationInBackend(key, locale, value);
    if (success) {
        // Clear local cache to force reload
        await clearTranslationCache(locale);
        console.log(`[Jxion-i18n] Translation updated and cache cleared: ${key}`);
    }
    return success;
};
/**
 * Update multiple translations via backend API
 * Phase 1: Batch persist translation changes
 */
export const updateTranslations = async (translations) => {
    console.log(`[Jxion-i18n] Updating ${translations.length} translations`);
    const success = await updateTranslationsInBackend(translations);
    if (success) {
        // Clear cache for all affected locales
        const locales = new Set(translations.map((t) => t.locale));
        const localeArray = Array.from(locales);
        for (const locale of localeArray) {
            await clearTranslationCache(locale);
        }
        console.log(`[Jxion-i18n] Translations updated and cache cleared`);
    }
    return success;
};
//# sourceMappingURL=index.js.map