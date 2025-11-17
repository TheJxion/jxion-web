/**
 * Jxion Stack — Styles Package
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Design tokens + runtime style loader (matching ustad styles/ pattern)
 * MIGRATED FROM: ustad-web/shared/src/styles/
 */

import tokensData from './tokens.json';

export interface DesignTokens {
  colors: Record<string, Record<string, string>>;
  typography: {
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}

export type Theme = 'light' | 'dark' | 'custom';

// Design tokens (Phase 2: Implemented)
export const designTokens: DesignTokens = tokensData as DesignTokens;

// Style cache
const styleCache: Map<string, { css: string; timestamp: number }> = new Map();
const STYLE_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Get environment variable (works in browser and Node.js)
 */
const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    const env = (window as any).__ENV__;
    if (env?.[key]) return env[key];
  }
  // Check for Node.js process.env (with type safety)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalProcess =
    typeof globalThis !== 'undefined' ? (globalThis as any).process : undefined;
  if (globalProcess && globalProcess.env) {
    return globalProcess.env[key];
  }
  return undefined;
};

/**
 * Load styles from backend API
 * Phase 2: Runtime style loading with caching
 */
async function fetchStylesFromBackend(
  componentId: string,
  variant?: string,
  theme: Theme = 'light'
): Promise<string | null> {
  const backendUrl =
    getEnvVar('NEXT_PUBLIC_API_BASE') ||
    getEnvVar('VITE_API_BASE') ||
    getEnvVar('VITE_API_URL') ||
    'http://localhost:8080';

  try {
    const response = await fetch(`${backendUrl}/api/styles/${componentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variant,
        theme,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.css || null;
  } catch (error) {
    console.warn(
      `[Jxion-Styles] Backend fetch failed for ${componentId}, using fallback:`,
      error
    );
    return null;
  }
}

/**
 * Generate CSS from tokens for a component
 * Phase 2: Runtime CSS generation from design tokens
 */
function generateStylesFromTokens(
  componentId: string,
  variant?: string,
  theme: Theme = 'light'
): string {
  console.log(
    `[Jxion-Styles] Generating styles for ${componentId} (variant: ${
      variant || 'default'
    }, theme: ${theme})`
  );

  // In production, this would use a CSS generator
  // For now, return a basic CSS structure
  const baseStyles = `
    .${componentId} {
      /* Component base styles from tokens */
    }
  `;

  if (variant) {
    return `${baseStyles}\n.${componentId}--${variant} { /* Variant styles */ }`;
  }

  return baseStyles;
}

/**
 * Load styles for a component
 * Phase 2: Runtime style loading with backend integration and caching
 *
 * This function tries to:
 * 1. Check cache first
 * 2. Try backend API
 * 3. Fallback to token-based generation
 *
 * For SCSS modules, components import them directly (matching ustad pattern)
 * This loader is for dynamic/runtime style generation when needed.
 */
export const loadStyles = async (
  componentId: string,
  variant?: string,
  theme: Theme = 'light'
): Promise<string> => {
  const cacheKey = `${componentId}:${variant || 'default'}:${theme}`;
  const now = Date.now();

  // Check cache
  if (styleCache.has(cacheKey)) {
    const entry = styleCache.get(cacheKey)!;
    if (now - entry.timestamp < STYLE_CACHE_TTL) {
      console.log(`[Jxion-Styles] Cache HIT: ${cacheKey}`);
      return entry.css;
    }
  }

  console.log(`[Jxion-Styles] Cache MISS: ${cacheKey} - loading...`);

  // Try backend first
  let css = await fetchStylesFromBackend(componentId, variant, theme);

  // Fallback to token-based generation
  if (!css) {
    css = generateStylesFromTokens(componentId, variant, theme);
    console.log(`[Jxion-Styles] Generated styles from tokens: ${componentId}`);
  } else {
    console.log(`[Jxion-Styles] Loaded styles from backend: ${componentId}`);
  }

  // Cache the styles
  styleCache.set(cacheKey, {
    css,
    timestamp: now,
  });

  return css;
};

/**
 * Clear style cache
 * Phase 2: Cache invalidation for style updates
 */
export const clearStyleCache = (componentId?: string): void => {
  if (componentId) {
    // Clear all variants/themes for this component
    const keysToDelete: string[] = [];
    styleCache.forEach((_, key) => {
      if (key.startsWith(`${componentId}:`)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => styleCache.delete(key));
    console.log(`[Jxion-Styles] Cache cleared: ${componentId}`);
  } else {
    styleCache.clear();
    console.log(`[Jxion-Styles] Cache cleared: all components`);
  }
};

/**
 * Get design token value
 * Phase 2: Access design tokens programmatically
 *
 * @param path - Dot-notation path (e.g., "colors.primary.green")
 * @returns Token value or undefined
 */
export const getToken = (path: string): string | undefined => {
  const parts = path.split('.');
  let current: any = designTokens;

  for (const part of parts) {
    if (current && typeof current === 'object') {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
};

/**
 * Apply theme to tokens
 * Phase 2: Theme-aware token resolution
 *
 * @param theme - Theme name ("light", "dark", "custom")
 * @returns Theme-adjusted design tokens
 */
export const applyTheme = (theme: Theme): DesignTokens => {
  console.log(`[Jxion-Styles] Applying theme: ${theme}`);

  // Create a deep copy of base tokens
  const themedTokens: DesignTokens = JSON.parse(JSON.stringify(designTokens));

  // Apply theme-specific overrides
  switch (theme) {
    case 'dark': {
      // Dark theme overrides
      themedTokens.colors.primary = {
        ...themedTokens.colors.primary,
        '500': '#f59e0b', // Keep primary accent
        '600': '#d97706',
      };
      themedTokens.colors.neutral = {
        '50': '#171717', // Inverted: dark becomes light
        '100': '#262626',
        '200': '#404040',
        '300': '#525252',
        '400': '#737373',
        '500': '#a3a3a3',
        '600': '#d4d4d4',
        '700': '#e5e5e5',
        '800': '#f5f5f5',
        '900': '#fafafa',
      };
      console.log(`[Jxion-Styles] Dark theme applied`);
      break;
    }
    case 'custom': {
      // Custom theme - can be extended with custom overrides
      // For now, return base tokens
      console.log(`[Jxion-Styles] Custom theme (using base tokens)`);
      break;
    }
    case 'light':
    default: {
      // Light theme is the default
      console.log(`[Jxion-Styles] Light theme (default)`);
      break;
    }
  }

  return themedTokens;
};

// Export design tokens as default export for convenience
export { default as designTokensDefault } from './tokens.json';

// Note: SCSS modules are imported directly in components (matching ustad pattern):
// import styles from '@jxion/styles/modules/Hero.module.scss';
// This matches the ustad pattern where components import SCSS directly
// The loader functions above are for dynamic/runtime style generation when needed
