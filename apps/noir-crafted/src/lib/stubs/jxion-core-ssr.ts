/**
 * SSR Stub for @jxion/core
 *
 * This stub is used during SSR to prevent SvelteKit's client fetcher from being evaluated.
 * The real @jxion/core will be loaded on the client side.
 */

// Stub exports that match what we use from @jxion/core
export const createContentManager = (...args: any[]) => {
  if (typeof window === 'undefined') {
    throw new Error('createContentManager cannot be used during SSR');
  }
  // This should never be called during SSR
  return null;
};

// Stub for TemplateRenderer (used in case-study page)
export class TemplateRenderer {
  static render(options: {
    template: string;
    variables?: Record<string, any>;
  }): string {
    if (typeof window === 'undefined') {
      // During SSR, return template as-is (no variable substitution)
      return options.template || '';
    }
    throw new Error('TemplateRenderer.render should not be called during SSR');
  }
}

// Stub for SvelteRenderer (used in Hero.svelte, Section.svelte)
export class SvelteRenderer {
  static render(options: {
    template: string;
    variables?: Record<string, any>;
    styles?: Record<string, string>;
  }): string {
    if (typeof window === 'undefined') {
      // During SSR, return template as-is
      return options.template || '';
    }
    throw new Error('SvelteRenderer.render should not be called during SSR');
  }
}

// Stub for templates (used in Hero.svelte, Section.svelte)
export const heroTemplate = '';
export const sectionTemplate = '';
export const cardTemplate = '';
export const layoutTemplate = '';
export const ctaTemplate = '';
export const buttonTemplate = '';
export const headerTemplate = '';
export const inputTemplate = '';
export const modalTemplate = '';
export const footerTemplate = '';
export const whyNoirTemplate = '';
export const motifsTemplate = '';
export const newsletterTemplate = '';

// Stub for TemplateComposer (used in homepage-template page)
export class TemplateComposer {
  static compose(options: any): any {
    if (typeof window === 'undefined') {
      return { components: [], metadata: {} };
    }
    throw new Error('TemplateComposer.compose should not be called during SSR');
  }
}

// Stub for loadTemplateSchema (used in homepage-template page)
export const loadTemplateSchema = async (...args: any[]): Promise<any> => {
  if (typeof window === 'undefined') {
    return {};
  }
  throw new Error('loadTemplateSchema should not be called during SSR');
};

// Stub for component loader (used in demo page)
export const loadComponent = async (...args: any[]): Promise<any> => {
  if (typeof window === 'undefined') {
    return null;
  }
  throw new Error('loadComponent should not be called during SSR');
};

export const getComponentMetadata = async (...args: any[]): Promise<any> => {
  if (typeof window === 'undefined') {
    return null;
  }
  throw new Error('getComponentMetadata should not be called during SSR');
};

// Type exports
export type Framework = 'react' | 'vue' | 'svelte' | 'angular' | 'solid';
export type TemplateSchema = any;
export type ComposedPage = any;

// Export empty object for type compatibility
export default {};
