<!--
  Jxion Stack — Shipping Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: Shipping page using Jxion components with dynamic content
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getContentManager, type ContentUpdate } from '@jxion/core';
  import type { Locale } from '@jxion/i18n';
  
  import Layout from '$lib/components/jxion/Layout.svelte';
  import Section from '$lib/components/jxion/Section.svelte';
  
  let lang: Locale = 'tr-TR';
  let content: any = null;
  let loading = true;
  let error: string | null = null;
  let lastUpdate: number = 0;
  let liveUpdatesEnabled = true;
  
  let contentManager: any = null;
  let unsubscribe: (() => void) | null = null;
  
  $: sectionProps = content?.shipping ? {
    title: content.shipping.title || 'Kargo ve Teslimat',
    subtitle: content.shipping.subtitle || '',
    description: content.shipping.description || '',
    content: content.shipping.content || '',
    footerContent: content.shipping.footerContent || '',
    variant: 'default',
    size: 'large',
  } : null;
  
  onMount(async () => {
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
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  onDestroy(() => {
    if (contentManager) contentManager.stopLiveUpdates();
    if (unsubscribe) unsubscribe();
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
  <title>Kargo ve Teslimat - Noir Crafted</title>
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
