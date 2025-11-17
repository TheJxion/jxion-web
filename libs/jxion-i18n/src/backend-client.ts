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

const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    const env = (window as any).__ENV__;
    if (env?.[key]) return env[key];
  }
  return typeof process !== 'undefined'
    ? (process as any).env?.[key]
    : undefined;
};

const DEFAULT_CONFIG: BackendConfig = {
  baseUrl:
    getEnvVar('NEXT_PUBLIC_API_BASE') ||
    getEnvVar('VITE_API_BASE') ||
    getEnvVar('VITE_API_URL') ||
    'http://localhost:8080',
  enabled: true,
};

let config: BackendConfig = { ...DEFAULT_CONFIG };

/**
 * Configure backend client
 */
export function configureBackend(newConfig: Partial<BackendConfig>): void {
  config = { ...config, ...newConfig };
  console.log('[Jxion-i18n] Backend configured:', config);
}

/**
 * Get translation from backend API
 */
export async function fetchTranslationFromBackend(
  key: string,
  locale: string
): Promise<string | null> {
  if (!config.enabled || !config.baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${config.baseUrl}/trpc/getTranslation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  } catch (error) {
    console.warn(
      `[Jxion-i18n] Backend fetch failed for ${key}, using fallback:`,
      error
    );
    return null;
  }
}

/**
 * Get multiple translations from backend API
 */
export async function fetchTranslationsFromBackend(
  keys: string[],
  locale: string
): Promise<Record<string, string> | null> {
  if (!config.enabled || !config.baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${config.baseUrl}/trpc/getTranslations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  } catch (error) {
    console.warn(
      `[Jxion-i18n] Backend fetch failed for ${keys.length} keys, using fallback:`,
      error
    );
    return null;
  }
}

/**
 * Update translation via backend API
 */
export async function updateTranslationInBackend(
  key: string,
  locale: string,
  value: string
): Promise<boolean> {
  if (!config.enabled || !config.baseUrl) {
    return false;
  }

  try {
    const response = await fetch(`${config.baseUrl}/trpc/updateTranslation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  } catch (error) {
    console.error(`[Jxion-i18n] Backend update failed for ${key}:`, error);
    return false;
  }
}

/**
 * Update multiple translations via backend API
 */
export async function updateTranslationsInBackend(
  translations: Array<{ key: string; locale: string; value: string }>
): Promise<boolean> {
  if (!config.enabled || !config.baseUrl) {
    return false;
  }

  try {
    const response = await fetch(`${config.baseUrl}/trpc/updateTranslations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  } catch (error) {
    console.error(`[Jxion-i18n] Backend batch update failed:`, error);
    return false;
  }
}

/**
 * Clear translation cache via backend API
 */
export async function clearCacheInBackend(locale?: string): Promise<boolean> {
  if (!config.enabled || !config.baseUrl) {
    return false;
  }

  try {
    const response = await fetch(
      `${config.baseUrl}/trpc/clearTranslationCache`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locale,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result?.data?.success === true;
  } catch (error) {
    console.error(`[Jxion-i18n] Backend cache clear failed:`, error);
    return false;
  }
}
