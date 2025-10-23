/**
 * @fileoverview Component Registry
 *
 * Central registry for all Jxion components with metadata, examples, and framework support.
 * Provides type-safe component discovery and documentation generation.
 */

import { debug } from "../utils/debug";

export interface ComponentMetadata {
  name: string;
  version: string;
  category: string;
  description: string;
  props: Record<string, any>;
  examples: ComponentExample[];
  frameworks: string[];
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  framework: string;
}

export interface ComponentRegistry {
  [key: string]: ComponentMetadata;
}

/**
 * Central component registry with metadata and examples
 *
 * @todo(@janberk) Add component validation and testing
 * @todo(@janberk) Implement dynamic component loading
 * @todo(@janberk) Add component versioning and migration tools
 */
export const componentRegistry: ComponentRegistry = {
  hero: {
    name: "Hero",
    version: "1.0.0",
    category: "Layout",
    description:
      "Hero section component with title, subtitle, description, and CTA",
    props: {
      title: "string",
      subtitle: "string",
      description: "string",
      ctaText: "string",
      statsValue: "string",
      statsLabel: "string",
      cardSubtitle: "string",
      testId: "string",
      onCtaClick: "function",
    },
    examples: [
      {
        title: "Basic Hero",
        description: "Simple hero section with title and CTA",
        code: `<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
/>`,
        framework: "react",
      },
      {
        title: "Hero with Stats",
        description: "Hero section with statistics card",
        code: `<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
  statsValue="7"
  statsLabel="Years Experience"
  cardSubtitle="Trusted by developers"
/>`,
        framework: "vue",
      },
    ],
    frameworks: ["react", "vue", "svelte", "solidjs", "angular"],
  },
};

/**
 * Get component metadata by name
 *
 * @param name - Component name
 * @returns Component metadata or undefined
 */
export function getComponent(name: string): ComponentMetadata | undefined {
  debug.startTimer(`getComponent-${name}`);
  debug.logComponentRegistry("get", name, {
    availableComponents: Object.keys(componentRegistry),
  });

  const component = componentRegistry[name];

  if (component) {
    debug.component("info", `Found component: ${name}`, {
      component: name,
      operation: "get",
      metadata: {
        version: component.version,
        category: component.category,
        frameworks: component.frameworks,
        propCount: Object.keys(component.props).length,
        exampleCount: component.examples.length,
      },
    });
  } else {
    debug.component("warn", `Component not found: ${name}`, {
      component: name,
      operation: "get",
      metadata: { availableComponents: Object.keys(componentRegistry) },
    });
  }

  debug.endTimer(`getComponent-${name}`, { component: name });
  return component;
}

/**
 * Get all components by category
 *
 * @param category - Component category
 * @returns Array of component metadata
 */
export function getComponentsByCategory(category: string): ComponentMetadata[] {
  debug.startTimer(`getComponentsByCategory-${category}`);
  debug.logComponentRegistry("getByCategory", category, {
    totalComponents: Object.keys(componentRegistry).length,
  });

  const components = Object.values(componentRegistry).filter(
    (component) => component.category === category
  );

  debug.component(
    "info",
    `Found ${components.length} components in category: ${category}`,
    {
      operation: "getByCategory",
      metadata: {
        category,
        componentCount: components.length,
        componentNames: components.map((c) => c.name),
      },
    }
  );

  debug.endTimer(`getComponentsByCategory-${category}`, {
    category,
    count: components.length,
  });
  return components;
}

/**
 * Get all components for a specific framework
 *
 * @param framework - Framework name
 * @returns Array of component metadata
 */
export function getComponentsByFramework(
  framework: string
): ComponentMetadata[] {
  debug.startTimer(`getComponentsByFramework-${framework}`);
  debug.logComponentRegistry("getByFramework", framework, {
    totalComponents: Object.keys(componentRegistry).length,
  });

  const components = Object.values(componentRegistry).filter((component) =>
    component.frameworks.includes(framework)
  );

  debug.component(
    "info",
    `Found ${components.length} components for framework: ${framework}`,
    {
      operation: "getByFramework",
      metadata: {
        framework,
        componentCount: components.length,
        componentNames: components.map((c) => c.name),
        frameworks: components.map((c) => c.frameworks),
      },
    }
  );

  debug.endTimer(`getComponentsByFramework-${framework}`, {
    framework,
    count: components.length,
  });
  return components;
}

/**
 * Get all available frameworks
 *
 * @returns Array of framework names
 */
export function getAvailableFrameworks(): string[] {
  const frameworks = new Set<string>();
  Object.values(componentRegistry).forEach((component) => {
    component.frameworks.forEach((framework) => frameworks.add(framework));
  });
  return Array.from(frameworks);
}

/**
 * Get all available categories
 *
 * @returns Array of category names
 */
export function getAvailableCategories(): string[] {
  const categories = new Set<string>();
  Object.values(componentRegistry).forEach((component) => {
    categories.add(component.category);
  });
  return Array.from(categories);
}

/**
 * Search components by name or description
 *
 * @param query - Search query
 * @returns Array of matching component metadata
 */
export function searchComponents(query: string): ComponentMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(componentRegistry).filter(
    (component) =>
      component.name.toLowerCase().includes(lowercaseQuery) ||
      component.description.toLowerCase().includes(lowercaseQuery) ||
      component.category.toLowerCase().includes(lowercaseQuery)
  );
}
