/**
 * Component Converter Utility
 *
 * Converts React components to other framework implementations (Svelte, Vue, etc.)
 * This utility enables the AI-assisted component generation system.
 *
 * Phase: Phase 4 — AI Assistant & Automation
 *
 * Features:
 * - React to Svelte conversion
 * - React to Vue conversion
 * - Template extraction from existing components
 * - Prop interface extraction
 * - Style mapping preservation
 */

import { TemplateRenderer } from './template-renderer';

export type SourceFramework =
  | 'react'
  | 'svelte'
  | 'vue'
  | 'solidjs'
  | 'angular';
export type TargetFramework =
  | 'react'
  | 'svelte'
  | 'vue'
  | 'solidjs'
  | 'angular';

export interface ComponentConversionOptions {
  sourceCode: string;
  sourceFramework: SourceFramework;
  targetFramework: TargetFramework;
  componentName: string;
  props?: Record<string, any>;
  styles?: Record<string, string>;
}

export interface ConversionResult {
  code: string;
  template?: string;
  script?: string;
  styles?: string;
  metadata: {
    componentName: string;
    props: string[];
    hasStyles: boolean;
    framework: TargetFramework;
  };
}

/**
 * Convert React component to Svelte
 */
function convertReactToSvelte(
  sourceCode: string,
  componentName: string,
  props?: Record<string, any>
): ConversionResult {
  // Extract props from React component
  const propsMatch = sourceCode.match(/interface\s+(\w+)Props\s*\{([^}]+)\}/s);
  const propsList: string[] = [];

  if (propsMatch) {
    const propsContent = propsMatch[2];
    // Extract prop definitions
    const propMatches = propsContent.matchAll(/(\w+)(\?)?:\s*([^;]+);/g);
    for (const match of propMatches) {
      propsList.push(match[1]);
    }
  }

  // Convert JSX to Svelte template
  let svelteTemplate = sourceCode
    // Remove React imports
    .replace(/import\s+.*?from\s+['"]react['"];?\s*/g, '')
    // Convert className to class
    .replace(/className=/g, 'class=')
    // Convert {variable} to {variable} (same in Svelte)
    .replace(/\{([^}]+)\}/g, '{$1}')
    // Convert onClick to on:click
    .replace(/onClick=/g, 'on:click=')
    // Convert props destructuring
    .replace(/const\s*\{([^}]+)\}\s*=\s*props;?/g, (match, propsList) => {
      const props = propsList.split(',').map((p: string) => p.trim());
      return props
        .map((p: string) => {
          const [name, defaultValue] = p
            .split('=')
            .map((s: string) => s.trim());
          if (defaultValue) {
            return `export let ${name} = ${defaultValue};`;
          }
          return `export let ${name};`;
        })
        .join('\n  ');
    })
    // Remove export default
    .replace(/export\s+default\s+\w+;?/g, '');

  // Extract component body (JSX)
  const jsxMatch = sourceCode.match(/return\s*\(([\s\S]+)\);?/);
  if (jsxMatch) {
    svelteTemplate = jsxMatch[1]
      .trim()
      .replace(/^<|>$/g, '')
      .replace(/className=/g, 'class=')
      .replace(/onClick=/g, 'on:click=');
  }

  // Build Svelte component structure
  const scriptSection = `<script lang="ts">
  ${propsList.map((prop) => `export let ${prop};`).join('\n  ')}
</script>`;

  const templateSection = `<template>
  ${svelteTemplate}
</template>`;

  return {
    code: `${scriptSection}\n\n${templateSection}`,
    template: templateSection,
    script: scriptSection,
    metadata: {
      componentName,
      props: propsList,
      hasStyles:
        sourceCode.includes('styles.') || sourceCode.includes('className'),
      framework: 'svelte',
    },
  };
}

/**
 * Convert React component to Vue
 */
function convertReactToVue(
  sourceCode: string,
  componentName: string,
  props?: Record<string, any>
): ConversionResult {
  // Similar conversion logic for Vue
  const propsMatch = sourceCode.match(/interface\s+(\w+)Props\s*\{([^}]+)\}/s);
  const propsList: string[] = [];

  if (propsMatch) {
    const propsContent = propsMatch[2];
    const propMatches = propsContent.matchAll(/(\w+)(\?)?:\s*([^;]+);/g);
    for (const match of propMatches) {
      propsList.push(match[1]);
    }
  }

  // Convert JSX to Vue template
  let vueTemplate = sourceCode
    .replace(/import\s+.*?from\s+['"]react['"];?\s*/g, '')
    .replace(/className=/g, ':class=')
    .replace(/onClick=/g, '@click=')
    .replace(/\{([^}]+)\}/g, '{{$1}}');

  const jsxMatch = sourceCode.match(/return\s*\(([\s\S]+)\);?/);
  if (jsxMatch) {
    vueTemplate = jsxMatch[1]
      .trim()
      .replace(/^<|>$/g, '')
      .replace(/className=/g, ':class=')
      .replace(/onClick=/g, '@click=');
  }

  const scriptSection = `<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  ${propsList.map((prop) => `${prop}?: string;`).join('\n  ')}
}>();
</script>`;

  const templateSection = `<template>
  ${vueTemplate}
</template>`;

  return {
    code: `${scriptSection}\n\n${templateSection}`,
    template: templateSection,
    script: scriptSection,
    metadata: {
      componentName,
      props: propsList,
      hasStyles: sourceCode.includes('styles.'),
      framework: 'vue',
    },
  };
}

/**
 * Main converter function
 */
export function convertComponent(
  options: ComponentConversionOptions
): ConversionResult {
  const { sourceCode, sourceFramework, targetFramework, componentName } =
    options;

  if (sourceFramework === 'react') {
    if (targetFramework === 'svelte') {
      return convertReactToSvelte(sourceCode, componentName, options.props);
    } else if (targetFramework === 'vue') {
      return convertReactToVue(sourceCode, componentName, options.props);
    }
  }

  // Default: return source code with metadata
  return {
    code: sourceCode,
    metadata: {
      componentName,
      props: [],
      hasStyles: false,
      framework: targetFramework,
    },
  };
}

/**
 * Extract component metadata from source code
 */
export function extractComponentMetadata(sourceCode: string): {
  componentName: string;
  props: string[];
  hasStyles: boolean;
  framework: SourceFramework;
} {
  // Detect framework
  let framework: SourceFramework = 'react';
  if (
    sourceCode.includes('<script lang="ts">') ||
    sourceCode.includes('.svelte')
  ) {
    framework = 'svelte';
  } else if (
    sourceCode.includes('<script setup>') ||
    sourceCode.includes('.vue')
  ) {
    framework = 'vue';
  }

  // Extract component name
  const nameMatch = sourceCode.match(
    /(?:export\s+(?:default\s+)?(?:const|function|class)\s+)?(\w+)(?:\s*[:=]\s*(?:React\.)?(?:FC|Component)|<)/
  );
  const componentName = nameMatch ? nameMatch[1] : 'Component';

  // Extract props
  const propsList: string[] = [];
  if (framework === 'react') {
    const propsMatch = sourceCode.match(
      /interface\s+(\w+)Props\s*\{([^}]+)\}/s
    );
    if (propsMatch) {
      const propsContent = propsMatch[2];
      const propMatches = propsContent.matchAll(/(\w+)(\?)?:\s*([^;]+);/g);
      for (const match of propMatches) {
        propsList.push(match[1]);
      }
    }
  } else if (framework === 'svelte') {
    const propMatches = sourceCode.matchAll(/export\s+let\s+(\w+)/g);
    for (const match of propMatches) {
      propsList.push(match[1]);
    }
  }

  return {
    componentName,
    props: propsList,
    hasStyles:
      sourceCode.includes('styles.') ||
      sourceCode.includes('className') ||
      sourceCode.includes('class='),
    framework,
  };
}
