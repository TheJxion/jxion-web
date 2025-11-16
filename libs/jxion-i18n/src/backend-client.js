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
const getEnvVar = (key) => {
    if (typeof window !== "undefined") {
        return window.__ENV__?.[key];
    }
    return typeof process !== "undefined"
        ? process.env?.[key]
        : undefined;
};
const DEFAULT_CONFIG = {
    baseUrl: getEnvVar("NEXT_PUBLIC_API_BASE") ||
        getEnvVar("VITE_API_BASE") ||
        "http://localhost:3005",
    enabled: true,
};
let config = { ...DEFAULT_CONFIG };
/**
 * Configure backend client
 */
export function configureBackend(newConfig) {
    config = { ...config, ...newConfig };
    console.log("[Jxion-i18n] Backend configured:", config);
}
/**
 * Get translation from backend API
 */
export async function fetchTranslationFromBackend(key, locale) {
    if (!config.enabled || !config.baseUrl) {
        return null;
    }
    try {
        const response = await fetch(`${config.baseUrl}/trpc/getTranslation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key,
                locale,
            }),
        });
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        const data = await response.json();
        return data.result?.data || null;
    }
    catch (error) {
        console.warn(`[Jxion-i18n] Backend fetch failed for ${key}, using fallback:`, error);
        return null;
    }
}
/**
 * Get multiple translations from backend API
 */
export async function fetchTranslationsFromBackend(keys, locale) {
    if (!config.enabled || !config.baseUrl) {
        return null;
    }
    try {
        const response = await fetch(`${config.baseUrl}/trpc/getTranslations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keys,
                locale,
            }),
        });
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        const data = await response.json();
        return data.result?.data || null;
    }
    catch (error) {
        console.warn(`[Jxion-i18n] Backend fetch failed for ${keys.length} keys, using fallback:`, error);
        return null;
    }
}
/**
 * Update translation via backend API
 */
export async function updateTranslationInBackend(key, locale, value) {
    if (!config.enabled || !config.baseUrl) {
        return false;
    }
    try {
        const response = await fetch(`${config.baseUrl}/trpc/updateTranslation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key,
                locale,
                value,
            }),
        });
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        const data = await response.json();
        return data.result?.data?.success === true;
    }
    catch (error) {
        console.error(`[Jxion-i18n] Backend update failed for ${key}:`, error);
        return false;
    }
}
/**
 * Update multiple translations via backend API
 */
export async function updateTranslationsInBackend(translations) {
    if (!config.enabled || !config.baseUrl) {
        return false;
    }
    try {
        const response = await fetch(`${config.baseUrl}/trpc/updateTranslations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                translations,
            }),
        });
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        const data = await response.json();
        return data.result?.data?.success === true;
    }
    catch (error) {
        console.error(`[Jxion-i18n] Backend batch update failed:`, error);
        return false;
    }
}
/**
 * Clear translation cache via backend API
 */
export async function clearCacheInBackend(locale) {
    if (!config.enabled || !config.baseUrl) {
        return false;
    }
    try {
        const response = await fetch(`${config.baseUrl}/trpc/clearTranslationCache`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                locale,
            }),
        });
        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }
        const data = await response.json();
        return data.result?.data?.success === true;
    }
    catch (error) {
        console.error(`[Jxion-i18n] Backend cache clear failed:`, error);
        return false;
    }
}
//# sourceMappingURL=backend-client.js.map