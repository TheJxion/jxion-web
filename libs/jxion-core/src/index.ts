/**
 * Jxion Stack — Core Package
 * Cleanup Integration: Consolidated during safe merge pass (2025-11-13)
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime, Phase 3 — Template Composition
 * Description: Component registry + template composer base
 *
 * This package provides:
 * - Component registry linking canonical IDs to framework-specific implementations
 * - Template Composer for JSON-driven page assembly
 * - Framework-agnostic hooks and utilities
 * - tRPC integration for type-safe API contracts
 * - Runtime component loading via component-loader.ts
 *
 * PRESERVED: All existing runtime logic from packages/jxion-core
 * - Registry system (component.registry.ts)
 * - Template system (templates/*.ts)
 * - Framework renderers (utils/*-renderer.ts)
 * - Component loader (utils/component-loader.ts) - NEW in cleanup
 *
 * TODO (Phase 2): Finalize registry schema with component metadata, prop contracts, versioning
 * TODO (Phase 3): Implement TemplateComposer for JSON-driven page assembly
 * TODO (Phase 3): Add template parser, validation, and SSR/CSR rendering helpers
 */

// Core business logic and tRPC integration
export * from './trpc/client';
export { useMessages } from './hooks/useMessages';
export { useGreetings } from './hooks/useGreetings';
export { MessageService, messageService } from './services/messageService';
export { GreetingService, greetingService } from './services/greetingService';

// Type definitions
export * from './types/api';
export * from './types/message';

// Template system and component registry
export * from './templates';
export * from './templates/template-composer';
export * from './templates/template-loader';
export * from './registry/component.registry';
export * from './registry/component-resolver';

// Framework-agnostic hooks system
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
