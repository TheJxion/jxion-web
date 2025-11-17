<!--
  Jxion Stack — Privacy Page
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: Privacy page using Jxion components with dynamic content
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
  
  $: sectionProps = contentData?.privacy ? {
    title: contentData.privacy.title || 'Gizlilik Politikası',
    subtitle: contentData.privacy.subtitle || '',
    description: contentData.privacy.description || '',
    content: contentData.privacy.content || '',
    footerContent: contentData.privacy.footerContent || '',
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
  <title>Gizlilik Politikası - Noir Crafted</title>
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
