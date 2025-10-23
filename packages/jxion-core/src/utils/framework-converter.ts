/**
 * @fileoverview Framework Converter
 *
 * Converts HTML templates to framework-specific syntax for optimal performance
 * and framework compatibility across React, Vue, Svelte, SolidJS, and Angular.
 */

import { TemplateRenderer } from "./template-renderer";

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
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    return renderedTemplate
      .replace(/class=/g, "className=")
      .replace(/onclick=/g, "onClick=")
      .replace(/for=/g, "htmlFor=")
      .replace(/\{\{([^}]+)\}\}/g, "{$1}");
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

    switch (framework) {
      case "react":
        return this.toReact(template, variables);
      case "vue":
        return this.toVue(template, variables);
      case "svelte":
        return this.toSvelte(template, variables);
      case "solidjs":
        return this.toSolidJS(template, variables);
      case "angular":
        return this.toAngular(template, variables);
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }
  }
}
