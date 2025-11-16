<!--
  Jxion Stack — About Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: About page using Jxion components with dynamic content
  
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
  $: sectionProps = content?.about ? {
    title: content.about.title || 'Hakkımızda',
    subtitle: content.about.subtitle || '',
    description: content.about.description || '',
    content: content.about.content || '',
    footerContent: content.about.footerContent || '',
    variant: 'default',
    size: 'large',
  } : null;
  
  onMount(async () => {
    console.log('[About-Page] 🚀 Initializing about page...');
    console.log('[About-Page] 📦 Using components from @jxion/design via Svelte wrappers');
    
    try {
      // Initialize content manager
      contentManager = getContentManager({
        baseUrl: '/api/content',
        enableLiveUpdates: liveUpdatesEnabled,
        updateInterval: 5000,
        onUpdate: handleContentUpdate,
      });
      
      console.log('[About-Page] ✅ Content manager initialized');
      
      // Load initial content - try ContentManager, fallback to local
      await loadContent();
      
      // Start live updates
      if (liveUpdatesEnabled) {
        contentManager.startLiveUpdates();
        console.log('[About-Page] ▶️ Live updates started');
      }
      
      // Subscribe to updates
      unsubscribe = contentManager.onUpdate(handleContentUpdate);
      console.log('[About-Page] 📡 Subscribed to content updates');
      
    } catch (err) {
      console.error('[About-Page] ❌ Error initializing:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  onDestroy(() => {
    console.log('[About-Page] 🧹 Cleaning up...');
    if (contentManager) {
      contentManager.stopLiveUpdates();
      console.log('[About-Page] ⏸️ Live updates stopped');
    }
    if (unsubscribe) {
      unsubscribe();
      console.log('[About-Page] 📡 Unsubscribed from updates');
    }
  });
  
  async function loadContent() {
    console.log('[About-Page] 📂 Loading content from ContentManager...');
    loading = true;
    error = null;
    
    try {
      // Try to load from ContentManager API
      const loadedContent = await contentManager.loadContent('noir-crafted/content.json');
      content = loadedContent;
      lastUpdate = Date.now();
      loading = false;
      
      console.log('[About-Page] ✅ Content loaded from ContentManager:', {
        size: JSON.stringify(content).length,
        timestamp: lastUpdate,
        hasAbout: !!content?.about,
        contentKeys: Object.keys(content || {}),
      });
    } catch (err) {
      console.warn('[About-Page] ⚠️ ContentManager API not available, using fallback content');
      
      // Fallback: Import local content file
      try {
        const { content: localContent } = await import('$lib/i18n/content');
        content = localContent;
        lastUpdate = Date.now();
        loading = false;
        
        console.log('[About-Page] ✅ Using fallback content from $lib/i18n/content.ts:', {
          size: JSON.stringify(content).length,
          hasAbout: !!content?.about,
        });
      } catch (fallbackErr) {
        console.error('[About-Page] ❌ Error loading fallback content:', fallbackErr);
        error = 'Failed to load content from both ContentManager and fallback';
        loading = false;
      }
    }
  }
  
  function handleContentUpdate(update: ContentUpdate) {
    console.log('[About-Page] 🔄 Content update received:', {
      type: update.type,
      path: update.path,
      timestamp: update.timestamp,
    });
    
    if (update.path === 'noir-crafted/content.json') {
      content = update.content;
      lastUpdate = update.timestamp;
      console.log('[About-Page] ✅ Content updated in UI - components will re-render');
    }
  }
</script>

<svelte:head>
  <title>Hakkımızda - Noir Crafted</title>
  <meta name="description" content="Noir markasının vizyonu ve hikayesi" />
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
  <!-- Use Jxion Layout component -->
  <Layout params={{ lang, theme: 'light' }}>
    <!-- Use Jxion Section component with dynamic content -->
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
  /* Minimal styles - components use their own SCSS modules */
  .loading-state,
  .error-state {
    padding: 2rem;
    text-align: center;
  }
</style>

