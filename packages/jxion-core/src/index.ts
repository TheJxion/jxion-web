/**
 * @fileoverview Jxion Framework Core Package
 *
 * Central business logic, templates, and utilities for the Jxion multi-framework
 * component library. Provides unified APIs across React, Vue, Svelte, SolidJS, and Angular.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

// Core business logic and tRPC integration
export * from "./trpc/client";
export { useMessages } from "./hooks/useMessages";
export { useGreetings } from "./hooks/useGreetings";
export { MessageService, messageService } from "./services/messageService";
export { GreetingService, greetingService } from "./services/greetingService";

// Type definitions
export * from "./types/api";
export * from "./types/message";

// Template system and component registry
export * from "./templates";
export * from "./registry/component.registry";

// Framework-agnostic hooks system
export * from "./hooks";

// Framework configuration and utilities
export {
  frameworkConfigs,
  getFrameworkConfig,
  getFrontendFrameworks,
  getMetaFrameworks,
  getMetaFrameworksForBase,
  supportsFeature,
} from "./config/framework.config";

// Template rendering utilities
export * from "./utils/template-renderer";
export * from "./utils/framework-converter";
export * from "./utils/jsx-renderer";
export * from "./utils/vue-renderer";
export * from "./utils/svelte-renderer";
export * from "./utils/solidjs-renderer";

// Debug utilities
export * from "./utils/debug";
