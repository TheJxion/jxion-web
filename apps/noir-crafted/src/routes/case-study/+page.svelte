<!--
  Case Study Showcase Page
  React Developer Case Study - Final Deliverable
  
  This page demonstrates Jxion's template rendering system:
  - Template-driven, framework-agnostic rendering
  - TemplateRenderer for variable substitution
  - Multi-framework conversion capability
  
  Phase: Phase 5 — React Case Study Delivery
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
  import { TemplateRenderer } from '@jxion/core/utils/template-renderer';
  import { caseStudyTemplates } from '$lib/templates/case-study-templates';
  import { caseStudyData } from '$lib/data/case-study-data';
  
  // Dynamically import React components
  let headerModule: any = null;
  let contentModule: any = null;
  let aiContentFetcherModule: any = null;
  let componentsLoaded = false;
  let aiContentFetcherLoaded = false;

  // Zustand store (client-side only)
  let store: any = null;
  let storeState: any = null;
  let theme = 'dark';
  let selectedTab: 'demo' | 'architecture' | 'metrics' | 'testing' | 'reflection' | 'renderer' = 'demo';

  // Rendered content from templates
  let renderedHero = '';
  let renderedSection1 = '';
  let renderedSection2 = '';
  let renderedSection3 = '';
  let renderedSection4 = '';
  let renderedSection5 = '';
  let renderedRendererDemo = '';

  // Reactive statement to update local variables when store state changes
  $: if (storeState) {
    theme = storeState.theme;
    selectedTab = storeState.selectedTab;
  }

  onMount(async () => {
    try {
      // Import React components (without .tsx extension for SvelteKit)
      headerModule = await import('$lib/components/organisms/HeaderAnimation');
      contentModule = await import('$lib/components/organisms/ContentEditor');
      componentsLoaded = true;
    } catch (error) {
      console.error('Error loading React components:', error);
    }

    try {
      // Import AIContentFetcher
      aiContentFetcherModule = await import('$lib/components/organisms/AIContentFetcher');
      aiContentFetcherLoaded = true;
    } catch (error) {
      console.error('Error loading AIContentFetcher:', error);
      aiContentFetcherLoaded = true;
    }

    // Initialize Zustand store (client-side only)
    if (typeof window !== 'undefined') {
      const { useAIDemoStore } = await import('$lib/stores/aiDemoStore');
      store = useAIDemoStore.getState();

      // Initialize storeState for reactivity
      storeState = store;

      // Subscribe to store changes for reactivity
      useAIDemoStore.subscribe((state) => {
        storeState = state;
      });
    }

    // Render all sections using TemplateRenderer (Jxion Core)
    renderedHero = TemplateRenderer.render({
      template: caseStudyTemplates.hero,
      variables: caseStudyData.hero,
    });

    renderedSection1 = TemplateRenderer.render({
      template: caseStudyTemplates.section1,
      variables: caseStudyData.section1,
    });

    renderedSection2 = TemplateRenderer.render({
      template: caseStudyTemplates.section2,
      variables: caseStudyData.section2,
    });

    renderedSection3 = TemplateRenderer.render({
      template: caseStudyTemplates.section3,
      variables: caseStudyData.section3,
    });

    renderedSection4 = TemplateRenderer.render({
      template: caseStudyTemplates.section4,
      variables: caseStudyData.section4,
    });

    renderedSection5 = TemplateRenderer.render({
      template: caseStudyTemplates.section5,
      variables: caseStudyData.section5,
    });

    renderedRendererDemo = TemplateRenderer.render({
      template: caseStudyTemplates.rendererDemo,
      variables: caseStudyData.rendererDemo,
    });
  });

  // Zustand store actions (client-side only)
  function toggleTheme() {
    if (store) {
      store.setTheme(store.theme === 'dark' ? 'light' : 'dark');
    }
  }

  function setTab(
    tab: 'demo' | 'architecture' | 'metrics' | 'testing' | 'reflection' | 'renderer'
  ) {
    if (store) {
      store.setSelectedTab(tab);
    }
  }
</script>

<svelte:head>
  <title>Jxion Framework: React Developer Case Study</title>
  <meta
    name="description"
    content="React Developer Case Study showcasing Jxion's multi-framework component architecture with AI integration"
  />
</svelte:head>

<div class="case-study-demo bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] min-h-screen">
  <!-- Breadcrumb Navigation -->
  <nav class="sticky top-0 z-50 bg-[var(--color-noir-background-primary)]/80 backdrop-blur-sm border-b border-[var(--color-noir-border)]">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center py-3">
        <div class="flex items-center gap-2 text-sm">
          <a href="/" class="text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text)] transition-colors">Home</a>
          <span class="text-[var(--color-noir-text-muted)]">→</span>
          <span class="text-[var(--color-noir-text)]">Case Study</span>
        </div>
        {#if store}
          <button
            on:click={toggleTheme}
            class="px-4 py-2 bg-[var(--color-noir-background-secondary)] rounded-lg hover:bg-[var(--color-noir-murdum-dark)] transition-colors text-sm"
          >
            Theme: {store.theme}
          </button>
        {/if}
      </div>
    </div>
  </nav>

  <!-- Professional Header -->
  <div class="case-study-header py-16 px-4">
    <div class="container max-w-7xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl font-serif text-[var(--color-noir-secondary)] mb-4">
        Jxion Framework: React Developer Case Study
      </h1>
      <p class="text-xl md:text-2xl text-[var(--color-noir-text-muted)] mb-8">
        Multi-Framework Component Architecture with AI Integration
      </p>
      <div class="flex flex-wrap justify-center gap-4 text-sm">
        <span class="px-4 py-2 bg-[var(--color-noir-background-secondary)] rounded-lg">Framework: Nx Monorepo</span>
        <span class="px-4 py-2 bg-[var(--color-noir-background-secondary)] rounded-lg">Design System: Mürdüm Purple (#4C1C3D)</span>
        <span class="px-4 py-2 bg-[var(--color-noir-background-secondary)] rounded-lg">Status: Production Ready</span>
      </div>
    </div>
  </div>

  <!-- Section 1: The Cinematic Header -->
  <section class="hero-section">
    {#if componentsLoaded && headerModule}
      <LocalReactWrapper 
        componentModule={headerModule}
        componentName="HeaderAnimation"
        props={{ className: 'full-viewport' }}
      />
    {:else}
      <div class="hero-placeholder">
        <div class="loading-spinner"></div>
        <p>Loading GSAP Header Animation...</p>
      </div>
    {/if}
  </section>

  <!-- Hero Section (Template Rendered) -->
  {@html renderedHero}

  <!-- Tabs (Zustand-managed client state) -->
  {#if store}
    <div class="sticky top-16 z-40 bg-[var(--color-noir-background-primary)]/60 backdrop-blur-sm border-b border-[var(--color-noir-border)]">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="flex gap-2 overflow-x-auto">
          <button
            on:click={() => setTab('demo')}
            class="px-6 py-3 font-semibold transition-colors whitespace-nowrap {selectedTab === 'demo'
              ? 'text-[var(--color-noir-primary)] border-b-2 border-[var(--color-noir-primary)]'
              : 'text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text-secondary)]'}"
          >
            Demo
          </button>
          <button
            on:click={() => setTab('architecture')}
            class="px-6 py-3 font-semibold transition-colors whitespace-nowrap {selectedTab === 'architecture'
              ? 'text-[var(--color-noir-primary)] border-b-2 border-[var(--color-noir-primary)]'
              : 'text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text-secondary)]'}"
          >
            Architecture
          </button>
          <button
            on:click={() => setTab('testing')}
            class="px-6 py-3 font-semibold transition-colors whitespace-nowrap {selectedTab === 'testing'
              ? 'text-[var(--color-noir-primary)] border-b-2 border-[var(--color-noir-primary)]'
              : 'text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text-secondary)]'}"
          >
            Testing
          </button>
          <button
            on:click={() => setTab('reflection')}
            class="px-6 py-3 font-semibold transition-colors whitespace-nowrap {selectedTab === 'reflection'
              ? 'text-[var(--color-noir-primary)] border-b-2 border-[var(--color-noir-primary)]'
              : 'text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text-secondary)]'}"
          >
            Reflection
          </button>
          <button
            on:click={() => setTab('renderer')}
            class="px-6 py-3 font-semibold transition-colors whitespace-nowrap {selectedTab === 'renderer'
              ? 'text-[var(--color-noir-primary)] border-b-2 border-[var(--color-noir-primary)]'
              : 'text-[var(--color-noir-text-muted)] hover:text-[var(--color-noir-text-secondary)]'}"
          >
            Renderer Demo
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Tab Content: Demo (Section 3) -->
  {#if !store || selectedTab === 'demo'}
    {@html renderedSection3}
    <!-- AIContentFetcher Live Demo -->
    <div class="container max-w-4xl mx-auto px-4 py-8">
      {#if aiContentFetcherLoaded && aiContentFetcherModule}
        <LocalReactWrapper
          componentModule={aiContentFetcherModule}
          componentName="AIContentFetcher"
          props={{
            initialAutoFetch: false,
          }}
        />
      {:else}
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading AI Content Fetcher...</p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Tab Content: Architecture (Sections 1 & 2) -->
  {#if store && selectedTab === 'architecture'}
    {@html renderedSection1}
    {@html renderedSection2}
  {/if}

  <!-- Tab Content: Testing (Section 4) -->
  {#if store && selectedTab === 'testing'}
    {@html renderedSection4}
  {/if}

  <!-- Tab Content: Reflection (Section 5) -->
  {#if store && selectedTab === 'reflection'}
    {@html renderedSection5}
  {/if}

  <!-- Tab Content: Renderer Demo -->
  {#if store && selectedTab === 'renderer'}
    {@html renderedRendererDemo}
  {/if}

  <!-- Section 2: The AI-Powered Development Assistant -->
  <section class="section bg-[var(--color-noir-black)] py-12">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="section-header text-center mb-8">
        <h2 class="text-4xl font-serif text-[var(--color-noir-gold)] mb-4">
          Q3 (AI Layer): AI-Powered Development Assistant
        </h2>
        <p class="text-lg text-[var(--color-noir-text-secondary)] max-w-3xl mx-auto">
          This component (built for the admin panel) uses AI to generate new React components from text 
          and convert them between frameworks. It demonstrates the Jxion framework's ability to enable 
          rapid development through AI-assisted automation.
        </p>
        <div class="info-box mt-6 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg max-w-3xl mx-auto">
          <p class="text-[var(--color-noir-text-secondary)]">
            <strong>Note:</strong> The full Component Generator is available in the 
            <a href="/admin/components" class="text-[var(--color-noir-gold)] underline hover:text-yellow-400"
              >noir-admin panel</a
            >. This showcases the framework's multi-app architecture where shared components can be
            used across different applications.
          </p>
        </div>
      </div>
      
      <!-- Component Generator Preview -->
      <div class="component-preview mt-8">
        <div class="preview-card p-8 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <h3 class="text-2xl font-serif text-[var(--color-noir-gold)] mb-6">Component Generator Features</h3>
          <ul class="feature-list space-y-3 text-[var(--color-noir-text-secondary)]">
            <li>✨ AI-assisted component generation from natural language</li>
            <li>🔄 Framework conversion (React → Svelte, Vue, etc.)</li>
            <li>📦 Component metadata extraction</li>
            <li>💾 Code export (copy/download)</li>
            <li>🎯 Integration with Jxion component registry</li>
          </ul>
          <a
            href="/admin/components"
            class="cta-button inline-block mt-6 px-8 py-3 bg-[var(--color-noir-gold)] text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
            target="_blank"
          >
            Open Component Generator →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: The AI-Assisted Content Editor -->
  <section class="section bg-[var(--color-noir-black)] py-12">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="section-header text-center mb-8">
        <h2 class="text-4xl font-serif text-[var(--color-noir-gold)] mb-4">
          Q3 (AI Layer): AI-Assisted Content Generation
        </h2>
        <p class="text-lg text-[var(--color-noir-text-secondary)] max-w-3xl mx-auto">
          This component uses an LLM (Gemini API) with a specific system prompt to generate on-brand
          copy for 'Noir Crafted'. The AI is instructed to maintain the brand's elegant, poetic voice
          while celebrating feminine power and Turkish heritage.
        </p>
      </div>
      
      {#if componentsLoaded && contentModule}
        <LocalReactWrapper 
          componentModule={contentModule}
          componentName="ContentEditor"
          props={{ className: 'content-editor-wrapper' }}
        />
      {:else}
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading AI Content Editor...</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Footer with Submission Info -->
  <footer class="mt-32 py-16 border-t border-[var(--color-noir-border)]">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-serif text-[var(--color-noir-secondary)] mb-4">
          This Case Study Demonstrates
        </h3>
        <p class="text-[var(--color-noir-text-muted)] max-w-3xl mx-auto mb-8">
          The Jxion Framework showcases a unified monorepo architecture that solves the critical conflict between speed-to-market and architectural consistency. Built with Nx, React, and SvelteKit, it demonstrates multi-framework component reuse, unified design systems, and AI-powered development acceleration.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="text-center">
          <h4 class="text-lg font-semibold text-[var(--color-noir-text)] mb-2">GitHub Repository</h4>
          <span class="text-[var(--color-noir-text-muted)]">Coming Soon</span>
        </div>
        <div class="text-center">
          <h4 class="text-lg font-semibold text-[var(--color-noir-text)] mb-2">Live Demo</h4>
          <a href="/" class="text-[var(--color-noir-primary)] hover:underline">Visit Application</a>
        </div>
        <div class="text-center">
          <h4 class="text-lg font-semibold text-[var(--color-noir-text)] mb-2">Documentation</h4>
          <span class="text-[var(--color-noir-text-muted)]">Coming Soon</span>
        </div>
      </div>
      <div class="text-center text-sm text-[var(--color-noir-text-muted)] border-t border-[var(--color-noir-border)] pt-8">
        <p>© 2025 Jxion Framework. Built with React, SvelteKit, and Nx.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  .case-study-demo {
    font-family: 'Inter', sans-serif;
  }

  /* Hero Section */
  .hero-section {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    position: relative;
    overflow: hidden;
  }

  .hero-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: radial-gradient(circle at center, #434343 0%, #000000 100%);
    color: #f8f8f8;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 215, 0, 0.2);
    border-top-color: var(--color-noir-gold);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Sections */
  .section {
    padding: 4rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Loading Placeholder */
  .loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1rem;
    color: var(--color-noir-text-secondary);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
  }
</style>
