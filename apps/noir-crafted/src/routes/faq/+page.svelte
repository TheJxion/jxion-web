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
  import type { Locale } from '@jxion/i18n';
  import { content as defaultContent } from '$lib/i18n/content';
  import {
    contentStore,
    ensureContentStore,
    refreshContentStore,
  } from '$lib/stores/contentStore';
  import Layout from '$lib/components/jxion/Layout.svelte';
  import FAQ from '$lib/components/jxion/FAQ.svelte';
  
  let lang: Locale = 'tr-TR';
  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let unsubscribeStore: (() => void) | null = null;
  
  $: faqProps = contentData?.faq ? {
    title: contentData.faq.title || 'Sık Sorulan Sorular',
    items: Array.isArray(contentData.faq.items)
      ? contentData.faq.items.map((item: any) => ({
          question: item.question || '',
          answer: item.answer || '',
        }))
      : [],
  } : null;
  
  onMount(() => {
    ensureContentStore();
    unsubscribeStore = contentStore.subscribe(($state) => {
      contentData = $state.content;
      loading = $state.loading;
      error = $state.error;
    });
  });
  
  onDestroy(() => {
    unsubscribeStore?.();
  });
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
    <button on:click={refreshContentStore}>Retry</button>
  </div>
{:else if faqProps}
  <!-- Use Jxion Layout component -->
  <Layout lang={lang} theme="light">
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

