/**
 * SSR Stub for @jxion/core/utils/*
 *
 * This stub is used during SSR to prevent SvelteKit's client fetcher from being evaluated.
 * The real @jxion/core/utils will be loaded on the client side.
 */

// Stub for TemplateRenderer (used in case-study page)
export class TemplateRenderer {
  static render(options: {
    template: string;
    variables?: Record<string, any>;
  }): string {
    if (typeof window === 'undefined') {
      // During SSR, return template as-is (no variable substitution)
      // This prevents errors but won't do actual rendering
      return options.template || '';
    }
    throw new Error('TemplateRenderer.render should not be called during SSR');
  }
}

// Export for default import compatibility
export default TemplateRenderer;
