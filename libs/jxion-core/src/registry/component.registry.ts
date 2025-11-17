/**
 * @fileoverview Component Registry
 *
 * Central registry for all Jxion components with metadata, examples, and framework support.
 * Provides type-safe component discovery and documentation generation.
 */

import { debug } from '../utils/debug';

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
    name: 'Hero',
    version: '1.0.0',
    category: 'Layout',
    description:
      'Hero section component with title, subtitle, description, and CTA',
    props: {
      title: 'string',
      subtitle: 'string',
      description: 'string',
      ctaText: 'string',
      statsValue: 'string',
      statsLabel: 'string',
      stats: 'string',
      statslabel: 'string',
      cardSubtitle: 'string',
      testId: 'string',
      onCtaClick: 'function',
    },
    examples: [
      {
        title: 'Basic Hero',
        description: 'Simple hero section with title and CTA',
        code: `<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
/>`,
        framework: 'react',
      },
      {
        title: 'Hero with Stats',
        description: 'Hero section with statistics card',
        code: `<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
  statsValue="7"
  statsLabel="Years Experience"
  cardSubtitle="Trusted by developers"
/>`,
        framework: 'vue',
      },
    ],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  makeup: {
    name: 'MakeUp',
    version: '1.0.0',
    category: 'Layout',
    description: 'MakeUp banner component with message and contact info',
    props: {
      message: 'string',
      phoneNumber: 'string',
      contactLabel: 'string',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  keyFeatures: {
    name: 'KeyFeatures',
    version: '1.0.0',
    category: 'Content',
    description: 'Key features section with title, subtitle, and feature cards',
    props: {
      title: 'string',
      subtitle: 'string',
      common_cta: 'string',
      common_cta_link: 'string',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  featuresCarousel: {
    name: 'FeaturesCarousel',
    version: '1.0.0',
    category: 'Content',
    description: 'Carousel of feature cards with icons and descriptions',
    props: {
      title: 'string',
      subtitle: 'string',
      common_cta: 'string',
      list: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  integrationSolutions: {
    name: 'IntegrationSolutions',
    version: '1.0.0',
    category: 'Content',
    description: 'Integration solutions grid with items and features',
    props: {
      title: 'string',
      subtitle: 'string',
      common_cta: 'string',
      common_cta_link: 'string',
      items: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  whatsOurImpact: {
    name: 'WhatsOurImpact',
    version: '1.0.0',
    category: 'Content',
    description: 'Impact stats section with title and statistics',
    props: {
      title: 'object',
      stats: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  whyYesildefter: {
    name: 'WhyYesildefter',
    version: '1.0.0',
    category: 'Content',
    description: 'Why choose section with benefits and CTA',
    props: {
      title: 'string',
      subtitle: 'string',
      description: 'string',
      highlight: 'string',
      cta: 'string',
      benefits: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  nextSteps: {
    name: 'NextSteps',
    version: '1.0.0',
    category: 'Content',
    description: 'Next steps section with action items',
    props: {
      title: 'string',
      subtitle: 'string',
      list: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  section: {
    name: 'Section',
    version: '1.0.0',
    category: 'Layout',
    description: 'Generic section component for flexible content display',
    props: {
      variant: 'string',
      size: 'string',
      title: 'string',
      subtitle: 'string',
      description: 'string',
      content: 'string',
      footerContent: 'string',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  whyNoir: {
    name: 'WhyNoir',
    version: '1.0.0',
    category: 'Content',
    description: 'Why choose Noir section with benefits',
    props: {
      title: 'string',
      sections: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  motifs: {
    name: 'Motifs',
    version: '1.0.0',
    category: 'Content',
    description: 'Design motifs section with items grid',
    props: {
      title: 'string',
      subtitle: 'string',
      items: 'array',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  newsletter: {
    name: 'Newsletter',
    version: '1.0.0',
    category: 'Content',
    description: 'Newsletter signup section',
    props: {
      title: 'string',
      description: 'string',
      placeholder: 'string',
      button: 'string',
    },
    examples: [],
    frameworks: ['react', 'vue', 'svelte', 'solidjs', 'angular'],
  },
  productCard: {
    name: 'ProductCard',
    version: '1.0.0',
    category: 'E-commerce',
    description:
      'Premium product card component for displaying jewelry items. Demonstrates Jxion framework interoperability (React component used in SvelteKit via LocalReactWrapper).',
    props: {
      title: 'string',
      description: 'string',
      price: 'string',
      imageUrl: 'string',
    },
    examples: [
      {
        title: 'ProductCard in SvelteKit',
        description:
          'React ProductCard component used in SvelteKit via LocalReactWrapper',
        code: `<LocalReactWrapper
  componentModule={productCardModule}
  componentName="ProductCard"
  props={{
    title: "Ay Döngüsü Kolye",
    description: "Ayın evrelerinden ilham alan zarif bir kolye",
    price: "₺1.299,00",
    imageUrl: "https://example.com/kolye.jpg"
  }}
/>`,
        framework: 'svelte',
      },
      {
        title: 'ProductCard in React',
        description: 'Direct usage in React application',
        code: `<ProductCard
  title="Ay Döngüsü Kolye"
  description="Ayın evrelerinden ilham alan zarif bir kolye"
  price="₺1.299,00"
  imageUrl="https://example.com/kolye.jpg"
/>`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
  },
  jxionProductGrid: {
    name: 'JxionProductGrid',
    version: '1.0.0',
    category: 'E-commerce',
    description:
      'Flagship demonstration component featuring draggable grid layout with inner card carousels. Combines Palmer-like draggable grid (x,y drag) with Instagram-style inner carousel (per card swipe). Showcases Jxion multi-framework architecture and GSAP integration.',
    props: {
      products: 'Product[] (optional)',
    },
    examples: [
      {
        title: 'JxionProductGrid in SvelteKit',
        description:
          'React JxionProductGrid component used in SvelteKit via LocalReactWrapper. Demonstrates complex GSAP animations in multi-framework architecture.',
        code: `<LocalReactWrapper
  componentModule={jxionProductGridModule}
  componentName="JxionProductGrid"
/>`,
        framework: 'svelte',
      },
      {
        title: 'JxionProductGrid in React',
        description: 'Direct usage in React application',
        code: `<JxionProductGrid />`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
  },
  jxionHero: {
    name: 'JxionHero',
    version: '1.0.0',
    category: 'Layout',
    description:
      'Hero section with GSAP ScrollTrigger pinning and fade-out animation. Content fades out and scales down on scroll, transitioning smoothly to content below. Showcases Jxion architecture with NOIR brand styling.',
    props: {},
    examples: [
      {
        title: 'JxionHero in SvelteKit',
        description:
          'React JxionHero component used in SvelteKit via LocalReactWrapper. Demonstrates GSAP ScrollTrigger integration.',
        code: `<LocalReactWrapper
  componentModule={jxionHeroModule}
  componentName="JxionHero"
/>`,
        framework: 'svelte',
      },
      {
        title: 'JxionHero in React',
        description: 'Direct usage in React application',
        code: `<JxionHero />`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
  },
  aiContentFetcher: {
    name: 'AIContentFetcher',
    version: '1.0.0',
    category: 'AI Integration',
    description:
      'AI Content Fetcher component demonstrating server-state management, caching, latency handling, and graceful error fallbacks. Simulates BFF pattern with Redis-like caching (2.5s fresh, 0.5s cached) and 20% error rate for fallback demonstration.',
    props: {
      initialAutoFetch: 'boolean (optional)',
    },
    examples: [
      {
        title: 'AIContentFetcher in SvelteKit',
        description:
          'React AIContentFetcher component used in SvelteKit via LocalReactWrapper. Demonstrates server-state management and caching patterns.',
        code: `<LocalReactWrapper
  componentModule={aiContentFetcherModule}
  componentName="AIContentFetcher"
  props={{
    initialAutoFetch: false
  }}
/>`,
        framework: 'svelte',
      },
      {
        title: 'AIContentFetcher in React',
        description: 'Direct usage in React application',
        code: `<AIContentFetcher initialAutoFetch={false} />`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
  },
  jxionInput: {
    name: 'JxionInput',
    version: '1.0.0',
    category: 'Form',
    description:
      'Standardized input field with Mürdüm purple theme, error handling, and validation. Features focus states, error messages, and required field indicators.',
    props: {
      label: 'string (required)',
      type: 'string (optional, default: "text")',
      placeholder: 'string (optional)',
      value: 'string (required)',
      onChange: 'function (required)',
      error: 'string (optional)',
      required: 'boolean (optional, default: false)',
      disabled: 'boolean (optional, default: false)',
      className: 'string (optional)',
    },
    examples: [
      {
        title: 'JxionInput in SvelteKit',
        description:
          'React JxionInput component used in SvelteKit via LocalReactWrapper. Demonstrates form input with validation.',
        code: `<LocalReactWrapper
  componentModule={{ JxionInput }}
  componentName="JxionInput"
  props={{
    label: 'Email',
    type: 'email',
    value: email,
    onChange: (val: string) => { email = val; },
    error: errors.email,
    required: true,
  }}
/>`,
        framework: 'svelte',
      },
      {
        title: 'JxionInput in React',
        description: 'Direct usage in React application',
        code: `<JxionInput
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
/>`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
  },
  jxionButton: {
    name: 'JxionButton',
    version: '1.0.0',
    category: 'Interaction',
    description:
      'Multi-variant button component with primary (Mürdüm purple), secondary (Gold), and danger variants. Supports full-width, disabled states, and loading states.',
    props: {
      children: 'ReactNode (required)',
      variant: 'string (optional, default: "primary")',
      onClick: 'function (optional)',
      type: 'string (optional, default: "button")',
      disabled: 'boolean (optional, default: false)',
      fullWidth: 'boolean (optional, default: false)',
      className: 'string (optional)',
    },
    examples: [
      {
        title: 'JxionButton in SvelteKit',
        description:
          'React JxionButton component used in SvelteKit via LocalReactWrapper. Demonstrates button variants and states.',
        code: `<LocalReactWrapper
  componentModule={{ JxionButton }}
  componentName="JxionButton"
  props={{
    variant: 'primary',
    type: 'submit',
    disabled: isSubmitting,
    fullWidth: true,
    children: 'Submit',
  }}
/>`,
        framework: 'svelte',
      },
      {
        title: 'JxionButton in React',
        description: 'Direct usage in React application',
        code: `<JxionButton
  variant="primary"
  onClick={handleSubmit}
  disabled={isLoading}
  fullWidth
>
  Submit
</JxionButton>`,
        framework: 'react',
      },
    ],
    frameworks: ['react', 'svelte', 'vue'],
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
  debug.logComponentRegistry('get', name, {
    availableComponents: Object.keys(componentRegistry),
  });

  const component = componentRegistry[name];

  if (component) {
    debug.component('info', `Found component: ${name}`, {
      component: name,
      operation: 'get',
      metadata: {
        version: component.version,
        category: component.category,
        frameworks: component.frameworks,
        propCount: Object.keys(component.props).length,
        exampleCount: component.examples.length,
      },
    });
  } else {
    debug.component('warn', `Component not found: ${name}`, {
      component: name,
      operation: 'get',
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
  debug.logComponentRegistry('getByCategory', category, {
    totalComponents: Object.keys(componentRegistry).length,
  });

  const components = Object.values(componentRegistry).filter(
    (component) => component.category === category
  );

  debug.component(
    'info',
    `Found ${components.length} components in category: ${category}`,
    {
      operation: 'getByCategory',
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
  debug.logComponentRegistry('getByFramework', framework, {
    totalComponents: Object.keys(componentRegistry).length,
  });

  const components = Object.values(componentRegistry).filter((component) =>
    component.frameworks.includes(framework)
  );

  debug.component(
    'info',
    `Found ${components.length} components for framework: ${framework}`,
    {
      operation: 'getByFramework',
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
