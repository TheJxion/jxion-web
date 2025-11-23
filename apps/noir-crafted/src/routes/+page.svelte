<script lang="ts">
  /* Core Imports */
  import { onMount, onDestroy } from 'svelte';
  import type { Locale } from '@jxion/i18n';
  import { content as defaultContent } from '$lib/i18n/content';
  import {
    contentStore,
    ensureContentStore,
    refreshContentStore,
  } from '$lib/stores/contentStore';

  import Layout from '$lib/components/jxion/Layout.svelte';
  import Hero from '$lib/components/jxion/Hero.svelte';
  import Footer from '$lib/components/organisms/Footer.svelte';
  import HomeFeaturedProducts from '$lib/components/sections/HomeFeaturedProducts.svelte';
  import HomeWhyNoir from '$lib/components/sections/HomeWhyNoir.svelte';
  import HomeMotifs from '$lib/components/sections/HomeMotifs.svelte';
  import HomeImpactStats from '$lib/components/sections/HomeImpactStats.svelte';
  import HomeKeyFeatures from '$lib/components/sections/HomeKeyFeatures.svelte';
  import HomeNewsletter from '$lib/components/sections/HomeNewsletter.svelte';
  import ContentNotFound from '$lib/components/common/ContentNotFound.svelte';

  let lang: Locale = 'tr-TR';
  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let unsubscribeStore: (() => void) | null = null;

  onMount(async () => {
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

  // Check if content is actually available (not just fallback)
  // Use fromApi flag to determine if content came from database
  $: hasRealContent = $contentStore.fromApi && 
    contentData?.home?.hero?.title && 
    contentData.home.hero.title !== 'Content Not Available';

  // Helper to filter out placeholder values
  // Matches: {tagline}, {tagline testing}, {placeholder} text, etc.
  const isPlaceholder = (value: string | undefined | null): boolean => {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    // Match exact {placeholder} or strings starting with {placeholder}
    return /^\{[^}]+\}/.test(trimmed); // Matches {placeholder} at start
  };
  
  // Helper to clean placeholder values - removes {placeholder} part
  const cleanPlaceholder = (value: string | undefined | null): string => {
    if (!value || typeof value !== 'string') return '';
    // Remove {placeholder} pattern and any leading/trailing whitespace
    return value.replace(/^\{[^}]+\}\s*/, '').trim();
  };

  $: heroContent = contentData?.home?.hero ?? defaultContent.home.hero;
  $: heroTaglineValue = (heroContent as any)?.tagline;
  // Clean tagline: if it contains placeholder pattern, extract the text after it
  // Otherwise use the value as-is if it's not a placeholder
  $: cleanTagline = heroTaglineValue 
    ? (isPlaceholder(heroTaglineValue) 
        ? cleanPlaceholder(heroTaglineValue) 
        : heroTaglineValue)
    : '';
  
  $: heroProps = heroContent && hasRealContent
    ? {
        title: heroContent.title ?? '',
        subtitle: heroContent.subtitle ?? '',
        description: heroContent.description ?? '',
        ctaText: heroContent.primaryCta ?? '',
        statsValue: (contentData?.home?.whatsourimpact?.stats?.[0] as any)?.value ?? '',
        statsLabel: (contentData?.home?.whatsourimpact?.stats?.[0] as any)?.label ?? '',
        cardSubtitle: cleanTagline,
        testId: 'noir-crafted-hero',
      }
    : null;

  $: featuredBlock = contentData?.home?.featured ?? defaultContent.home.featured;
  $: rawFeaturedProducts = (featuredBlock?.products as any[])?.length
    ? (featuredBlock.products as any[])
    : [];
  
  // Transform products to match HomeFeaturedProducts expected format
  $: featuredProducts = rawFeaturedProducts.map((p: any) => ({
    title: p.name ?? '',
    description: p.description ?? '',
    price: p.price ? `${p.price.toLocaleString('tr-TR')}₺` : '',
    imageUrl: p.image || p.images?.[0] || '',
  }));

  $: whyNoirBlock = contentData?.home?.whyNoir ?? defaultContent.home.whyNoir;
  $: whyNoirTitle = whyNoirBlock?.title ?? '';
  $: whyNoirCards = ((whyNoirBlock?.sections as any[]) ?? []).filter((s: any) => s && s.title);

  $: motifsBlock = contentData?.home?.motifs ?? defaultContent.home.motifs;
  $: motifs = ((motifsBlock?.items as any[]) ?? []).filter((motif: any) => motif && motif.name);

  $: impactStats = (contentData?.home?.whatsourimpact?.stats as any[]) ?? [];
  $: keyFeaturesBlock = contentData?.home?.keyFeatures ?? defaultContent.home.keyFeatures;
  $: keyFeatures = {
    title: keyFeaturesBlock?.title ?? '',
    subtitle: keyFeaturesBlock?.subtitle ?? '',
    items: ((keyFeaturesBlock?.items as any[]) ?? []).filter((item: any) => item && item.title),
  };
  $: newsletterCopy = contentData?.home?.newsletter ?? defaultContent.home.newsletter;
  $: footerCopy = contentData?.footer ?? defaultContent.footer;
  $: siteCopy = contentData?.site ?? defaultContent.site;
  $: heroTagline = cleanTagline; // Use cleaned tagline value
</script>

<svelte:head>
  <title>
    {siteCopy?.name ?? 'NOIR'} | {heroContent?.title?.replace(/\n/g, ' ') ??
      'Zamanın Ötesinde Takı Deneyimi'}
  </title>
  <meta
    name="description"
    content={heroContent?.description ??
      'Yapay zeka güdümlü tasarımı Türk mirasıyla bütünleştiren lüks takı koleksiyonu'}
  />
</svelte:head>

{#if loading}
  <div class="page-state page-state--loading">
    <p>İçerik yükleniyor...</p>
  </div>
{:else if error}
  <ContentNotFound
    title="Content Not Available"
    message={error || 'Content is currently being configured through the admin panel. Please check back soon.'}
  />
{:else if !hasRealContent}
  <ContentNotFound
    title="Content Not Configured"
    message="This content is currently being configured through the admin panel. Please check back soon."
  />
{:else if heroProps}
  <Layout>
    <div class="page-shell">
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

      <div class="hero-intro">
        <p class="hero-intro__copy">{@html heroContent?.description ?? ''}</p>
        {#if heroTagline}
          <span class="hero-intro__tagline">{heroTagline}</span>
        {/if}
      </div>

      {#if featuredBlock?.title || featuredBlock?.description || featuredProducts.length}
        <HomeFeaturedProducts
          title={featuredBlock?.title ?? ''}
          subtitle={featuredBlock?.subtitle ?? ''}
          description={featuredBlock?.description ?? ''}
          products={featuredProducts}
        />
      {/if}

      {#if whyNoirCards.length}
        <HomeWhyNoir title={whyNoirTitle} cards={whyNoirCards} />
      {/if}

      {#if motifs.length}
        <HomeMotifs
          title={motifsBlock?.title ?? ''}
          subtitle={motifsBlock?.subtitle ?? ''}
          motifs={motifs}
        />
      {/if}

      {#if impactStats.length}
        <HomeImpactStats stats={impactStats} />
      {/if}

      {#if keyFeatures.items.length}
        <HomeKeyFeatures
          title={keyFeatures.title}
          subtitle={keyFeatures.subtitle}
          items={keyFeatures.items}
        />
      {/if}

      {#if newsletterCopy}
        <HomeNewsletter
          title={newsletterCopy.title ?? ''}
          description={newsletterCopy.description ?? ''}
          placeholder={newsletterCopy.placeholder ?? ''}
          button={newsletterCopy.button ?? ''}
        />
      {/if}
    </div>
  </Layout>

  <Footer logoText={siteCopy?.name ?? 'NOIR'} description={footerCopy.description} />
{/if}

<style lang="scss">
  /* Isolate page styles from global app.css */
  :global(body) {
    background-color: #020202;
    color: #f7f5ef;
    font-family: 'Inter', 'Roboto', system-ui, sans-serif;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }
  
  /* Ensure no GSAP ScrollSmoother conflicts on main page */
  :global(html) {
    overflow-x: hidden;
  }

  .page-shell {
    min-height: 100vh;
    background: radial-gradient(circle at top, rgba(240, 213, 138, 0.08), transparent 55%),
      #020202;
    padding-bottom: 4rem;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }

  .hero-intro {
    max-width: 680px;
    margin: 0 auto 4rem;
    text-align: center;
    padding: 0 1.5rem;

    &__copy {
      font-size: 1.1rem;
      line-height: 1.8;
      color: rgba(247, 245, 239, 0.85);
    }

    &__tagline {
      display: inline-block;
      margin-top: 1rem;
      letter-spacing: 0.25em;
      font-size: 0.85rem;
      text-transform: uppercase;
      color: #f0d58a;
    }
  }

  .page-state {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f7f5ef;
    gap: 1rem;
  }
</style>
