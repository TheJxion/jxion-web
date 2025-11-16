/**
 * @fileoverview Framework Converter
 *
 * Converts HTML templates to framework-specific syntax for optimal performance
 * and framework compatibility across React, Vue, Svelte, SolidJS, and Angular.
 */

import { TemplateRenderer } from "./template-renderer";
import { debug } from "./debug";

export interface FrameworkConverterOptions {
  template: string;
  variables: Record<string, any>;
  framework: "react" | "vue" | "svelte" | "solidjs" | "angular";
}

/**
 * Framework-specific template converter with optimized transformations
 *
 * @todo(@janberk) Add AST-based conversion for better performance
 * @todo(@janberk) Implement framework-specific optimizations
 * @todo(@janberk) Add validation for framework-specific syntax
 */
export class FrameworkConverter {
  /**
   * Converts HTML template to React JSX
   */
  static toReact(template: string, variables: Record<string, any>): string {
    debug.startTimer("framework-convert-react");
    debug.logFrameworkConversion("html", "react", "template");

    const renderedTemplate = TemplateRenderer.render({ template, variables });

    debug.frameworkConversion(
      "debug",
      "Applying React-specific transformations",
      {
        operation: "convert",
        framework: "react",
        metadata: {
          originalLength: renderedTemplate.length,
          transformations: [
            "class -> className",
            "onclick -> onClick",
            "for -> htmlFor",
            "{{}} -> {}",
          ],
        },
      }
    );

    const result = renderedTemplate
      .replace(/class=/g, "className=")
      .replace(/onclick=/g, "onClick=")
      .replace(/for=/g, "htmlFor=")
      .replace(/\{\{([^}]+)\}\}/g, "{$1}");

    debug.frameworkConversion("info", "React conversion completed", {
      operation: "convert",
      framework: "react",
      metadata: {
        originalLength: renderedTemplate.length,
        finalLength: result.length,
        transformationsApplied: 4,
      },
    });

    debug.endTimer("framework-convert-react", { framework: "react" });
    return result;
  }

  /**
   * Converts HTML template to Vue template
   */
  static toVue(template: string, variables: Record<string, any>): string {
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    return renderedTemplate
      .replace(/class=/g, ":class=")
      .replace(/onclick=/g, "@click=")
      .replace(/\{\{([^}]+)\}\}/g, "{{ $1 }}");
  }

  /**
   * Converts HTML template to Svelte template
   */
  static toSvelte(template: string, variables: Record<string, any>): string {
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    return renderedTemplate
      .replace(/onclick=/g, "on:click=")
      .replace(/\{\{([^}]+)\}\}/g, "{$1}");
  }

  /**
   * Converts HTML template to SolidJS JSX
   */
  static toSolidJS(template: string, variables: Record<string, any>): string {
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    return renderedTemplate
      .replace(/onclick=/g, "onClick=")
      .replace(/\{\{([^}]+)\}\}/g, "{$1}");
  }

  /**
   * Converts HTML template to Angular template
   */
  static toAngular(template: string, variables: Record<string, any>): string {
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    return renderedTemplate
      .replace(/class=/g, "[class]=")
      .replace(/onclick=/g, "(click)=")
      .replace(/\{\{([^}]+)\}\}/g, "{{ $1() }}");
  }

  /**
   * Main converter method with framework routing
   */
  static convert(options: FrameworkConverterOptions): string {
    const { template, variables, framework } = options;

    debug.startTimer(`framework-convert-${framework}`);
    debug.logFrameworkConversion("html", framework, "template");

    debug.frameworkConversion("info", `Starting conversion to ${framework}`, {
      operation: "convert",
      framework,
      metadata: {
        templateLength: template.length,
        variableCount: Object.keys(variables).length,
        supportedFrameworks: ["react", "vue", "svelte", "solidjs", "angular"],
      },
    });

    let result: string;

    try {
      switch (framework) {
        case "react":
          result = this.toReact(template, variables);
          break;
        case "vue":
          result = this.toVue(template, variables);
          break;
        case "svelte":
          result = this.toSvelte(template, variables);
          break;
        case "solidjs":
          result = this.toSolidJS(template, variables);
          break;
        case "angular":
          result = this.toAngular(template, variables);
          break;
        default:
          throw new Error(`Unsupported framework: ${framework}`);
      }

      debug.frameworkConversion(
        "info",
        `Conversion to ${framework} completed successfully`,
        {
          operation: "convert",
          framework,
          metadata: {
            originalLength: template.length,
            finalLength: result.length,
            success: true,
          },
        }
      );
    } catch (error) {
      debug.frameworkConversion("error", `Conversion to ${framework} failed`, {
        operation: "convert",
        framework,
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error",
          success: false,
        },
      });
      throw error;
    } finally {
      debug.endTimer(`framework-convert-${framework}`, { framework });
    }

    return result;
  }
}
