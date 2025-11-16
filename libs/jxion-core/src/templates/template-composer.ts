/**
 * Jxion Stack — Template Composer
 * Phase Reference: Phase 3 — Template Composition & Page Assembly
 * Description: JSON-driven page assembly and template composition
 * Date: 2025-11-13
 *
 * This module provides:
 * - JSON-driven layout schema parsing
 * - Runtime template composition
 * - SSR/CSR rendering support
 * - Template validation
 */

import {
  loadComponent,
  type ComponentLoadResult,
} from '../utils/component-loader';

// Define Locale type locally to avoid build-time dependency
export type Locale = 'tr-TR' | 'en-US';

// Dynamic import for getTranslations and loadTranslations to avoid build-time dependency issues
async function getTranslations(
  keys: string[],
  locale: Locale = 'tr-TR'
): Promise<Record<string, any>> {
  try {
    // Try to import from @jxion/i18n at runtime (using @ts-ignore to avoid type checking)
    // @ts-ignore - Dynamic import, module may not be available at build time
    const i18nModule = await import('@jxion/i18n');
    if (i18nModule && typeof i18nModule.getDictionary === 'function') {
      // Load the full translation dictionary to preserve objects/arrays
      const translations = await i18nModule.getDictionary(locale);

      // Helper to get nested value
      const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((current, key) => {
          return current && typeof current === 'object'
            ? current[key]
            : undefined;
        }, obj);
      };

      const result: Record<string, any> = {};
      for (const key of keys) {
        const value = getNestedValue(translations, key);
        // Preserve objects and arrays as-is, only convert primitives to strings
        if (value !== undefined) {
          result[key] = value;
        } else {
          result[key] = key; // Fallback to key name
        }
      }
      return result;
    }
  } catch (error) {
    console.warn(
      '[TemplateComposer] @jxion/i18n not available, using fallback',
      error
    );
  }

  // Fallback: return keys as values
  const result: Record<string, any> = {};
  for (const key of keys) {
    result[key] = key;
  }
  return result;
}

export interface TemplateSection {
  component: string;
  props?: Record<string, any>;
  localeKey?: string;
  variant?: string;
}

export interface TemplateSchema {
  id: string;
  version?: string;
  sections: TemplateSection[];
  metadata?: {
    title?: string;
    description?: string;
    locale?: Locale;
  };
}

export interface ComposedPage {
  id: string;
  sections: ComponentLoadResult[];
  metadata: TemplateSchema['metadata'];
  renderTime: number;
}

/**
 * Template Composer
 * Phase 3: Composes pages from JSON template definitions
 */
export class TemplateComposer {
  /**
   * Compose a page from template schema
   * Phase 3: Main composition function
   */
  static async compose(
    schema: TemplateSchema,
    locale: Locale = 'tr-TR',
    framework:
      | 'react'
      | 'vue'
      | 'svelte'
      | 'solidjs'
      | 'angular'
      | 'html' = 'svelte'
  ): Promise<ComposedPage> {
    const startTime = performance.now();
    console.log(
      `[TemplateComposer] Rendering ${schema.sections.length} sections from ${schema.id}.json`
    );

    const sections: ComponentLoadResult[] = [];
    const errors: string[] = [];

    for (const [index, section] of schema.sections.entries()) {
      try {
        console.log(
          `[TemplateComposer] Rendering section ${index + 1}/${
            schema.sections.length
          }: ${section.component}`
        );

        // Resolve component ID and variant
        const [componentId, variant] = section.component.split('.');

        // Load translations if localeKey is provided
        let props: Record<string, any> = {};
        if (section.localeKey && section.props) {
          // Build translation keys from props mapping
          // Schema format: { "title": "title", "subtitle": "subtitle" }
          // This means: prop name "title" maps to translation key "home.hero.title"
          const translationKeys = Object.keys(section.props).map((propKey) => {
            // The prop value in schema is the translation key suffix
            const translationKeySuffix = section.props![propKey];
            return `${section.localeKey}.${translationKeySuffix}`;
          });

          const translations = await getTranslations(translationKeys, locale);

          // Map translations back to prop names
          for (const propKey of Object.keys(section.props)) {
            const translationKeySuffix = section.props![propKey];
            const fullTranslationKey = `${section.localeKey}.${translationKeySuffix}`;
            const translationValue = translations[fullTranslationKey];

            // Use translation value if available and not a placeholder
            // Preserve objects and arrays as-is (don't convert to string)
            if (
              translationValue !== undefined &&
              translationValue !== fullTranslationKey
            ) {
              // If it's a string that equals the key, it's a placeholder - skip it
              if (
                typeof translationValue === 'string' &&
                translationValue === fullTranslationKey
              ) {
                props[propKey] = translationKeySuffix;
              } else {
                // Use the actual value (could be string, object, or array)
                props[propKey] = translationValue;
              }
            } else {
              // Fallback: use the translation key suffix as value
              props[propKey] = translationKeySuffix;
            }
          }
        } else {
          // No localeKey, use props as-is
          props = { ...(section.props || {}) };
        }

        // Load component - use provided framework or fallback to HTML
        const componentResult = await loadComponent({
          componentId,
          framework: framework || 'html',
          props,
        });

        sections.push(componentResult);
        console.log(
          `[TemplateComposer] ✅ Section ${index + 1} rendered: ${
            section.component
          }`
        );
      } catch (error) {
        const errorMsg = `Failed to render section ${index + 1} (${
          section.component
        }): ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(`[TemplateComposer] ❌ ${errorMsg}`);
        errors.push(errorMsg);
      }
    }

    const renderTime = performance.now() - startTime;

    if (errors.length > 0) {
      console.warn(`[TemplateComposer] Completed with ${errors.length} errors`);
    } else {
      console.log(
        `[TemplateComposer] ✅ All sections rendered in ${renderTime.toFixed(
          2
        )}ms`
      );
    }

    return {
      id: schema.id,
      sections,
      metadata: {
        ...schema.metadata,
        locale,
      },
      renderTime,
    };
  }

  /**
   * Validate template schema
   * Phase 3: Schema validation (basic structure check)
   */
  static validate(schema: TemplateSchema): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!schema.id) {
      errors.push("Template schema must have an 'id' field");
    }

    if (!Array.isArray(schema.sections)) {
      errors.push("Template schema must have a 'sections' array");
    } else {
      schema.sections.forEach((section, index) => {
        if (!section.component) {
          errors.push(`Section ${index + 1} must have a 'component' field`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Render composed page to HTML
   * Phase 3: Generate final HTML output
   */
  static renderToHTML(composed: ComposedPage): string {
    console.log(
      `[TemplateComposer] Rendering ${composed.sections.length} sections to HTML`
    );

    const sectionsHTML = composed.sections
      .map((section) => section.html)
      .join('\n');

    return `
      <div data-template-id="${
        composed.id
      }" data-render-time="${composed.renderTime.toFixed(2)}ms">
        ${sectionsHTML}
      </div>
    `;
  }
}
