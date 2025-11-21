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
  import Hero from '$lib/components/jxion/Hero.svelte';
  import Footer from '$lib/components/organisms/Footer.svelte';
  import HomeFeaturedProducts from '$lib/components/sections/HomeFeaturedProducts.svelte';
  import HomeWhyNoir from '$lib/components/sections/HomeWhyNoir.svelte';
  import HomeMotifs from '$lib/components/sections/HomeMotifs.svelte';
  import HomeImpactStats from '$lib/components/sections/HomeImpactStats.svelte';
  import HomeKeyFeatures from '$lib/components/sections/HomeKeyFeatures.svelte';
  import HomeNewsletter from '$lib/components/sections/HomeNewsletter.svelte';

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

  const fallbackProducts = defaultContent.home.featured.products ?? [];
  const fallbackMotifs = defaultContent.home.motifs.items ?? [];
  const fallbackStats = defaultContent.home.whatsourimpact?.stats ?? [];

  $: heroContent = contentData?.home?.hero ?? defaultContent.home.hero;
  $: heroStatsValue = fallbackStats[0]?.value ?? '24K+';
  $: heroStatsLabel = fallbackStats[0]?.label ?? 'Mutlu Müşteri';
  $: heroProps = heroContent
    ? {
        title: heroContent.title ?? '',
        subtitle: heroContent.subtitle ?? '',
        description: heroContent.description ?? '',
        ctaText: heroContent.primaryCta ?? '',
        statsValue: heroStatsValue,
        statsLabel: heroStatsLabel,
        cardSubtitle: heroContent.tagline ?? '',
        testId: 'noir-crafted-hero',
      }
    : null;

  $: featuredBlock = contentData?.home?.featured ?? defaultContent.home.featured;
  $: rawFeaturedProducts = featuredBlock?.products?.length
    ? featuredBlock.products
    : fallbackProducts;
  
  // Transform products to match HomeFeaturedProducts expected format
  $: featuredProducts = rawFeaturedProducts.map((p) => ({
    title: p.name,
    description: p.description,
    price: p.price ? `${p.price.toLocaleString('tr-TR')}₺` : '',
    imageUrl: p.image || p.images?.[0] || '',
  }));

  $: whyNoirBlock = contentData?.home?.whyNoir ?? defaultContent.home.whyNoir;
  $: whyNoirTitle = whyNoirBlock?.title ?? '';
  $: whyNoirCards = (whyNoirBlock?.sections ?? []).filter((s) => s && s.title);

  $: motifsBlock = contentData?.home?.motifs ?? defaultContent.home.motifs;
  $: motifs = (motifsBlock?.items ?? fallbackMotifs).filter((motif) => motif && motif.name);

  $: impactStats = fallbackStats;
  $: keyFeaturesBlock = contentData?.home?.keyFeatures ?? defaultContent.home.keyFeatures;
  $: keyFeatures = {
    title: keyFeaturesBlock?.title ?? '',
    subtitle: keyFeaturesBlock?.subtitle ?? '',
    items: (keyFeaturesBlock?.items ?? []).filter((item) => item && item.title),
  };
  $: newsletterCopy = contentData?.home?.newsletter ?? defaultContent.home.newsletter;
  $: footerCopy = contentData?.footer ?? defaultContent.footer;
  $: siteCopy = contentData?.site ?? defaultContent.site;
</script>

<svelte:head>
  <title>NOIR | Zamanın Ötesinde Takı Deneyimi</title>
  <meta
    name="description"
    content="Yapay zeka güdümlü tasarımı Türk mirasıyla bütünleştiren lüks takı koleksiyonu"
  />
</svelte:head>

{#if loading}
  <div class="page-state page-state--loading">
    <p>İçerik yükleniyor...</p>
  </div>
{:else if error}
  <div class="page-state page-state--error">
    <p>{error}</p>
    <button on:click={refreshContentStore}>Tekrar Dene</button>
  </div>
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
        {#if heroContent?.tagline}
          <span class="hero-intro__tagline">{heroContent.tagline}</span>
        {/if}
      </div>

      {#if featuredProducts.length}
        <HomeFeaturedProducts
          title={featuredBlock?.title ?? ''}
          subtitle={featuredBlock?.subtitle ?? ''}
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
  :global(body) {
    background-color: #020202;
    color: #f7f5ef;
    font-family: 'Inter', 'Roboto', system-ui, sans-serif;
  }

  .page-shell {
    min-height: 100vh;
    background: radial-gradient(circle at top, rgba(240, 213, 138, 0.08), transparent 55%),
      #020202;
    padding-bottom: 4rem;
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

    &--error button {
      padding: 0.8rem 1.5rem;
      border-radius: 999px;
      border: none;
      background: #f0d58a;
      color: #050505;
      letter-spacing: 0.08em;
      cursor: pointer;
    }
  }
</style>
