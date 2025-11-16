/**
 * @fileoverview Framework Configuration
 *
 * Central configuration for all supported frameworks with their specific settings,
 * dependencies, and capabilities. Optimized for CLI project generation.
 */

import { debug } from "../utils/debug";

export interface FrameworkConfig {
  name: string;
  version: string;
  type: "frontend" | "meta-framework";
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  configFiles: string[];
  port: number;
  buildCommand: string;
  devCommand: string;
  features: string[];
  limitations: string[];
  baseFramework?: string;
  ssr?: boolean;
  staticGeneration?: boolean;
  apiRoutes?: boolean;
}

export interface MetaFrameworkConfig extends FrameworkConfig {
  baseFramework: string;
  ssr: boolean;
  staticGeneration: boolean;
  apiRoutes: boolean;
}

/**
 * Framework configurations for all supported frameworks
 *
 * @todo(@janberk) Add framework version compatibility checking
 * @todo(@janberk) Implement automatic dependency updates
 * @todo(@janberk) Add framework-specific optimization flags
 */
export const frameworkConfigs: Record<string, FrameworkConfig> = {
  // Frontend Frameworks
  react: {
    name: "React",
    version: "^18.2.0",
    type: "frontend",
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@jxion/react": "latest",
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.2.0",
      vite: "^5.4.0",
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    configFiles: ["vite.config.ts", "tsconfig.json"],
    port: 3001,
    buildCommand: "vite build",
    devCommand: "vite",
    features: ["JSX", "Hooks", "Context", "Suspense"],
    limitations: ["No built-in routing", "No SSR by default"],
  },

  vue: {
    name: "Vue",
    version: "^3.4.0",
    type: "frontend",
    dependencies: {
      vue: "^3.4.0",
      "@jxion/vue": "latest",
    },
    devDependencies: {
      "@vitejs/plugin-vue": "^5.0.0",
      vite: "^5.4.0",
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    configFiles: ["vite.config.ts", "tsconfig.json"],
    port: 3000,
    buildCommand: "vite build",
    devCommand: "vite",
    features: ["Composition API", "Reactivity", "Components", "Directives"],
    limitations: ["No built-in routing", "No SSR by default"],
  },

  svelte: {
    name: "Svelte",
    version: "^4.2.0",
    type: "frontend",
    dependencies: {
      svelte: "^4.2.0",
      "@jxion/svelte": "latest",
    },
    devDependencies: {
      "@sveltejs/vite-plugin-svelte": "^3.1.0",
      vite: "^5.4.0",
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    configFiles: ["vite.config.ts", "svelte.config.js", "tsconfig.json"],
    port: 3002,
    buildCommand: "vite build",
    devCommand: "vite",
    features: ["Compile-time optimization", "Reactivity", "Components"],
    limitations: ["No built-in routing", "No SSR by default"],
  },

  solidjs: {
    name: "SolidJS",
    version: "^1.8.0",
    type: "frontend",
    dependencies: {
      "solid-js": "^1.8.0",
      "solid-js/web": "^1.8.0",
      "@jxion/solidjs": "latest",
    },
    devDependencies: {
      "vite-plugin-solid": "^2.8.0",
      vite: "^5.4.0",
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    configFiles: ["vite.config.ts", "tsconfig.json"],
    port: 3004,
    buildCommand: "vite build",
    devCommand: "vite",
    features: ["Fine-grained reactivity", "JSX", "Signals"],
    limitations: ["No built-in routing", "No SSR by default"],
  },

  angular: {
    name: "Angular",
    version: "^18.0.0",
    type: "frontend",
    dependencies: {
      "@angular/core": "^18.0.0",
      "@angular/common": "^18.0.0",
      "@angular/platform-browser": "^18.0.0",
      "@angular/platform-browser-dynamic": "^18.0.0",
      "@jxion/angular": "latest",
    },
    devDependencies: {
      "@angular/cli": "^18.0.0",
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "ng serve",
      build: "ng build",
      test: "ng test",
    },
    configFiles: ["angular.json", "tsconfig.json", "tsconfig.app.json"],
    port: 3003,
    buildCommand: "ng build",
    devCommand: "ng serve",
    features: ["Dependency Injection", "RxJS", "TypeScript", "CLI"],
    limitations: ["Steeper learning curve", "Larger bundle size"],
  },

  // Meta Frameworks
  next: {
    name: "Next.js",
    version: "^14.0.0",
    type: "meta-framework",
    baseFramework: "react",
    dependencies: {
      next: "^14.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@jxion/react": "latest",
    },
    devDependencies: {
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    configFiles: ["next.config.js", "tsconfig.json"],
    port: 3000,
    buildCommand: "next build",
    devCommand: "next dev",
    features: ["SSR", "Static Generation", "API Routes", "File-based routing"],
    limitations: ["React only", "Vercel-specific features"],
    ssr: true,
    staticGeneration: true,
    apiRoutes: true,
  },

  nuxt: {
    name: "Nuxt",
    version: "^3.8.0",
    type: "meta-framework",
    baseFramework: "vue",
    dependencies: {
      nuxt: "^3.8.0",
      vue: "^3.4.0",
      "@jxion/vue": "latest",
    },
    devDependencies: {
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "nuxt dev",
      build: "nuxt build",
      start: "nuxt start",
    },
    configFiles: ["nuxt.config.ts", "tsconfig.json"],
    port: 3000,
    buildCommand: "nuxt build",
    devCommand: "nuxt dev",
    features: [
      "SSR",
      "Static Generation",
      "File-based routing",
      "Auto-imports",
    ],
    limitations: ["Vue only", "Nuxt-specific conventions"],
    ssr: true,
    staticGeneration: true,
    apiRoutes: true,
  },

  sveltekit: {
    name: "SvelteKit",
    version: "^2.0.0",
    type: "meta-framework",
    baseFramework: "svelte",
    dependencies: {
      "@sveltejs/kit": "^2.0.0",
      svelte: "^4.2.0",
      "@jxion/svelte": "latest",
    },
    devDependencies: {
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "vite dev",
      build: "vite build",
      preview: "vite preview",
    },
    configFiles: ["svelte.config.js", "vite.config.ts", "tsconfig.json"],
    port: 3000,
    buildCommand: "vite build",
    devCommand: "vite dev",
    features: [
      "SSR",
      "Static Generation",
      "File-based routing",
      "Progressive enhancement",
    ],
    limitations: ["Svelte only", "SvelteKit-specific conventions"],
    ssr: true,
    staticGeneration: true,
    apiRoutes: true,
  },

  solidstart: {
    name: "SolidStart",
    version: "^0.4.0",
    type: "meta-framework",
    baseFramework: "solidjs",
    dependencies: {
      "solid-start": "^0.4.0",
      "solid-js": "^1.8.0",
      "@jxion/solidjs": "latest",
    },
    devDependencies: {
      typescript: "~5.4.0",
    },
    scripts: {
      dev: "solid-start dev",
      build: "solid-start build",
      start: "solid-start start",
    },
    configFiles: ["solid-start.config.ts", "tsconfig.json"],
    port: 3000,
    buildCommand: "solid-start build",
    devCommand: "solid-start dev",
    features: ["SSR", "Static Generation", "File-based routing", "Islands"],
    limitations: ["SolidJS only", "Early stage"],
    ssr: true,
    staticGeneration: true,
    apiRoutes: true,
  },
};

/**
 * Get framework configuration by name
 *
 * @param name - Framework name
 * @returns Framework configuration or undefined
 */
export function getFrameworkConfig(name: string): FrameworkConfig | undefined {
  debug.startTimer(`getFrameworkConfig-${name}`);
  debug.logConfigLoad("framework", name, {
    availableFrameworks: Object.keys(frameworkConfigs),
  });

  const config = frameworkConfigs[name];

  if (config) {
    debug.configuration("info", `Found framework config: ${name}`, {
      operation: "get",
      metadata: {
        framework: name,
        type: config.type,
        version: config.version,
        port: config.port,
        featureCount: config.features.length,
        limitationCount: config.limitations.length,
        dependencyCount: Object.keys(config.dependencies).length,
        devDependencyCount: Object.keys(config.devDependencies).length,
      },
    });
  } else {
    debug.configuration("warn", `Framework config not found: ${name}`, {
      operation: "get",
      metadata: {
        framework: name,
        availableFrameworks: Object.keys(frameworkConfigs),
      },
    });
  }

  debug.endTimer(`getFrameworkConfig-${name}`, { framework: name });
  return config;
}

/**
 * Get all frontend frameworks
 *
 * @returns Array of frontend framework configurations
 */
export function getFrontendFrameworks(): FrameworkConfig[] {
  return Object.values(frameworkConfigs).filter(
    (config) => config.type === "frontend"
  );
}

/**
 * Get all meta-frameworks
 *
 * @returns Array of meta-framework configurations
 */
export function getMetaFrameworks(): MetaFrameworkConfig[] {
  return Object.values(frameworkConfigs).filter(
    (config) => config.type === "meta-framework"
  ) as MetaFrameworkConfig[];
}

/**
 * Get meta-frameworks for a specific base framework
 *
 * @param baseFramework - Base framework name
 * @returns Array of meta-framework configurations
 */
export function getMetaFrameworksForBase(
  baseFramework: string
): MetaFrameworkConfig[] {
  return getMetaFrameworks().filter(
    (config) => config.baseFramework === baseFramework
  );
}

/**
 * Get all available frameworks
 *
 * @returns Array of all framework names
 */
export function getAvailableFrameworks(): string[] {
  return Object.keys(frameworkConfigs);
}

/**
 * Check if a framework supports a specific feature
 *
 * @param framework - Framework name
 * @param feature - Feature name
 * @returns True if framework supports the feature
 */
export function supportsFeature(framework: string, feature: string): boolean {
  const config = getFrameworkConfig(framework);
  return config ? config.features.includes(feature) : false;
}
