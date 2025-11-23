<!--
  Jxion Stack — Demo Page
  Phase Reference: Phase 1 — Dynamic Content Foundations
  Description: Demo page showcasing registry-driven hero component with runtime translations
  
  This page demonstrates:
  - Mock Hero component rendered via @jxion-core registry
  - Translation placeholders from @jxion-i18n
  - Runtime values showing the concept of live translations
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { getTranslation, getTranslations, type Locale } from '@jxion/i18n';
  import { loadComponent, getComponentMetadata, type Framework } from '@jxion/core';

  // Dynamic translation data loaded from @jxion-i18n
  let heroTitle = 'Loading...';
  let heroSubtitle = 'Loading...';
  let heroDescription = 'Loading...';
  let primaryCta = 'Loading...';
  let secondaryCta = 'Loading...';
  let demoInfo: Record<string, string> = {};

  // Component registry data loaded from @jxion-core
  let componentMetadata: any = null;
  let componentHtml = '';
  let componentCode = '';
  let loadingState = 'Loading translations and component from shared libraries...';
  let renderInfo: Record<string, any> = {};

  // Locale selector
  let currentLocale: Locale = 'tr-TR';
  let framework: Framework = 'svelte';
  
  // Debug info
  let cacheStatus: 'HIT' | 'MISS' | 'STALE' = 'MISS';
  let renderTime: number = 0;
  let translationSource: string = '@jxion-i18n (runtime)';

  onMount(async () => {
    console.log('🚀 [DEMO] Starting dynamic content loading...');
    console.log('📦 [DEMO] Loading from @jxion-i18n and @jxion-core');
    
    try {
      // Step 1: Load component metadata from registry
      console.log('📋 [DEMO] Step 1: Loading component metadata from @jxion-core registry...');
      componentMetadata = getComponentMetadata('hero');
      
      if (!componentMetadata) {
        throw new Error('Component "hero" not found in registry');
      }
      
      console.log('✅ [DEMO] Component metadata loaded:', componentMetadata);
      renderInfo.componentId = 'hero';
      renderInfo.framework = framework;
      renderInfo.metadata = componentMetadata;

      // Step 2: Load translations from @jxion-i18n
      const translationStartTime = performance.now();
      console.log(`🌐 [DEMO] Step 2: Loading translations from @jxion-i18n (locale: ${currentLocale})...`);
      const translationKeys = [
        'hero.title',
        'hero.subtitle',
        'hero.description',
        'hero.primaryCta',
        'hero.secondaryCta',
        'demo.infoTitle',
        'demo.componentId',
        'demo.framework',
        'demo.translationSource',
        'demo.registrySource'
      ];
      
      const translations = await getTranslations(translationKeys, currentLocale);
      const translationTime = performance.now() - translationStartTime;
      console.log(`✅ [DEMO] Translations loaded in ${translationTime.toFixed(2)}ms:`, translations);
      
      // Detect cache status from console (in real implementation, this would come from the API)
      // For now, we'll infer from timing
      cacheStatus = translationTime < 10 ? 'HIT' : 'MISS';
      
      heroTitle = translations['hero.title'];
      heroSubtitle = translations['hero.subtitle'];
      heroDescription = translations['hero.description'];
      primaryCta = translations['hero.primaryCta'];
      secondaryCta = translations['hero.secondaryCta'];
      
      demoInfo = {
        infoTitle: translations['demo.infoTitle'] || 'Demo Information',
        componentId: translations['demo.componentId'] || 'Component ID',
        framework: translations['demo.framework'] || 'Framework',
        translationSource: translations['demo.translationSource'] || 'Translation Source',
        registrySource: translations['demo.registrySource'] || 'Registry Source'
      };

      renderInfo.translations = translations;
      renderInfo.translationSource = `@jxion-i18n (${currentLocale})`;
      renderInfo.registrySource = '@jxion-core registry';

      // Step 3: Load and render component from registry
      console.log('🎨 [DEMO] Step 3: Loading component HTML from @jxion-core template system...');
      const componentResult = await loadComponent({
        componentId: 'hero',
        framework: 'html', // Use HTML for rendering in Svelte
        props: {
          title: heroTitle,
          subtitle: heroSubtitle,
          description: heroDescription,
          ctaText: primaryCta,
          statsValue: '7',
          statsLabel: 'Years Experience',
          cardSubtitle: 'Trusted by developers',
          testId: 'hero-demo'
        }
      });
      
      componentHtml = componentResult.html;
      componentCode = componentResult.code || '';
      console.log('✅ [DEMO] Component HTML rendered:', componentHtml.substring(0, 100) + '...');
      
      renderInfo.componentHtml = componentHtml;
      renderInfo.renderTime = new Date().toISOString();
      
      // Calculate total render time
      const totalTime = performance.now() - translationStartTime;
      renderTime = totalTime;
      translationSource = `@jxion-i18n (${currentLocale})`;

      loadingState = '✅ All content loaded dynamically from shared libraries!';
      console.log(`🎉 [DEMO] All content loaded successfully in ${totalTime.toFixed(2)}ms!`);
      console.log('📊 [DEMO] Render Info:', renderInfo);
      
    } catch (error) {
      console.error('❌ [DEMO] Error loading dynamic content:', error);
      loadingState = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      // Fallback values
      heroTitle = 'Hero Title';
      heroSubtitle = 'Hero Subtitle';
      heroDescription = 'Hero Description';
      primaryCta = 'Primary CTA';
      secondaryCta = 'Secondary CTA';
    }
  });

  // Function to reload with different locale
  async function changeLocale(newLocale: Locale) {
    console.log(`🔄 [DEMO] Changing locale to ${newLocale}...`);
    currentLocale = newLocale;
    loadingState = `Reloading translations for ${newLocale}...`;
    
    try {
      const translations = await getTranslations([
        'hero.title',
        'hero.subtitle',
        'hero.description',
        'hero.primaryCta',
        'hero.secondaryCta'
      ], newLocale);
      
      heroTitle = translations['hero.title'];
      heroSubtitle = translations['hero.subtitle'];
      heroDescription = translations['hero.description'];
      primaryCta = translations['hero.primaryCta'];
      secondaryCta = translations['hero.secondaryCta'];
      
      // Re-render component with new translations
      const componentResult = await loadComponent({
        componentId: 'hero',
        framework: 'html',
        props: {
          title: heroTitle,
          subtitle: heroSubtitle,
          description: heroDescription,
          ctaText: primaryCta,
          statsValue: '7',
          statsLabel: 'Years Experience',
          cardSubtitle: 'Trusted by developers',
          testId: 'hero-demo'
        }
      });
      
      componentHtml = componentResult.html;
      renderInfo.translationSource = `@jxion-i18n (${newLocale})`;
      renderInfo.renderTime = new Date().toISOString();
      
      console.log(`✅ [DEMO] Locale changed to ${newLocale}`);
      loadingState = `✅ Content reloaded for ${newLocale}!`;
    } catch (error) {
      console.error('❌ [DEMO] Error changing locale:', error);
    }
  }
</script>

<svelte:head>
  <title>Jxion Stack Demo - Noir Crafted</title>
  <meta name="description" content="Demo page showcasing Jxion Stack registry and translation system" />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Demo Header -->
  <div class="bg-noir-black text-white py-4">
    <div class="container-custom">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-serif">Jxion Stack Demo</h1>
        <a href="/" class="text-noir-primary hover:underline">← Back to Home</a>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  {#if loadingState.includes('Loading')}
    <div class="container-custom py-24">
      <div class="max-w-2xl mx-auto text-center">
        <div class="animate-pulse space-y-4">
          <div class="h-8 bg-noir-deep-purple-200 rounded w-3/4 mx-auto"></div>
          <div class="h-4 bg-noir-deep-purple-200 rounded w-1/2 mx-auto"></div>
          <p class="text-noir-deep-purple-600 font-mono text-sm">{loadingState}</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Hero Section Demo - Dynamically Rendered -->
  <section class="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-noir-deep-purple-50 to-white">
    <div class="container-custom py-24">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <!-- Locale Selector -->
        <div class="mb-8 flex justify-center gap-4">
          <button
            on:click={() => changeLocale('tr-TR')}
            class="px-4 py-2 rounded-full {currentLocale === 'tr-TR' ? 'bg-noir-primary text-noir-black' : 'bg-white text-noir-deep-purple-600 border border-noir-deep-purple-200'}"
          >
            TR
          </button>
          <button
            on:click={() => changeLocale('en-US')}
            class="px-4 py-2 rounded-full {currentLocale === 'en-US' ? 'bg-noir-primary text-noir-black' : 'bg-white text-noir-deep-purple-600 border border-noir-deep-purple-200'}"
          >
            EN
          </button>
        </div>

        <!-- Dynamically Rendered Hero Content from @jxion-i18n -->
        <div class="space-y-6">
          <h1 class="text-5xl md:text-7xl font-serif text-noir-black">
            {heroTitle}
          </h1>
          <h2 class="text-2xl md:text-3xl font-sans text-noir-deep-purple-600">
            {heroSubtitle}
          </h2>
          <p class="text-lg md:text-xl text-noir-deep-purple-600 font-sans max-w-2xl mx-auto">
            {heroDescription}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/collections"
              class="px-8 py-4 bg-noir-primary text-noir-black font-semibold rounded-full hover:bg-opacity-90 transition-all font-sans"
            >
              {primaryCta}
            </a>
            <a
              href="/about"
              class="px-8 py-4 bg-transparent border-2 border-noir-black text-noir-black font-semibold rounded-full hover:bg-noir-black hover:text-white transition-all font-sans"
            >
              {secondaryCta}
            </a>
          </div>
        </div>

        <!-- Dynamic Render Info Panel with Debug Info -->
        {#if componentMetadata}
          <div class="mt-16 p-6 bg-noir-deep-purple-50 rounded-lg border border-noir-deep-purple-200">
            <h3 class="text-xl font-serif text-noir-black mb-4">
              {demoInfo.infoTitle || 'Demo Information'}
            </h3>
            <div class="text-left space-y-2 text-sm font-mono text-noir-deep-purple-700">
              <p>
                <strong>{demoInfo.componentId || 'Component ID'}:</strong> {renderInfo.componentId}
              </p>
              <p>
                <strong>{demoInfo.framework || 'Framework'}:</strong> {renderInfo.framework}
              </p>
              <p>
                <strong>{demoInfo.translationSource || 'Translation Source'}:</strong> 
                <span class="text-green-600 font-semibold">{translationSource}</span>
              </p>
              <p>
                <strong>{demoInfo.registrySource || 'Registry Source'}:</strong> 
                <span class="text-green-600 font-semibold">{renderInfo.registrySource}</span>
              </p>
              <p>
                <strong>Component Version:</strong> {componentMetadata.version}
              </p>
              <p>
                <strong>Component Category:</strong> {componentMetadata.category}
              </p>
              <p>
                <strong>Supported Frameworks:</strong> {componentMetadata.frameworks.join(', ')}
              </p>
              <p>
                <strong>Render Time:</strong> {renderTime > 0 ? `${renderTime.toFixed(2)}ms` : 'N/A'}
              </p>
            </div>
            
            <!-- Phase 1: Debug Panel -->
            <div class="mt-6 p-4 bg-white rounded border border-noir-deep-purple-200">
              <h4 class="text-sm font-serif font-semibold text-noir-black mb-3">Debug Panel</h4>
              <div class="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span class="text-noir-deep-purple-600">Locale:</span>
                  <span class="ml-2 font-semibold text-noir-black">{currentLocale}</span>
                </div>
                <div>
                  <span class="text-noir-deep-purple-600">Cache:</span>
                  <span class="ml-2 font-semibold {cacheStatus === 'HIT' ? 'text-green-600' : cacheStatus === 'STALE' ? 'text-yellow-600' : 'text-red-600'}">
                    {cacheStatus}
                  </span>
                </div>
                <div>
                  <span class="text-noir-deep-purple-600">Source:</span>
                  <span class="ml-2 font-semibold text-noir-black">{translationSource}</span>
                </div>
                <div>
                  <span class="text-noir-deep-purple-600">Render:</span>
                  <span class="ml-2 font-semibold text-noir-black">{renderTime > 0 ? `${renderTime.toFixed(2)}ms` : 'N/A'}</span>
                </div>
              </div>
              <p class="mt-4 text-xs text-green-600 font-semibold">
                ✅ All content is dynamically loaded from @jxion-i18n and @jxion-core shared libraries!
                Check the browser console for detailed loading logs.
              </p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Implementation Notes -->
  <section class="py-16 bg-white">
    <div class="container-custom">
      <div class="max-w-3xl mx-auto space-y-6">
        <h2 class="text-3xl font-serif text-noir-black">Implementation Notes</h2>
        <div class="prose prose-noir max-w-none">
          <h3 class="text-xl font-serif">Phase 1 Goals</h3>
          <ul class="list-disc space-y-2 text-noir-deep-purple-700">
            <li>Replace mock translations with <code>@jxion-i18n</code> runtime API</li>
            <li>Replace mock component registry with <code>@jxion-core</code> registry</li>
            <li>Implement dynamic component loading based on canonical IDs</li>
            <li>Add translation caching and stale-while-revalidate strategy</li>
            <li>Enable runtime translation edits without redeploy</li>
          </ul>
          
          <h3 class="text-xl font-serif mt-8">Phase 2 Goals</h3>
          <ul class="list-disc space-y-2 text-noir-deep-purple-700">
            <li>Add dynamic style loading via <code>@jxion-styles</code></li>
            <li>Implement component variant system</li>
            <li>Add Storybook integration with registry metadata</li>
          </ul>

          <h3 class="text-xl font-serif mt-8">Phase 3 Goals</h3>
          <ul class="list-disc space-y-2 text-noir-deep-purple-700">
            <li>Implement Template Composer for JSON-driven page assembly</li>
            <li>Add template validation and SSR/CSR rendering helpers</li>
            <li>Wire homepage to JSON template definition</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .container-custom {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  @media (min-width: 640px) {
    .container-custom {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    .container-custom {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
</style>

