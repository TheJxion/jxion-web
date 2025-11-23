<!--
  Jxion Stack — Template-Driven Homepage
  Phase Reference: Phase 3 — Template Composition & Page Assembly
  Description: Homepage rendered from JSON template schema
  Date: 2025-11-13
  
  This page demonstrates:
  - JSON-driven page assembly via TemplateComposer
  - Dynamic component loading from registry
  - Runtime translation integration
  - Template validation and error handling
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { TemplateComposer, type TemplateSchema, type ComposedPage } from '@jxion/core';
  import { loadTemplateSchema } from '@jxion/core';
  import { type Locale, clearTranslationCache } from '@jxion/i18n';
  import { createSSEClient, type SSEClient } from '$lib/utils/sse-client';
  
  // Import SCSS styles for components that will be rendered
  // Styles are imported in <style> tag below
  
  // GSAP imports - only on client side
  let gsap: any = null;
  let ScrollTrigger: any = null;
  let gsapLoaded = false;
  
  // Dynamically import GSAP only on client
  if (typeof window !== 'undefined') {
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      gsap = gsapModule.gsap;
      ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsapLoaded = true;
        // Trigger animations once GSAP is loaded
        setTimeout(() => initHeroAnimations(), 100);
      }
    }).catch((err) => {
      console.warn('[Homepage-Template] Failed to load GSAP:', err);
    });
  }
  
  // Simple text splitter utility (replaces SplitText for demo)
  function splitText(element: Element, type: 'chars' | 'words' | 'lines' = 'chars'): { chars?: Element[], words?: Element[], lines?: Element[] } {
    if (!element) return {};
    
    const text = element.textContent || '';
    const result: { chars?: Element[], words?: Element[], lines?: Element[] } = {};
    
    if (type === 'chars' || type === 'words') {
      const items = type === 'chars' ? text.split('') : text.split(' ');
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      
      items.forEach((item, i) => {
        const span = document.createElement('span');
        span.textContent = type === 'chars' ? item : item + (i < items.length - 1 ? ' ' : '');
        span.style.display = 'inline-block';
        wrapper.appendChild(span);
      });
      
      element.textContent = '';
      element.appendChild(wrapper);
      
      if (type === 'chars') {
        result.chars = Array.from(wrapper.children);
      } else {
        result.words = Array.from(wrapper.children);
      }
    } else if (type === 'lines') {
      // For lines, wrap each line
      const lines = text.split('\n').filter(l => l.trim());
      const wrapper = document.createElement('div');
      
      lines.forEach((line) => {
        const div = document.createElement('div');
        div.textContent = line;
        div.style.display = 'block';
        div.style.overflow = 'hidden';
        wrapper.appendChild(div);
      });
      
      element.textContent = '';
      element.appendChild(wrapper);
      result.lines = Array.from(wrapper.children);
    }
    
    return result;
  }

  let composedPage: ComposedPage | null = null;
  let loading = true;
  let error: string | null = null;
  let currentLocale: Locale = 'tr-TR';
  let handleKeyPress: ((e: KeyboardEvent) => void) | null = null;
  let sseClient: SSEClient | null = null;
  
  // Translation keys used in the homepage template
  const translationKeys = [
    'home.hero.title',
    'home.hero.subtitle',
    'home.hero.description',
    'home.hero.ctaText',
    'home.hero.statsValue',
    'home.hero.statsLabel',
    'home.hero.cardSubtitle',
  ];
  
  // Re-initialize animations when page loads
  $: if (composedPage && !loading && typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      setTimeout(() => initHeroAnimations(), 200);
    });
  }

  // Function to load and compose the page
  async function loadPage() {
    console.log('[Homepage-Template] Loading template-driven homepage...');
    loading = true;
    error = null;
    
    try {
      // Load template schema
      const schema = await loadTemplateSchema('homepage');
      
      if (!schema) {
        throw new Error('Failed to load homepage template schema');
      }

      // Validate schema
      const validation = TemplateComposer.validate(schema);
      if (!validation.valid) {
        throw new Error(`Template validation failed: ${validation.errors.join(', ')}`);
      }

      console.log('[Homepage-Template] Template schema validated, composing page...');

      // Compose page from template - use "html" framework since we're rendering HTML directly
      composedPage = await TemplateComposer.compose(schema, currentLocale, "html");

      console.log(`[Homepage-Template] ✅ Page composed: ${composedPage.sections.length} sections in ${composedPage.renderTime.toFixed(2)}ms`);
      
      loading = false;
    } catch (err) {
      console.error('[Homepage-Template] ❌ Error:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  }

  // GSAP animation setup for hero video and text
  function initHeroAnimations() {
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger || !gsapLoaded) {
      // GSAP not loaded yet, will be called again when loaded
      return;
    }
    
    // Wait for DOM to be ready
    setTimeout(() => {
      const heroSection = document.getElementById('hero');
      // Match reference - video element selector (not ID)
      const videoElement = document.querySelector('#hero-video') as HTMLVideoElement;
      const titleElement = document.querySelector('.title');
      const subtitleElement = document.querySelector('.subtitle');
      
      if (!heroSection || !videoElement) return;
      
      // Check if mobile (max-width: 767px)
      const isMobile = window.innerWidth <= 767;
      
      // Text split animations for title
      if (titleElement) {
        try {
          const heroSplit = splitText(titleElement, 'chars');
          
          // Apply text-gradient class once before animating
          if (heroSplit.chars && heroSplit.chars.length > 0) {
            heroSplit.chars.forEach((char: Element) => {
              if (char instanceof HTMLElement) {
                char.classList.add('text-gradient');
              }
            });
            
            gsap.from(heroSplit.chars, {
              yPercent: 100,
              duration: 1.8,
              ease: 'expo.out',
              stagger: 0.06,
            });
          }
        } catch (e) {
          console.warn('[Homepage-Template] Text split error for title:', e);
        }
      }
      
      // Text split animations for subtitle/description
      if (subtitleElement) {
        try {
          const paragraphSplit = splitText(subtitleElement, 'lines');
          
          if (paragraphSplit.lines && paragraphSplit.lines.length > 0) {
            gsap.from(paragraphSplit.lines, {
              opacity: 0,
              yPercent: 100,
              duration: 1.8,
              ease: 'expo.out',
              stagger: 0.06,
              delay: 1,
            });
          }
        } catch (e) {
          console.warn('[Homepage-Template] Text split error for subtitle:', e);
        }
      }
      
      // Scroll-triggered video playback (matching reference exactly)
      if (videoElement) {
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';
        
        // Function to set up video scroll animation
        const setupVideoScroll = () => {
          if (!videoElement.duration || videoElement.duration === 0) {
            // Video not ready yet, wait for metadata
            return;
          }
          
          // Kill any existing ScrollTrigger for this video
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((trigger: any) => {
              if (trigger.vars && (trigger.vars.trigger === 'video' || trigger.vars.trigger === '#hero-video')) {
                trigger.kill();
              }
            });
          }
          
          // Match reference implementation exactly - timeline with video element as trigger
          const videoTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: 'video', // Match reference - trigger on video element
              start: startValue,
              end: endValue,
              scrub: true, // Match reference - immediate scrub
              pin: true,
            },
          });
          
          videoTimeline.to(videoElement, {
            currentTime: videoElement.duration,
          });
        };
        
        // Wait for video metadata to load (matching reference)
        if (videoElement.readyState >= 2 && videoElement.duration > 0) {
          // Video already loaded
          setupVideoScroll();
        } else {
          videoElement.onloadedmetadata = () => {
            if (videoElement.duration > 0) {
              setupVideoScroll();
            }
          };
        }
      }
    }, 100);
  }
  
  onMount(async () => {
    // Load page initially
    await loadPage();
    
    // GSAP animations will be initialized automatically when GSAP loads
    // (handled in the dynamic import promise)
    
    // Set up SSE for real-time updates
    const apiUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:3005';
    sseClient = createSSEClient({
      apiUrl,
      onTranslationUpdate: async (key: string, locale: string) => {
        if (locale === currentLocale && translationKeys.includes(key)) {
          console.log(`[Homepage-Template] 🔄 Translation updated: ${key}, reloading page...`);
          await clearTranslationCache(currentLocale);
          await loadPage();
          // Re-initialize animations after reload
          setTimeout(() => initHeroAnimations(), 100);
        }
      },
      onContentUpdate: async (path: string) => {
        if (path === 'homepage') {
          console.log('[Homepage-Template] 🔄 Content updated: homepage, reloading page...');
          await loadPage();
          // Re-initialize animations after reload
          setTimeout(() => initHeroAnimations(), 100);
        }
      },
      onStyleUpdate: async (componentId: string, variant: string) => {
        console.log(`[Homepage-Template] 🔄 Style updated: ${componentId} (${variant}), reloading page...`);
        await loadPage();
        // Re-initialize animations after reload
        setTimeout(() => initHeroAnimations(), 100);
      },
      onConnect: (clientId: string) => {
        console.log(`[Homepage-Template] ✅ Connected to real-time updates (client: ${clientId})`);
      },
      onError: (error: Error) => {
        console.warn('[Homepage-Template] ⚠️ SSE connection error:', error);
      },
      autoReconnect: true,
      reconnectInterval: 5000,
    });
    
    // Keyboard shortcut: Ctrl+Shift+R or Cmd+Shift+R to refresh translations (avoiding conflict with browser refresh)
    handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        refreshTranslations();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
  });
  
  // Manual refresh function (can be called from UI or keyboard shortcut)
  async function refreshTranslations() {
    console.log('[Homepage-Template] 🔄 Manually refreshing translations...');
    await clearTranslationCache(currentLocale);
    await loadPage();
  }
  
  // Cleanup on component destroy
  onDestroy(() => {
    // Cleanup GSAP ScrollTriggers
    if (typeof window !== 'undefined' && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      if (gsap) {
        gsap.killTweensOf('*');
      }
    }
    
    if (sseClient) {
      sseClient.disconnect();
      console.log('[Homepage-Template] ⏸️ SSE connection closed');
    }
    if (handleKeyPress) {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });
</script>

<svelte:head>
  <title>Noir Crafted - Template-Driven Homepage</title>
  <meta name="description" content="Homepage rendered from JSON template schema via TemplateComposer" />
</svelte:head>

<div>
  {#if loading}
    <div style="padding: 3rem 0; text-align: center;">
      <div style="color: rgba(255, 255, 255, 0.8); font-family: monospace; font-size: 0.875rem;">
        Loading template-driven homepage...
      </div>
    </div>
  {:else if error}
    <div style="padding: 3rem 0; text-align: center;">
      <div style="padding: 1.5rem; border: 1px solid rgba(234, 67, 53, 0.3); border-radius: 0.5rem; background: rgba(234, 67, 53, 0.1);">
        <h2 style="font-size: 1.25rem; color: rgba(234, 67, 53, 0.9); margin-bottom: 0.5rem;">Template Error</h2>
        <p style="color: rgba(234, 67, 53, 0.8);">{error}</p>
      </div>
    </div>
  {:else if composedPage && composedPage.sections && composedPage.sections.length > 0}
    <!-- Render composed sections -->
    {#each composedPage.sections as section, index (index)}
      <div class="template-section">
        {@html section.html}
      </div>
    {/each}

    <!-- Template Info Panel -->
    <div class="template-info-container">
      <div class="template-info-panel">
        <h3 class="template-info-title">Template Information</h3>
        <div class="template-info-content">
          <p><strong>Template ID:</strong> {composedPage.id}</p>
          <p><strong>Sections Rendered:</strong> {composedPage.sections.length}</p>
          <p><strong>Render Time:</strong> {composedPage.renderTime.toFixed(2)}ms</p>
          <p><strong>Locale:</strong> {composedPage.metadata?.locale || 'N/A'}</p>
          <p class="template-info-success">
            ✅ This page is rendered from JSON template schema via TemplateComposer!
            Check the browser console for detailed composition logs.
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Component styles are imported globally in app.css */
  /* This ensures styles apply to raw HTML rendered via {@html} */
  
  .template-section {
    width: 100%;
  }
  
  .template-info-container {
    padding: 4rem 0;
    max-width: 48rem;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  @media (min-width: 640px) {
    .template-info-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    .template-info-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  
  .template-info-panel {
    padding: 1.5rem;
    background: rgba(67, 67, 67, 0.3);
    border: 1px solid rgba(72, 2, 43, 0.3);
    border-radius: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .template-info-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 1);
  }
  
  .template-info-content {
    text-align: left;
    font-size: 0.875rem;
    font-family: monospace;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.75;
  }
  
  .template-info-content p {
    margin: 0.5rem 0;
  }
  
  .template-info-success {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: rgba(34, 197, 94, 0.9);
    font-weight: 600;
  }
</style>

