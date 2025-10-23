/**
 * @fileoverview Svelte Template Renderer
 *
 * Renders HTML templates from @jxion-core as Svelte template strings.
 * Provides optimized conversion from HTML to Svelte template syntax.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { TemplateRenderer } from "./template-renderer";

export interface SvelteRenderOptions {
  template: string;
  variables: Record<string, any>;
  styles: Record<string, string>;
}

/**
 * Svelte renderer for converting HTML templates to Svelte template syntax
 *
 * @todo(@janberk) Add Svelte 5 runes support
 * @todo(@janberk) Implement reactive statement conversion
 * @todo(@janberk) Add Svelte action mapping for complex interactions
 */
export class SvelteRenderer {
  /**
   * Renders HTML template as Svelte template string
   *
   * @param options - Render options including template, variables, and styles
   * @returns Svelte template string
   */
  static render(options: SvelteRenderOptions): string {
    const { template, variables, styles } = options;

    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to Svelte template syntax
    let svelteTemplate = renderedTemplate
      .replace(/onclick=/g, "on:click=") // onclick -> on:click
      .replace(/\{\{([^}]+)\}\}/g, "{$1}"); // {{var}} -> {var}

    // Map class names to styles object
    Object.keys(styles).forEach((className) => {
      const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
      svelteTemplate = svelteTemplate.replace(regex, (match, classList) => {
        const mappedClasses = classList
          .split(" ")
          .map((cls: string) => styles[cls] || cls)
          .join(" ");
        return `class="${mappedClasses}"`;
      });
    });

    return svelteTemplate;
  }
}
