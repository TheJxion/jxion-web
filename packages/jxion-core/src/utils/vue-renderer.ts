/**
 * Vue Template Renderer
 * Renders HTML templates from @jxion-core as Vue template strings
 */

import { TemplateRenderer } from "./template-renderer";

export interface VueRenderOptions {
  template: string;
  variables: Record<string, any>;
  styles: Record<string, string>;
}

export class VueRenderer {
  /**
   * Renders HTML template as Vue template string
   */
  static render(options: VueRenderOptions): string {
    const { template, variables, styles } = options;

    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to Vue template syntax
    let vueTemplate = renderedTemplate
      .replace(/class=/g, ":class=") // class -> :class
      .replace(/onclick=/g, "@click=") // onclick -> @click
      .replace(/\{\{([^}]+)\}\}/g, "{{ $1 }}"); // {{var}} -> {{ var }}

    // Map class names to styles object
    Object.keys(styles).forEach((className) => {
      const regex = new RegExp(`:class="([^"]*\\b${className}\\b[^"]*)"`, "g");
      vueTemplate = vueTemplate.replace(regex, (match, classList) => {
        const mappedClasses = classList
          .split(" ")
          .map((cls: string) => styles[cls] || cls)
          .join(" ");
        return `:class="${mappedClasses}"`;
      });
    });

    return vueTemplate;
  }
}
