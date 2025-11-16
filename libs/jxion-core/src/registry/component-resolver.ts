/**
 * Jxion Stack — Component Resolver
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Runtime component resolver for framework-specific implementations
 * Date: 2025-11-13
 *
 * This module provides:
 * - Runtime component resolution by ID and framework
 * - Component path resolution
 * - Framework adapter mapping
 * - Version-aware component loading
 */

import { getComponent, type ComponentMetadata } from "./component.registry";

export interface ComponentResolverOptions {
  id: string;
  framework: string;
  version?: string;
}

export interface ResolvedComponent {
  id: string;
  framework: string;
  metadata: ComponentMetadata;
  componentPath?: string;
  adapter?: string;
}

/**
 * Resolve component by ID and framework
 * Phase 2: Runtime resolver that maps canonical IDs to framework implementations
 */
export function resolveComponent(
  options: ComponentResolverOptions
): ResolvedComponent | null {
  const { id, framework, version } = options;

  console.log(
    `[Jxion-Core] Resolving component: ${id} (${framework}${
      version ? ` v${version}` : ""
    })`
  );

  // Get component metadata from registry
  const metadata = getComponent(id);
  if (!metadata) {
    console.warn(`[Jxion-Core] Component not found in registry: ${id}`);
    return null;
  }

  // Check framework support
  if (!metadata.frameworks.includes(framework)) {
    console.warn(
      `[Jxion-Core] Framework ${framework} not supported for ${id}. Supported: ${metadata.frameworks.join(
        ", "
      )}`
    );
    return null;
  }

  // Resolve component path based on framework
  // In production, this would map to actual component files
  const componentPath = resolveComponentPath(id, framework);
  const adapter = resolveAdapter(framework);

  const resolved: ResolvedComponent = {
    id,
    framework,
    metadata,
    componentPath,
    adapter,
  };

  console.log(`[Jxion-Core] Component resolved:`, {
    id: resolved.id,
    framework: resolved.framework,
    version: metadata.version,
    path: resolved.componentPath,
  });

  return resolved;
}

/**
 * Resolve component file path
 * Phase 2: Maps component ID + framework to file path
 */
function resolveComponentPath(id: string, framework: string): string {
  // In production, this would resolve to actual file paths
  // For now, return a logical path structure
  const basePath = `@jxion/design/src/components/${id}`;

  const frameworkExtensions: Record<string, string> = {
    react: ".tsx",
    vue: ".vue",
    svelte: ".svelte",
    solidjs: ".tsx",
    angular: ".ts",
    html: ".html",
  };

  const ext = frameworkExtensions[framework] || ".tsx";
  return `${basePath}${ext}`;
}

/**
 * Resolve framework adapter
 * Phase 2: Returns adapter name for framework-specific rendering
 */
function resolveAdapter(framework: string): string {
  const adapters: Record<string, string> = {
    react: "@jxion/core/adapters/react",
    vue: "@jxion/core/adapters/vue",
    svelte: "@jxion/core/adapters/svelte",
    solidjs: "@jxion/core/adapters/solidjs",
    angular: "@jxion/core/adapters/angular",
    html: "@jxion/core/adapters/html",
  };

  return adapters[framework] || adapters["html"];
}

/**
 * Get all resolvable components for a framework
 * Phase 2: Returns all components that support a given framework
 */
export function getResolvableComponents(
  framework: string
): ResolvedComponent[] {
  const metadata = getComponent("hero"); // Example - in production, iterate all
  if (!metadata || !metadata.frameworks.includes(framework)) {
    return [];
  }

  const resolved = resolveComponent({ id: "hero", framework });
  return resolved ? [resolved] : [];
}
