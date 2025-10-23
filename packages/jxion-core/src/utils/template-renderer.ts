/**
 * @fileoverview Template Renderer
 *
 * High-performance template rendering with variable substitution for the Jxion framework.
 * Optimized for minimal memory allocation and maximum rendering speed.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { debug } from "./debug";

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
    debug.startTimer("template-render");

    debug.template("info", "Starting template rendering", {
      operation: "render",
      metadata: {
        templateLength: template.length,
        variableCount: Object.keys(variables).length,
        variables: Object.keys(variables),
      },
    });

    let result = template;
    let replacementCount = 0;

    // Optimized variable replacement using single pass
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      const matches = result.match(regex);
      if (matches) {
        replacementCount += matches.length;
        result = result.replace(regex, String(value || ""));
        debug.template("debug", `Replaced variable: ${key}`, {
          operation: "replace",
          metadata: {
            variable: key,
            value: String(value || ""),
            replacementCount: matches.length,
          },
        });
      }
    });

    debug.template("info", "Template rendering completed", {
      operation: "render",
      metadata: {
        totalReplacements: replacementCount,
        finalLength: result.length,
        originalLength: template.length,
      },
    });

    debug.endTimer("template-render", {
      replacementCount,
      originalLength: template.length,
      finalLength: result.length,
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
