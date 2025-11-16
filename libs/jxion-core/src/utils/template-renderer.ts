/**
 * @fileoverview Template Renderer
 *
 * High-performance template rendering with variable substitution for the Jxion framework.
 * Optimized for minimal memory allocation and maximum rendering speed.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { debug } from './debug';

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
    debug.startTimer('template-render');

    debug.template('info', 'Starting template rendering', {
      operation: 'render',
      metadata: {
        templateLength: template.length,
        variableCount: Object.keys(variables).length,
        variables: Object.keys(variables),
      },
    });

    let result = template;
    let replacementCount = 0;

    // First pass: Handle nested object properties (e.g., {{title.regular}}, {{title.highlight}})
    // Extract all template variables including nested ones
    const nestedVarRegex = /\{\{(\w+(?:\.\w+)+)\}\}/g;
    let match;
    while ((match = nestedVarRegex.exec(template)) !== null) {
      const fullPath = match[1]; // e.g., "title.regular"
      const pathParts = fullPath.split('.');
      const rootKey = pathParts[0]; // e.g., "title"
      const nestedPath = pathParts.slice(1); // e.g., ["regular"]

      if (variables[rootKey] && typeof variables[rootKey] === 'object') {
        // Navigate through nested object
        let nestedValue: any = variables[rootKey];
        for (const part of nestedPath) {
          nestedValue = nestedValue?.[part];
        }

        if (nestedValue !== undefined) {
          const regex = new RegExp(
            `\\{\\{${fullPath.replace(/\./g, '\\.')}\\}\\}`,
            'g'
          );
          result = result.replace(regex, String(nestedValue));
          replacementCount++;
        }
      }
    }

    // Second pass: Handle simple variables and arrays
    Object.entries(variables).forEach(([key, value]) => {
      // Skip if this key was already handled as a nested property root
      const hasNestedUsage = new RegExp(`\\{\\{${key}\\.`).test(result);
      if (
        hasNestedUsage &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        // Don't replace the whole object if nested properties are used
        return;
      }

      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      const matches = result.match(regex);
      if (matches) {
        replacementCount += matches.length;
        // Handle arrays and objects by rendering as HTML
        let stringValue: string;
        if (Array.isArray(value)) {
          // Render array as HTML based on key name
          if (key === 'sections') {
            // Render whyNoir sections
            stringValue = value
              .map(
                (section: any) => `
              <div class="why-noir__section-item">
                <div class="why-noir__icon">${section.icon || ''}</div>
                <h3 class="why-noir__section-title">${section.title || ''}</h3>
                <p class="why-noir__section-description">${
                  section.description || ''
                }</p>
              </div>
            `
              )
              .join('');
          } else if (key === 'items') {
            // Render motifs items
            stringValue = value
              .map(
                (item: any) => `
              <div class="motifs__item">
                <h3 class="motifs__item-name">${item.name || ''}</h3>
                <p class="motifs__item-description">${
                  item.description || ''
                }</p>
              </div>
            `
              )
              .join('');
          } else if (key === 'stats') {
            // Render stats array
            stringValue = value
              .map(
                (stat: any) => `
              <div class="whats-our-impact__stat">
                <div class="whats-our-impact__stat-value">${
                  stat.value || ''
                }</div>
                <div class="whats-our-impact__stat-label">${
                  stat.label || ''
                }</div>
              </div>
            `
              )
              .join('');
          } else {
            // Generic array rendering
            stringValue = value
              .map((item: any) => {
                if (typeof item === 'object' && item !== null) {
                  return `<div>${JSON.stringify(item)}</div>`;
                }
                return `<div>${String(item)}</div>`;
              })
              .join('');
          }
        } else if (typeof value === 'object' && value !== null) {
          // For objects that aren't arrays, stringify (but nested props already handled above)
          stringValue = JSON.stringify(value);
        } else {
          // Replace undefined/null with empty string
          stringValue =
            value !== undefined && value !== null ? String(value) : '';
        }
        result = result.replace(regex, stringValue);
        debug.template('debug', `Replaced variable: ${key}`, {
          operation: 'replace',
          metadata: {
            variable: key,
            value: stringValue.substring(0, 100), // Truncate for logging
            replacementCount: matches.length,
          },
        });
      }
    });

    debug.template('info', 'Template rendering completed', {
      operation: 'render',
      metadata: {
        totalReplacements: replacementCount,
        finalLength: result.length,
        originalLength: template.length,
      },
    });

    debug.endTimer('template-render', {
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
