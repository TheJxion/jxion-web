/**
 * Simple Template Renderer
 * Renders HTML templates from @jxion-core with variable replacement
 */

export interface TemplateRendererOptions {
  template: string;
  variables: Record<string, any>;
}

export class TemplateRenderer {
  /**
   * Renders a template by replacing variables
   */
  static render(options: TemplateRendererOptions): string {
    const { template, variables } = options;
    let result = template;

    // Replace all {{variable}} patterns with actual values
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      result = result.replace(regex, String(value || ""));
    });

    return result;
  }

  /**
   * Extracts variables from a template
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
