/**
 * Jxion Stack — Core Package
 *
 * This package provides the core functionality for the Jxion framework:
 * - HTML templates with variable substitution
 * - Framework renderers (Svelte, Vue, SolidJS, JSX)
 * - Content Manager for JSON content loading and live updates
 * - Component registry and resolver
 * - Framework adapters (Link, Image) for React/Svelte/Vue
 * - Template composition and rendering utilities
 *
 * @packageDocumentation
 */

// Type definitions
export * from './types';

// Template system and component registry
export * from './templates';
export * from './templates/template-composer';
export * from './templates/template-loader';
export * from './registry/component.registry';
export * from './registry/component-resolver';

// Framework-agnostic hooks system (useState, useEffect, etc.)
export * from './hooks';

// Framework configuration and utilities
export {
  frameworkConfigs,
  getFrameworkConfig,
  getFrontendFrameworks,
  getMetaFrameworks,
  getMetaFrameworksForBase,
  supportsFeature,
} from './config/framework.config';

// Template rendering utilities
export * from './utils/template-renderer';
export { TemplateRenderer } from './utils/template-renderer';
export type { TemplateRendererOptions } from './utils/template-renderer';
export * from './utils/framework-converter';
export * from './utils/jsx-renderer';
export * from './utils/vue-renderer';
export * from './utils/svelte-renderer';
export * from './utils/solidjs-renderer';
export * from './utils/component-loader';
export * from './utils/component-converter';
export type {
  SourceFramework,
  TargetFramework,
  ComponentConversionOptions,
  ConversionResult,
} from './utils/component-converter';

// Debug utilities
export * from './utils/debug';

// Framework adapters (Link, Image, Svelte, Vue)
export * from './adapters';

// Content manager for live updates
export * from './content-manager';
export { getContentManager, createContentManager } from './content-manager';
export type {
  ContentManagerOptions,
  ContentUpdate,
  ContentFile,
} from './content-manager';
