/**
 * Templates Export
 * HTML templates for all frameworks
 * Located in @jxion/core
 */

export { heroTemplate } from "./hero.template";
export { cardTemplate } from "./card.template";
export { layoutTemplate } from "./layout.template";
export { ctaTemplate } from "./cta.template";
export { buttonTemplate } from "./button.template";
export { headerTemplate } from "./header.template";
export { inputTemplate } from "./input.template";
export { modalTemplate } from "./modal.template";
export { makeupTemplate } from "./makeup.template";
export { sectionTemplate } from "./section.template";
export { footerTemplate } from "./footer.template";

// Template utilities
export const templateUtils = {
  /**
   * Generate component template for specific framework
   */
  generateTemplate: (
    componentName: string,
    framework: string,
    props: Record<string, any>
  ) => {
    // Implementation for template generation
    return `<!-- Generated ${componentName} template for ${framework} -->`;
  },

  /**
   * Validate template syntax
   */
  validateTemplate: (template: string, framework: string) => {
    // Implementation for template validation
    return { valid: true, errors: [] };
  },

  /**
   * Extract template variables
   */
  extractVariables: (template: string) => {
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = variableRegex.exec(template)) !== null) {
      variables.push(match[1]);
    }

    return [...new Set(variables)];
  },
};
