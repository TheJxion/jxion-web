/**
 * Jxion Stack — Component Loader
 * Cleanup Integration: Consolidated during safe merge pass (2025-11-13)
 * Description: Dynamically loads and renders components from the registry
 *
 * This module provides:
 * - Runtime component loading from registry
 * - Template-based HTML generation
 * - Framework-aware rendering (React, Vue, Svelte, SolidJS, Angular, HTML)
 *
 * Source: Preserved runtime logic from existing template system
 * Phase: Phase 2 — Component Registry & Styling Runtime
 */

import {
  getComponent,
  type ComponentMetadata,
} from '../registry/component.registry';
import { heroTemplate } from '../templates/hero.template';
import { makeupTemplate } from '../templates/makeup.template';
import { keyFeaturesTemplate } from '../templates/keyFeatures.template';
import { featuresCarouselTemplate } from '../templates/featuresCarousel.template';
import { integrationSolutionsTemplate } from '../templates/integrationSolutions.template';
import { whatsOurImpactTemplate } from '../templates/whatsOurImpact.template';
import { whyYesildefterTemplate } from '../templates/whyYesildefter.template';
import { nextStepsTemplate } from '../templates/nextSteps.template';
import { sectionTemplate } from '../templates/section.template';
import { whyNoirTemplate } from '../templates/whyNoir.template';
import { motifsTemplate } from '../templates/motifs.template';
import { newsletterTemplate } from '../templates/newsletter.template';
import { TemplateRenderer } from './template-renderer';
import { SvelteRenderer } from './svelte-renderer';

export type Framework =
  | 'react'
  | 'vue'
  | 'svelte'
  | 'solidjs'
  | 'angular'
  | 'html';

export interface ComponentLoadOptions {
  componentId: string;
  framework: Framework;
  props: Record<string, any>;
}

export interface ComponentLoadResult {
  html: string;
  code?: string;
  metadata: ComponentMetadata;
}

// Template map - maps component IDs to their templates
const templateMap: Record<string, any> = {
  hero: heroTemplate,
  makeup: makeupTemplate,
  keyFeatures: keyFeaturesTemplate,
  featuresCarousel: featuresCarouselTemplate,
  integrationSolutions: integrationSolutionsTemplate,
  whatsOurImpact: whatsOurImpactTemplate,
  whyYesildefter: whyYesildefterTemplate,
  nextSteps: nextStepsTemplate,
  section: sectionTemplate,
  whyNoir: whyNoirTemplate,
  motifs: motifsTemplate,
  newsletter: newsletterTemplate,
};

/**
 * Get template for a component
 */
function getComponentTemplate(componentId: string): any {
  const template = templateMap[componentId];
  if (!template) {
    throw new Error(`Template not found for component: ${componentId}`);
  }
  return template;
}

/**
 * Load and render a component from the registry
 */
export async function loadComponent(
  options: ComponentLoadOptions
): Promise<ComponentLoadResult> {
  const { componentId, framework, props } = options;

  // Get component metadata from registry
  const metadata = getComponent(componentId);
  if (!metadata) {
    throw new Error(`Component not found in registry: ${componentId}`);
  }

  // Check if framework is supported (html is always supported as universal fallback)
  if (framework !== 'html' && !metadata.frameworks.includes(framework)) {
    throw new Error(
      `Framework ${framework} not supported for component ${componentId}. Supported: ${metadata.frameworks.join(
        ', '
      )}`
    );
  }

  // Get template for component
  const template = getComponentTemplate(componentId);

  // Render based on framework
  let html: string = '';
  let code: string | undefined;

  if (framework === 'html') {
    // Render HTML template directly
    html = TemplateRenderer.render({
      template: template.html,
      variables: props,
    });
  } else if (framework === 'svelte') {
    // For Svelte, if no svelte template exists, fall back to HTML
    const svelteCode = template.svelte || template[framework];
    if (!svelteCode) {
      // Fallback to HTML template if Svelte template doesn't exist
      console.warn(
        `[ComponentLoader] Svelte template not found for ${componentId}, using HTML template`
      );
      html = TemplateRenderer.render({
        template: template.html,
        variables: props,
      });
    } else {
      // Render the Svelte template with props
      html = SvelteRenderer.render({
        template: template.html,
        variables: props,
        styles: {}, // Styles will be loaded separately
      });
      code = TemplateRenderer.render({
        template: svelteCode,
        variables: props,
      });
    }
  } else {
    // For other frameworks, render HTML as fallback
    // In production, these would use framework-specific renderers
    html = TemplateRenderer.render({
      template: template.html,
      variables: props,
    });

    // Get framework-specific code template if available
    const frameworkCode = template[framework];
    if (frameworkCode) {
      code = TemplateRenderer.render({
        template: frameworkCode,
        variables: props,
      });
    }
  }

  return {
    html,
    code,
    metadata,
  };
}

/**
 * Get component metadata without rendering
 */
export function getComponentMetadata(
  componentId: string
): ComponentMetadata | null {
  return getComponent(componentId) || null;
}

/**
 * Check if a component supports a framework
 */
export function supportsFramework(
  componentId: string,
  framework: Framework
): boolean {
  const metadata = getComponent(componentId);
  if (!metadata) return false;
  return metadata.frameworks.includes(framework);
}
