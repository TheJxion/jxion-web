<!--
  Jxion Stack — Contact Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: Contact page using Jxion components with dynamic content
  
  This page demonstrates:
  - Jxion components from @jxion/design (via Svelte wrappers)
  - Live content updates from ContentManager
  - Dynamic content loading (not static typing)
  - NO Tailwind - all styling from Jxion SCSS modules
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getContentManager, type ContentUpdate } from '@jxion/core';
  import type { Locale } from '@jxion/i18n';
  
  // Import Jxion Svelte components
  import Layout from '$lib/components/jxion/Layout.svelte';
  import Section from '$lib/components/jxion/Section.svelte';
  
  // Dynamic content from ContentManager (not static typing)
  let lang: Locale = 'tr-TR';
  let content: any = null;
  let loading = true;
  let error: string | null = null;
  let lastUpdate: number = 0;
  let liveUpdatesEnabled = true;
  
  let contentManager: any = null;
  let unsubscribe: (() => void) | null = null;
  
  // Compute component props from dynamic content (not static typing)
  $: sectionProps = content?.contact ? {
    title: content.contact.title || 'İletişim',
    subtitle: content.contact.subtitle || '',
    description: content.contact.description || '',
    content: content.contact.content || '',
    footerContent: content.contact.footerContent || '',
    variant: 'default',
    size: 'large',
  } : null;
  
  onMount(async () => {
    console.log('[Contact-Page] 🚀 Initializing contact page...');
    
    try {
      contentManager = getContentManager({
        baseUrl: '/api/content',
        enableLiveUpdates: liveUpdatesEnabled,
        updateInterval: 5000,
        onUpdate: handleContentUpdate,
      });
      
      await loadContent();
      
      if (liveUpdatesEnabled) {
        contentManager.startLiveUpdates();
      }
      
      unsubscribe = contentManager.onUpdate(handleContentUpdate);
    } catch (err) {
      console.error('[Contact-Page] ❌ Error initializing:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  onDestroy(() => {
    if (contentManager) {
      contentManager.stopLiveUpdates();
    }
    if (unsubscribe) {
      unsubscribe();
    }
  });
  
  async function loadContent() {
    loading = true;
    error = null;
    
    try {
      const loadedContent = await contentManager.loadContent('noir-crafted/content.json');
      content = loadedContent;
      lastUpdate = Date.now();
      loading = false;
    } catch (err) {
      try {
        const { content: localContent } = await import('$lib/i18n/content');
        content = localContent;
        lastUpdate = Date.now();
        loading = false;
      } catch (fallbackErr) {
        error = 'Failed to load content';
        loading = false;
      }
    }
  }
  
  function handleContentUpdate(update: ContentUpdate) {
    if (update.path === 'noir-crafted/content.json') {
      content = update.content;
      lastUpdate = update.timestamp;
    }
  }
</script>

<svelte:head>
  <title>İletişim - Noir Crafted</title>
  <meta name="description" content="Noir ile iletişim bilgileri" />
</svelte:head>

{#if loading}
  <div class="loading-state">
    <p>Loading content from ContentManager...</p>
  </div>
{:else if error}
  <div class="error-state">
    <h2>Error</h2>
    <p>{error}</p>
    <button on:click={loadContent}>Retry</button>
  </div>
{:else if content && sectionProps}
  <Layout params={{ lang, theme: 'light' }}>
    <Section
      title={sectionProps.title}
      subtitle={sectionProps.subtitle}
      description={sectionProps.description}
      content={sectionProps.content}
      footerContent={sectionProps.footerContent}
      variant={sectionProps.variant}
      size={sectionProps.size}
    />
  </Layout>
{/if}

<style>
  .loading-state,
  .error-state {
    padding: 2rem;
    text-align: center;
  }
</style>
