/**
 * Template to Framework Converter
 * Converts HTML templates from @jxion-core to framework-specific syntax
 */

import { TemplateRenderer } from "./template-renderer";

export interface FrameworkConverterOptions {
  template: string;
  variables: Record<string, any>;
  framework: "react" | "vue" | "svelte" | "solidjs" | "angular";
}

export class FrameworkConverter {
  /**
   * Converts HTML template to React JSX
   */
  static toReact(template: string, variables: Record<string, any>): string {
    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to React JSX
    let jsx = renderedTemplate
      .replace(/class=/g, "className=") // class -> className
      .replace(/onclick=/g, "onClick=") // onclick -> onClick
      .replace(/for=/g, "htmlFor=") // for -> htmlFor
      .replace(/\{\{([^}]+)\}\}/g, "{$1}"); // {{var}} -> {var}

    return jsx;
  }

  /**
   * Converts HTML template to Vue template
   */
  static toVue(template: string, variables: Record<string, any>): string {
    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to Vue template syntax
    let vueTemplate = renderedTemplate
      .replace(/class=/g, ":class=") // class -> :class
      .replace(/onclick=/g, "@click=") // onclick -> @click
      .replace(/\{\{([^}]+)\}\}/g, "{{ $1 }}"); // {{var}} -> {{ var }}

    return vueTemplate;
  }

  /**
   * Converts HTML template to Svelte template
   */
  static toSvelte(template: string, variables: Record<string, any>): string {
    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to Svelte template syntax
    let svelteTemplate = renderedTemplate
      .replace(/onclick=/g, "on:click=") // onclick -> on:click
      .replace(/\{\{([^}]+)\}\}/g, "{$1}"); // {{var}} -> {var}

    return svelteTemplate;
  }

  /**
   * Converts HTML template to SolidJS JSX
   */
  static toSolidJS(template: string, variables: Record<string, any>): string {
    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to SolidJS JSX
    let solidTemplate = renderedTemplate
      .replace(/class=/g, "class=") // Keep class
      .replace(/onclick=/g, "onClick=") // onclick -> onClick
      .replace(/\{\{([^}]+)\}\}/g, "{$1}"); // {{var}} -> {var}

    return solidTemplate;
  }

  /**
   * Converts HTML template to Angular template
   */
  static toAngular(template: string, variables: Record<string, any>): string {
    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Convert HTML to Angular template syntax
    let angularTemplate = renderedTemplate
      .replace(/class=/g, "[class]=") // class -> [class]
      .replace(/onclick=/g, "(click)=") // onclick -> (click)
      .replace(/\{\{([^}]+)\}\}/g, "{{ $1() }}"); // {{var}} -> {{ var() }}

    return angularTemplate;
  }

  /**
   * Main converter method
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
