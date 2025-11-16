<!--
  Jxion Stack — FAQ Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: FAQ page using Jxion components with dynamic content
  
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
  import FAQ from '$lib/components/jxion/FAQ.svelte';
  
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
  $: faqProps = content?.faq ? {
    title: content.faq.title || 'Sık Sorulan Sorular',
    items: Array.isArray(content.faq.items) 
      ? content.faq.items.map((item: any) => ({
          question: item.question || '',
          answer: item.answer || '',
        }))
      : [],
  } : null;
  
  onMount(async () => {
    console.log('[FAQ-Page] 🚀 Initializing FAQ page...');
    console.log('[FAQ-Page] 📦 Using components from @jxion/design via Svelte wrappers');
    
    try {
      // Initialize content manager
      contentManager = getContentManager({
        baseUrl: '/api/content',
        enableLiveUpdates: liveUpdatesEnabled,
        updateInterval: 5000,
        onUpdate: handleContentUpdate,
      });
      
      console.log('[FAQ-Page] ✅ Content manager initialized');
      
      // Load initial content - try ContentManager, fallback to local
      await loadContent();
      
      // Start live updates
      if (liveUpdatesEnabled) {
        contentManager.startLiveUpdates();
        console.log('[FAQ-Page] ▶️ Live updates started');
      }
      
      // Subscribe to updates
      unsubscribe = contentManager.onUpdate(handleContentUpdate);
      console.log('[FAQ-Page] 📡 Subscribed to content updates');
      
    } catch (err) {
      console.error('[FAQ-Page] ❌ Error initializing:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  onDestroy(() => {
    console.log('[FAQ-Page] 🧹 Cleaning up...');
    if (contentManager) {
      contentManager.stopLiveUpdates();
      console.log('[FAQ-Page] ⏸️ Live updates stopped');
    }
    if (unsubscribe) {
      unsubscribe();
      console.log('[FAQ-Page] 📡 Unsubscribed from updates');
    }
  });
  
  async function loadContent() {
    console.log('[FAQ-Page] 📂 Loading content from ContentManager...');
    loading = true;
    error = null;
    
    try {
      // Try to load from ContentManager API
      const loadedContent = await contentManager.loadContent('noir-crafted/content.json');
      content = loadedContent;
      lastUpdate = Date.now();
      loading = false;
      
      console.log('[FAQ-Page] ✅ Content loaded from ContentManager:', {
        size: JSON.stringify(content).length,
        timestamp: lastUpdate,
        hasFAQ: !!content?.home?.faq,
        contentKeys: Object.keys(content || {}),
      });
    } catch (err) {
      console.warn('[FAQ-Page] ⚠️ ContentManager API not available, using fallback content');
      
      // Fallback: Import local content file
      try {
        const { content: localContent } = await import('$lib/i18n/content');
        content = localContent;
        lastUpdate = Date.now();
        loading = false;
        
        console.log('[FAQ-Page] ✅ Using fallback content from $lib/i18n/content.ts:', {
          size: JSON.stringify(content).length,
          hasFAQ: !!content?.faq,
        });
      } catch (fallbackErr) {
        console.error('[FAQ-Page] ❌ Error loading fallback content:', fallbackErr);
        error = 'Failed to load content from both ContentManager and fallback';
        loading = false;
      }
    }
  }
  
  function handleContentUpdate(update: ContentUpdate) {
    console.log('[FAQ-Page] 🔄 Content update received:', {
      type: update.type,
      path: update.path,
      timestamp: update.timestamp,
    });
    
    if (update.path === 'noir-crafted/content.json') {
      content = update.content;
      lastUpdate = update.timestamp;
      console.log('[FAQ-Page] ✅ Content updated in UI - components will re-render');
    }
  }
</script>

<svelte:head>
  <title>Sık Sorulan Sorular - Noir Crafted</title>
  <meta name="description" content="Sık sorulan sorular ve cevapları" />
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
{:else if content && faqProps}
  <!-- Use Jxion Layout component -->
  <Layout params={{ lang, theme: 'light' }}>
    <!-- Use Jxion FAQ component with dynamic content -->
    <FAQ
      title={faqProps.title}
      items={faqProps.items}
    />
  </Layout>
{/if}

<style>
  /* Minimal styles - components use their own SCSS modules */
  .loading-state,
  .error-state {
    padding: 2rem;
    text-align: center;
  }
</style>

