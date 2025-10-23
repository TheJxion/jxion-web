/**
 * SolidJS Template Renderer
 * Renders HTML templates from @jxion-core as SolidJS JSX strings
 */

import { TemplateRenderer } from "./template-renderer";

export interface SolidJSRenderOptions {
  template: string;
  variables: Record<string, any>;
  styles: Record<string, string>;
}

export class SolidJSRenderer {
  /**
   * Renders HTML template as SolidJS JSX string
   */
  static render(options: SolidJSRenderOptions): string {
    const { template, variables, styles } = options;

    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to SolidJS JSX syntax
    let solidTemplate = renderedTemplate
      .replace(/onclick=/g, "onClick=") // onclick -> onClick
      .replace(/\{\{([^}]+)\}\}/g, "{$1}"); // {{var}} -> {var}

    // Map class names to styles object
    Object.keys(styles).forEach((className) => {
      const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
      solidTemplate = solidTemplate.replace(regex, (match, classList) => {
        const mappedClasses = classList
          .split(" ")
          .map((cls: string) => styles[cls] || cls)
          .join(" ");
        return `class="${mappedClasses}"`;
      });
    });

    return solidTemplate;
  }
}
