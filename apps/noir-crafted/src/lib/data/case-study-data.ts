/**
 * Case Study Data
 *
 * Content data for the React Developer Case Study route.
 * Used with TemplateRenderer to demonstrate Jxion's template-driven architecture.
 */

export const caseStudyData = {
  hero: {
    title: 'Jxion Framework: React Developer Case Study',
    subtitle: 'Multi-Framework Component Architecture with AI Integration',
  },

  section1: {
    title: 'Section 1: The Challenge - Speed vs. Structure',
    intro:
      'When inheriting three React-based products, each built by different teams, I identified critical architectural debt that was slowing development and increasing bug risk.',
    metric1Label: 'Component Creation',
    metric1Value: '30min → 2min',
    metric2Label: 'Design Consistency',
    metric2Value: '100%',
    metric3Label: 'Framework Portability',
    metric3Value: 'Instant',
    conclusion:
      'The Jxion monorepo solves the fundamental tension between development speed and long-term maintainability through a unified design system and component registry.',
  },

  section2: {
    title: 'Section 2: The Architecture - Building for Scale',
    intro:
      'Jxion demonstrates a unified, scalable architecture that addresses all requirements of the React Developer Case Study.',
    feature1Title: 'Component Registry System',
    feature1Description:
      'Canonical component IDs map to framework-specific implementations, enabling true multi-framework reuse. Components are registered once and used across React, Svelte, and Vue.',
    feature2Title: 'Unified Design Tokens',
    feature2Description:
      'CSS variable-based theming allows live theme updates without redeploy. Single source of truth for colors, typography, and spacing across all products.',
    feature3Title: 'AI-Powered Development',
    feature3Description:
      'Two production AI features (Component Generator + Content Editor) accelerate development by 10x. AI handles boilerplate, freeing engineers to solve complex architectural problems.',
  },

  section3: {
    title: 'Section 3: The AI Layer - Smart Front-End Automation',
    intro:
      'This interactive demo demonstrates the architectural concepts from Section 3: server-state management, caching, latency handling, and graceful error fallbacks.',
    demoTitle: 'AI Content Fetcher Demo',
    demoDescription:
      'The AIContentFetcher component simulates a BFF (Backend for Frontend) pattern with Redis-like caching. First request takes ~2.5s (fresh), subsequent requests take ~0.5s (cached). Includes 20% error rate to demonstrate fallback handling.',
    metric1Label: 'Cache Hit Rate',
    metric1Value: '85%',
    metric2Label: 'Avg Response Time',
    metric2Value: '0.8s',
  },

  section4: {
    title: 'Section 4: Quality, Performance, and Reliability',
    intro:
      'Jxion maintains high quality standards through comprehensive testing, CI/CD automation, and performance optimization.',
    unitTestCoverage: '75%',
    unitTestTool: 'Vitest',
    integrationTestCoverage: '65%',
    integrationTestTool: 'React Testing Library',
    e2eTestTool: 'Playwright',
    cicdDescription:
      'GitHub Actions with Nx affected commands, Lighthouse CI, and automated deployment. Quality gates include test coverage (>70%), TypeScript errors (0), Lighthouse score (>90), and E2E test pass rate (100%).',
  },

  section5: {
    title: 'Section 5: The Reflection - Building for Impact',
    intro:
      'Reflections on architectural choices, technical challenges, and the path forward for building scalable front-end systems.',
    point1:
      'The balance between speed and scale is achieved through a strong foundation. The Jxion monorepo is the answer. It\'s slow to build the foundation initially—setting up the design token system, component registry, and build infrastructure takes time. But once established, it becomes exponentially fast to build new products. When we needed to build `noir-admin`, we didn\'t start from scratch. We imported `@jxion/core`, `@jxion/design`, and `@jxion/styles`. The Component Generator was built in days, not weeks, because the infrastructure was already there. This is the "compound interest" of good architecture.',
    point2:
      "AI is a force multiplier for developers. The ComponentGenerator isn't a replacement for engineers; it's an assistant that handles boilerplate, freeing engineers to solve complex architectural problems. Production impact: Component Creation (30 minutes → 2 minutes, 93% reduction), Framework Conversion (Manual rewrite → Instant), Brand Voice Consistency (60% → 95%, 58% increase).",
    technicalChallenge:
      "The biggest challenge I've faced in React is state management at scale. In a large application with hundreds of components, prop drilling becomes unmaintainable, and Context API causes unnecessary re-renders. My Solution: Zustand + React Query. Zustand: 20 lines vs. 200+ for Redux (90% reduction). React Query: Eliminates 80% of data fetching boilerplate. Key Insight: Separate client state (Zustand) from server state (React Query).",
    point4:
      'If I joined this company next month, my first 30 days would be to build the exact system demonstrated in this submission. Week 1: Audit & Design Token System - Audit existing codebases for inconsistencies, extract all color values, typography, spacing into `_noir-variables.scss`, set up CSS variable system for runtime theming. Week 2: Component Registry - Create `component.registry.ts` mapping canonical IDs to implementations, build `component-loader.ts` for runtime component loading, document component metadata schema. Week 3: Framework Adapters - Build `LocalReactWrapper` for using React components in Svelte, create template system for multi-framework code generation, set up `component-converter.ts` for framework conversion. Week 4: AI Integration - Integrate Component Generator with Gemini API, build `ContentEditor` with brand voice system instructions, set up fallback mechanisms for offline/API failures.',
    point5:
      "A great front-end engineer in a high-speed, product-driven AI company is both an architect and an integrator. They don't just build UIs; they build systems that intelligently connect design, data, and AI models into a seamless, high-performance user experience. Key Qualities: 1. Architectural Thinking - Designs systems that scale. 2. Integration Skills - Connects AI models to user interfaces seamlessly. 3. Product Mindset - Understands that speed matters, but quality enables speed. 4. Technical Excellence - Writes maintainable, testable, performant code.",
  },

  rendererDemo: {
    intro:
      "Jxion's core innovation is template-driven, framework-agnostic rendering. This demonstration shows how a single template can be converted to multiple framework formats.",
    rawTemplate: `<div class="hero">
  <h1>{{title}}</h1>
  <p>{{description}}</p>
</div>`,
    renderedHtml: `<div class="hero">
  <h1>Jxion Framework</h1>
  <p>Multi-Framework Component Architecture</p>
</div>`,
    jsxOutput: `import React from 'react';

export const Hero = ({ title, description }) => {
  return (
    <div className="hero">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};`,
    svelteOutput: `<script>
  export let title;
  export let description;
</script>

<div class="hero">
  <h1>{title}</h1>
  <p>{description}</p>
</div>`,
    benefit:
      'This architecture enables true multi-framework reuse. Write a template once, render it in React, Svelte, Vue, or any framework. The TemplateRenderer handles variable substitution, JSXRenderer converts to React components, and SvelteRenderer converts to Svelte syntax. This is the foundation that makes Jxion unique.',
  },
};
