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
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
  import Footer from '$lib/components/organisms/Footer.svelte';
  import HomeFeaturedProducts from '$lib/components/sections/HomeFeaturedProducts.svelte';
  import HomeWhyNoir from '$lib/components/sections/HomeWhyNoir.svelte';
  import HomeMotifs from '$lib/components/sections/HomeMotifs.svelte';
  import HomeImpactStats from '$lib/components/sections/HomeImpactStats.svelte';
  import HomeKeyFeatures from '$lib/components/sections/HomeKeyFeatures.svelte';
  import HomeNewsletter from '$lib/components/sections/HomeNewsletter.svelte';
  import ContentNotFound from '$lib/components/common/ContentNotFound.svelte';
  
  // SvelteKit automatically provides params via $page.params
  // Declare it here to suppress the unknown prop warning
  export const params: Record<string, string> = {};
  
  // Dynamic import for cinematic hero (client-side only)
  let CinematicModule: any = null;
  let scenes: any[] = [];
  let contentSectionsRef: HTMLDivElement | null = null;

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
    
    // Load cinematic hero component (client-side only)
    if (typeof window !== 'undefined') {
      try {
        console.log('[Page] Loading cinematic hero component...');
        CinematicModule = await import(
          '$lib/components/cinematic-hero/CinematicSceneShowcase'
        );
        console.log('[Page] ✅ Cinematic hero module loaded:', CinematicModule);

        // Transform database scenes to ScenePerspective format
        const dbScenes = $contentStore.content?.scenes;
        if (dbScenes && Array.isArray(dbScenes) && dbScenes.length > 0) {
          scenes = dbScenes.map((s: any) => ({
            title: s.title || '',
            subtitle: s.subtitle || '',
            position: s.position || 'center',
            camera: s.camera || { x: 0, y: 0, z: 0 },
            target: s.target || { x: 0, y: 0, z: 0 },
            rotation: s.rotation,
            scrollProgress: s.scrollProgress || { start: 0, end: 100 },
            hideText: s.hideText || false,
          }));
        }
        
        // Wait for React component to mount, then move content sections into scroll container
        // This matches the variant-2 layout where content is inside the scroll container
        const moveContentSections = () => {
          const contentContainer = document.getElementById('cinematic-content-sections');
          if (contentContainer && contentSectionsRef) {
            // Move all content sections into the scroll container
            while (contentSectionsRef.firstChild) {
              contentContainer.appendChild(contentSectionsRef.firstChild);
            }
            // Remove the now-empty wrapper
            contentSectionsRef.remove();
          }
        };
        
        // Try multiple times to ensure React component has mounted
        const tryMove = () => {
          const contentContainer = document.getElementById('cinematic-content-sections');
          if (contentContainer) {
            console.log('[Page] ✅ Moving content sections into scroll container');
            moveContentSections();
          } else {
            setTimeout(tryMove, 100);
          }
        };
        
        // Start trying after a short delay
        setTimeout(tryMove, 500);
      } catch (err) {
        console.error('[Page] ❌ Failed to load cinematic hero:', err);
        console.error('[Page] Error details:', err instanceof Error ? err.stack : err);
      }
    }
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
  {#if typeof window !== 'undefined' && CinematicModule}
    <!-- Cinematic Hero with Content Sections - Variant 2 Layout -->
    <div class="cinematic-page-wrapper">
      <!-- Cinematic Hero - React Component (handles scroll container internally) -->
      {#if CinematicModule && CinematicModule.default}
        <LocalReactWrapper
          componentModule={CinematicModule}
          componentName="default"
          props={{
            scenes: scenes.length > 0 ? scenes : undefined,
          }}
        />
      {:else}
        <div style="padding: 2rem; color: white;">
          <p>Loading cinematic hero...</p>
          <p>CinematicModule: {CinematicModule ? 'loaded' : 'not loaded'}</p>
        </div>
      {/if}
      
      <!-- Content Sections - Svelte Components (will be moved into scroll container) -->
      <div class="content-sections-wrapper" bind:this={contentSectionsRef} style="display: none;">
        {#if featuredBlock?.title || featuredBlock?.description || featuredProducts.length}
          <div class="section-container">
            <HomeFeaturedProducts
              title={featuredBlock?.title ?? ''}
              subtitle={featuredBlock?.subtitle ?? ''}
              description={featuredBlock?.description ?? ''}
              products={featuredProducts}
            />
          </div>
        {/if}

        {#if whyNoirCards.length}
          <div class="section-container">
            <HomeWhyNoir title={whyNoirTitle} cards={whyNoirCards} />
          </div>
        {/if}

        {#if motifs.length}
          <div class="section-container">
            <HomeMotifs
              title={motifsBlock?.title ?? ''}
              subtitle={motifsBlock?.subtitle ?? ''}
              motifs={motifs}
            />
          </div>
        {/if}

        {#if impactStats.length}
          <div class="section-container">
            <HomeImpactStats stats={impactStats} />
          </div>
        {/if}

        {#if keyFeatures.items.length}
          <div class="section-container">
            <HomeKeyFeatures
              title={keyFeatures.title}
              subtitle={keyFeatures.subtitle}
              items={keyFeatures.items}
            />
          </div>
        {/if}

        {#if newsletterCopy}
          <div class="section-container">
            <HomeNewsletter
              title={newsletterCopy.title ?? ''}
              description={newsletterCopy.description ?? ''}
              placeholder={newsletterCopy.placeholder ?? ''}
              button={newsletterCopy.button ?? ''}
            />
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Fallback: Simple Hero (SSR or loading) -->
    <Layout lang="tr-TR" theme="dark">
      <div class="page-shell">
        <div class="hero-intro">
          <h1>{heroProps.title}</h1>
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
  {/if}

  <Footer logoText={siteCopy?.name ?? 'NOIR'} description={footerCopy.description} />
{/if}

<style lang="scss">
  /* Isolate page styles from global app.css */
  :global(body) {
    background-color: #0a0a0a !important;
    color: #f7f5ef !important;
    font-family: 'Inter', 'Roboto', system-ui, sans-serif;
    overflow-x: hidden;
    position: relative;
    z-index: 0;
  }
  
  /* Ensure no GSAP ScrollSmoother conflicts on main page */
  :global(html) {
    overflow-x: hidden;
    background: #0a0a0a;
  }

  .cinematic-page-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #0a0a0a;
  }
  
  /* Content sections are moved into React component's scroll container */
  /* The wrapper is hidden and removed after content is moved */
  
  .section-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 8rem 1.5rem;
  }

  .page-shell {
    min-height: 100vh;
    background: radial-gradient(circle at top, rgba(240, 213, 138, 0.08), transparent 55%),
      #020202;
    padding-bottom: 4rem;
    position: relative;
    overflow-x: hidden;
    width: 100%;
    z-index: 1;
    isolation: isolate;
  }
  
  :global(.content-sections-wrapper) {
    position: relative;
    z-index: 30;
    background: linear-gradient(to bottom, transparent, #020202 10%);
  }
  
  :global(.section-container) {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
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
