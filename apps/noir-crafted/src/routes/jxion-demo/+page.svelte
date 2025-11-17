<!--
  Jxion Stack — Complete Demo Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: Full demo showcasing Jxion components with live content updates
  
  This page demonstrates:
  - Jxion components from @jxion/design (via Svelte wrappers)
  - Live content updates from ContentManager
  - Dynamic content loading (not static typing)
  - Comprehensive logging
  - NO Tailwind - all styling from Jxion SCSS modules
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getDictionary, type Locale } from '@jxion/i18n';
  import { content as defaultContent } from '$lib/i18n/content';
  import {
    contentStore,
    ensureContentStore,
    refreshContentStore,
  } from '$lib/stores/contentStore';
  
  // Import Jxion Svelte components (matching jxion-svelte pattern)
  import Hero from '$lib/components/jxion/Hero.svelte';
  import Layout from '$lib/components/jxion/Layout.svelte';
  
  // Dynamic content from ContentManager (not static typing)
  let lang: Locale = 'tr-TR';
  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let dictionary: any = null;
  let unsubscribeStore: (() => void) | null = null;
  let lastUpdate = Date.now();
  
  // Compute component props from dynamic content (not static typing)
  $: heroProps = contentData?.home?.hero ? {
    title: contentData.home.hero.title || '',
    subtitle: contentData.home.hero.subtitle || '',
    description: contentData.home.hero.description || '',
    ctaText: contentData.home.hero.primaryCta || '',
    statsValue: '7',
    statsLabel: 'Years Experience',
    cardSubtitle: '',
    testId: 'hero-demo',
  } : null;
  
  onMount(async () => {
    try {
      dictionary = await getDictionary(lang);
    } catch (dictErr) {
      console.warn('[Jxion-Demo] ⚠️ Failed to load dictionary:', dictErr);
      dictionary = {};
    }
  
    ensureContentStore();
    unsubscribeStore = contentStore.subscribe(($state) => {
      contentData = $state.content;
      loading = $state.loading;
      error = $state.error;
      lastUpdate = $state.lastUpdate;
    });
  });
  
  onDestroy(() => {
    unsubscribeStore?.();
  });
</script>

<svelte:head>
  <title>Jxion Stack Demo - Noir Crafted</title>
  <meta name="description" content="Complete Jxion Stack demo with live content updates" />
</svelte:head>

{#if loading}
  <div class="loading-state">
    <p>Loading content from ContentManager...</p>
  </div>
{:else if error}
  <div class="error-state">
    <h2>Error</h2>
    <p>{error}</p>
    <button on:click={refreshContentStore}>Retry</button>
  </div>
{:else if heroProps}
  <!-- Use Jxion Layout component (matching jxion-react pattern) -->
  <Layout params={{ lang, theme: 'light' }}>
    <!-- Use Jxion Hero component with dynamic content -->
    <Hero
      title={heroProps.title}
      subtitle={heroProps.subtitle}
      description={heroProps.description}
      ctaText={heroProps.ctaText}
      statsValue={heroProps.statsValue}
      statsLabel={heroProps.statsLabel}
      cardSubtitle={heroProps.cardSubtitle}
      testId={heroProps.testId}
    />
  </Layout>
  
  <!-- Debug Panel (minimal, just for info) -->
  <div class="debug-panel">
    <h3>Debug Information</h3>
    <div class="debug-info">
      <p><strong>Content Source:</strong> @jxion-core ContentManager</p>
      <p><strong>Component Source:</strong> @jxion/design (via Svelte wrappers)</p>
      <p><strong>Last Update:</strong> {new Date(lastUpdate).toLocaleString()}</p>
      <p><strong>Content Size:</strong> {JSON.stringify(contentData).length} bytes</p>
      <p><strong>Components Used:</strong> Layout, Hero</p>
    </div>
    <p class="console-note">
      Check browser console (F12) for detailed logs:
      <br />• [Jxion-Demo] - Demo operations
      <br />• [Jxion-ContentManager] - Content operations
      <br />• [Jxion-Svelte] - Component rendering
    </p>
  </div>
{/if}

<style>
  /* Minimal styles - components use their own SCSS modules */
  .loading-state,
  .error-state {
    padding: 2rem;
    text-align: center;
  }
  
  .debug-panel {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    max-width: 350px;
    z-index: 1000;
    font-family: monospace;
  }
  
  .debug-info {
    margin-bottom: 1rem;
  }
  
  .debug-info p {
    margin: 0.25rem 0;
    line-height: 1.4;
  }
  
  .console-note {
    font-size: 0.65rem;
    color: #aaa;
    margin-top: 0.5rem;
    line-height: 1.4;
  }
</style>
