/**
 * @fileoverview Template Renderer
 *
 * High-performance template rendering with variable substitution for the Jxion framework.
 * Optimized for minimal memory allocation and maximum rendering speed.
 */

export interface TemplateRendererOptions {
  template: string;
  variables: Record<string, any>;
}

/**
 * Template renderer with optimized variable substitution
 *
 * @todo(@janberk) Add template caching for improved performance
 * @todo(@janberk) Implement template compilation for production builds
 * @todo(@janberk) Add XSS protection for user-provided variables
 */
export class TemplateRenderer {
  /**
   * Renders template with variable substitution
   *
   * @param options - Template and variables to render
   * @returns Rendered HTML string
   */
  static render(options: TemplateRendererOptions): string {
    const { template, variables } = options;
    let result = template;

    // Optimized variable replacement using single pass
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      result = result.replace(regex, String(value || ""));
    });

    return result;
  }

  /**
   * Extracts all variables from template string
   *
   * @param template - Template string to analyze
   * @returns Array of unique variable names
   */
  static extractVariables(template: string): string[] {
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = variableRegex.exec(template)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return variables;
  }
}
