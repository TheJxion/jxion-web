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
  import { getContentManager, type ContentUpdate } from '@jxion/core';
  import { getDictionary, type Locale } from '@jxion/i18n';
  
  // Import Jxion Svelte components (matching jxion-svelte pattern)
  import Hero from '$lib/components/jxion/Hero.svelte';
  import Layout from '$lib/components/jxion/Layout.svelte';
  
  // Dynamic content from ContentManager (not static typing)
  let lang: Locale = 'tr-TR';
  let content: any = null;
  let loading = true;
  let error: string | null = null;
  let lastUpdate: number = 0;
  let liveUpdatesEnabled = true;
  
  let contentManager: any = null;
  let unsubscribe: (() => void) | null = null;
  let dictionary: any = null;
  
  // Compute component props from dynamic content (not static typing)
  $: heroProps = content?.home?.hero ? {
    title: content.home.hero.title || '',
    subtitle: content.home.hero.subtitle || '',
    description: content.home.hero.description || '',
    ctaText: content.home.hero.primaryCta || '',
    statsValue: '7',
    statsLabel: 'Years Experience',
    cardSubtitle: '',
    testId: 'hero-demo',
  } : null;
  
  onMount(async () => {
    console.log('[Jxion-Demo] 🚀 Initializing Jxion demo page...');
    console.log('[Jxion-Demo] 📦 Using components from @jxion/design via Svelte wrappers');
    
    try {
      // Load dictionary for translations (Svelte-compatible, not React hook)
      try {
        dictionary = await getDictionary(lang);
        console.log('[Jxion-Demo] ✅ Dictionary loaded:', lang);
      } catch (dictErr) {
        console.warn('[Jxion-Demo] ⚠️ Failed to load dictionary, continuing without translations:', dictErr);
        dictionary = {};
      }
      
      // Initialize content manager
      contentManager = getContentManager({
        baseUrl: '/api/content',
        enableLiveUpdates: liveUpdatesEnabled,
        updateInterval: 5000,
        onUpdate: handleContentUpdate,
      });
      
      console.log('[Jxion-Demo] ✅ Content manager initialized');
      
      // Load initial content - try ContentManager, fallback to local
      await loadContent();
      
      // Start live updates
      if (liveUpdatesEnabled) {
        contentManager.startLiveUpdates();
        console.log('[Jxion-Demo] ▶️ Live updates started');
      }
      
      // Subscribe to updates
      unsubscribe = contentManager.onUpdate(handleContentUpdate);
      console.log('[Jxion-Demo] 📡 Subscribed to content updates');
      
    } catch (err) {
      console.error('[Jxion-Demo] ❌ Error initializing:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  onDestroy(() => {
    console.log('[Jxion-Demo] 🧹 Cleaning up...');
    if (contentManager) {
      contentManager.stopLiveUpdates();
      console.log('[Jxion-Demo] ⏸️ Live updates stopped');
    }
    if (unsubscribe) {
      unsubscribe();
      console.log('[Jxion-Demo] 📡 Unsubscribed from updates');
    }
  });
  
  async function loadContent() {
    console.log('[Jxion-Demo] 📂 Loading content from ContentManager...');
    loading = true;
    error = null;
    
    try {
      // Try to load from ContentManager API
      const loadedContent = await contentManager.loadContent('noir-crafted/content.json');
      content = loadedContent;
      lastUpdate = Date.now();
      loading = false;
      
      console.log('[Jxion-Demo] ✅ Content loaded from ContentManager:', {
        size: JSON.stringify(content).length,
        timestamp: lastUpdate,
        hasHero: !!content?.home?.hero,
        contentKeys: Object.keys(content || {}),
      });
    } catch (err) {
      console.warn('[Jxion-Demo] ⚠️ ContentManager API not available, using fallback content');
      
      // Fallback: Import local content file
      try {
        const { content: localContent } = await import('$lib/i18n/content');
        content = localContent;
        lastUpdate = Date.now();
        loading = false;
        
        console.log('[Jxion-Demo] ✅ Using fallback content from $lib/i18n/content.ts:', {
          size: JSON.stringify(content).length,
          hasHero: !!content?.home?.hero,
        });
      } catch (fallbackErr) {
        console.error('[Jxion-Demo] ❌ Error loading fallback content:', fallbackErr);
        error = 'Failed to load content from both ContentManager and fallback';
        loading = false;
      }
    }
  }
  
  function handleContentUpdate(update: ContentUpdate) {
    console.log('[Jxion-Demo] 🔄 Content update received:', {
      type: update.type,
      path: update.path,
      timestamp: update.timestamp,
    });
    
    if (update.path === 'noir-crafted/content.json') {
      content = update.content;
      lastUpdate = update.timestamp;
      console.log('[Jxion-Demo] ✅ Content updated in UI - components will re-render');
    }
  }
  
  function toggleLiveUpdates() {
    liveUpdatesEnabled = !liveUpdatesEnabled;
    console.log(`[Jxion-Demo] ${liveUpdatesEnabled ? '▶️' : '⏸️'} Live updates ${liveUpdatesEnabled ? 'enabled' : 'disabled'}`);
    
    if (contentManager) {
      if (liveUpdatesEnabled) {
        contentManager.startLiveUpdates();
      } else {
        contentManager.stopLiveUpdates();
      }
    }
  }
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
    <button on:click={loadContent}>Retry</button>
  </div>
{:else if content && heroProps}
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
      <p><strong>Live Updates:</strong> {liveUpdatesEnabled ? '✅ Enabled' : '⏸️ Disabled'}</p>
      <p><strong>Content Size:</strong> {JSON.stringify(content).length} bytes</p>
      <p><strong>Components Used:</strong> Layout, Hero</p>
    </div>
    <button on:click={toggleLiveUpdates}>
      {liveUpdatesEnabled ? 'Disable' : 'Enable'} Live Updates
    </button>
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
  
  .debug-panel button {
    width: 100%;
    padding: 0.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 0.5rem;
  }
  
  .console-note {
    font-size: 0.65rem;
    color: #aaa;
    margin-top: 0.5rem;
    line-height: 1.4;
  }
</style>
