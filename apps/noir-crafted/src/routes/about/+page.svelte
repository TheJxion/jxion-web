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
  import type { Locale } from '@jxion/i18n';
  import { content as defaultContent } from '$lib/i18n/content';
  import {
    contentStore,
    ensureContentStore,
    refreshContentStore,
  } from '$lib/stores/contentStore';
  
  import Layout from '$lib/components/jxion/Layout.svelte';
  import Section from '$lib/components/jxion/Section.svelte';
  
  let lang: Locale = 'tr-TR';
  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let unsubscribeStore: (() => void) | null = null;
  
  $: sectionProps = contentData?.about ? {
    title: contentData.about.title || 'Hakkımızda',
    subtitle: contentData.about.subtitle || '',
    description: contentData.about.description || '',
    content: contentData.about.content || '',
    footerContent: contentData.about.footerContent || '',
    variant: 'default',
    size: 'large',
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
    <button on:click={refreshContentStore}>Retry</button>
  </div>
{:else if sectionProps}
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

