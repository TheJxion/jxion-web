import { c as create_ssr_component, o as onDestroy } from "../../../chunks/ssr.js";
import "@trpc/client";
import "../../../chunks/greetingService.js";
import "react";
import "react/jsx-runtime";
import "../../../chunks/index2.js";
const css = {
  code: ".template-section.svelte-phzqy0.svelte-phzqy0{width:100%}.template-info-container.svelte-phzqy0.svelte-phzqy0{padding:4rem 0;max-width:48rem;margin:0 auto;padding-left:1rem;padding-right:1rem}@media(min-width: 640px){.template-info-container.svelte-phzqy0.svelte-phzqy0{padding-left:1.5rem;padding-right:1.5rem}}@media(min-width: 1024px){.template-info-container.svelte-phzqy0.svelte-phzqy0{padding-left:2rem;padding-right:2rem}}.template-info-panel.svelte-phzqy0.svelte-phzqy0{padding:1.5rem;background:rgba(67, 67, 67, 0.3);border:1px solid rgba(72, 2, 43, 0.3);border-radius:0.5rem;color:rgba(255, 255, 255, 0.9)}.template-info-title.svelte-phzqy0.svelte-phzqy0{font-size:1.25rem;font-weight:600;margin-bottom:1rem;color:rgba(255, 255, 255, 1)}.template-info-content.svelte-phzqy0.svelte-phzqy0{text-align:left;font-size:0.875rem;font-family:monospace;color:rgba(255, 255, 255, 0.8);line-height:1.75}.template-info-content.svelte-phzqy0 p.svelte-phzqy0{margin:0.5rem 0}.template-info-success.svelte-phzqy0.svelte-phzqy0{margin-top:1rem;font-size:0.75rem;color:rgba(34, 197, 94, 0.9);font-weight:600}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<!--\\n  Jxion Stack — Template-Driven Homepage\\n  Phase Reference: Phase 3 — Template Composition & Page Assembly\\n  Description: Homepage rendered from JSON template schema\\n  Date: 2025-11-13\\n  \\n  This page demonstrates:\\n  - JSON-driven page assembly via TemplateComposer\\n  - Dynamic component loading from registry\\n  - Runtime translation integration\\n  - Template validation and error handling\\n-->\\n\\n<script lang=\\"ts\\">import { onMount, onDestroy } from \\"svelte\\";\\nimport { TemplateComposer } from \\"@jxion/core\\";\\nimport { loadTemplateSchema } from \\"@jxion/core\\";\\nimport { clearTranslationCache } from \\"@jxion/i18n\\";\\nimport { createSSEClient } from \\"$lib/utils/sse-client\\";\\nlet gsap = null;\\nlet ScrollTrigger = null;\\nlet gsapLoaded = false;\\nif (typeof window !== \\"undefined\\") {\\n  Promise.all([\\n    import(\\"gsap\\"),\\n    import(\\"gsap/ScrollTrigger\\")\\n  ]).then(([gsapModule, scrollTriggerModule]) => {\\n    gsap = gsapModule.gsap;\\n    ScrollTrigger = scrollTriggerModule.ScrollTrigger;\\n    if (gsap && ScrollTrigger) {\\n      gsap.registerPlugin(ScrollTrigger);\\n      gsapLoaded = true;\\n      setTimeout(() => initHeroAnimations(), 100);\\n    }\\n  }).catch((err) => {\\n    console.warn(\\"[Homepage-Template] Failed to load GSAP:\\", err);\\n  });\\n}\\nfunction splitText(element, type = \\"chars\\") {\\n  if (!element) return {};\\n  const text = element.textContent || \\"\\";\\n  const result = {};\\n  if (type === \\"chars\\" || type === \\"words\\") {\\n    const items = type === \\"chars\\" ? text.split(\\"\\") : text.split(\\" \\");\\n    const wrapper = document.createElement(\\"span\\");\\n    wrapper.style.display = \\"inline-block\\";\\n    wrapper.style.overflow = \\"hidden\\";\\n    items.forEach((item, i) => {\\n      const span = document.createElement(\\"span\\");\\n      span.textContent = type === \\"chars\\" ? item : item + (i < items.length - 1 ? \\" \\" : \\"\\");\\n      span.style.display = \\"inline-block\\";\\n      wrapper.appendChild(span);\\n    });\\n    element.textContent = \\"\\";\\n    element.appendChild(wrapper);\\n    if (type === \\"chars\\") {\\n      result.chars = Array.from(wrapper.children);\\n    } else {\\n      result.words = Array.from(wrapper.children);\\n    }\\n  } else if (type === \\"lines\\") {\\n    const lines = text.split(\\"\\\\n\\").filter((l) => l.trim());\\n    const wrapper = document.createElement(\\"div\\");\\n    lines.forEach((line) => {\\n      const div = document.createElement(\\"div\\");\\n      div.textContent = line;\\n      div.style.display = \\"block\\";\\n      div.style.overflow = \\"hidden\\";\\n      wrapper.appendChild(div);\\n    });\\n    element.textContent = \\"\\";\\n    element.appendChild(wrapper);\\n    result.lines = Array.from(wrapper.children);\\n  }\\n  return result;\\n}\\nlet composedPage = null;\\nlet loading = true;\\nlet error = null;\\nlet currentLocale = \\"tr-TR\\";\\nlet handleKeyPress = null;\\nlet sseClient = null;\\nconst translationKeys = [\\n  \\"home.hero.title\\",\\n  \\"home.hero.subtitle\\",\\n  \\"home.hero.description\\",\\n  \\"home.hero.ctaText\\",\\n  \\"home.hero.statsValue\\",\\n  \\"home.hero.statsLabel\\",\\n  \\"home.hero.cardSubtitle\\"\\n];\\n$: if (composedPage && !loading && typeof window !== \\"undefined\\") {\\n  requestAnimationFrame(() => {\\n    setTimeout(() => initHeroAnimations(), 200);\\n  });\\n}\\nasync function loadPage() {\\n  console.log(\\"[Homepage-Template] Loading template-driven homepage...\\");\\n  loading = true;\\n  error = null;\\n  try {\\n    const schema = await loadTemplateSchema(\\"homepage\\");\\n    if (!schema) {\\n      throw new Error(\\"Failed to load homepage template schema\\");\\n    }\\n    const validation = TemplateComposer.validate(schema);\\n    if (!validation.valid) {\\n      throw new Error(`Template validation failed: ${validation.errors.join(\\", \\")}`);\\n    }\\n    console.log(\\"[Homepage-Template] Template schema validated, composing page...\\");\\n    composedPage = await TemplateComposer.compose(schema, currentLocale, \\"html\\");\\n    console.log(`[Homepage-Template] \\\\u2705 Page composed: ${composedPage.sections.length} sections in ${composedPage.renderTime.toFixed(2)}ms`);\\n    loading = false;\\n  } catch (err) {\\n    console.error(\\"[Homepage-Template] \\\\u274C Error:\\", err);\\n    error = err instanceof Error ? err.message : \\"Unknown error\\";\\n    loading = false;\\n  }\\n}\\nfunction initHeroAnimations() {\\n  if (typeof window === \\"undefined\\" || !gsap || !ScrollTrigger || !gsapLoaded) {\\n    return;\\n  }\\n  setTimeout(() => {\\n    const heroSection = document.getElementById(\\"hero\\");\\n    const videoElement = document.querySelector(\\"#hero-video\\");\\n    const titleElement = document.querySelector(\\".title\\");\\n    const subtitleElement = document.querySelector(\\".subtitle\\");\\n    if (!heroSection || !videoElement) return;\\n    const isMobile = window.innerWidth <= 767;\\n    if (titleElement) {\\n      try {\\n        const heroSplit = splitText(titleElement, \\"chars\\");\\n        if (heroSplit.chars && heroSplit.chars.length > 0) {\\n          heroSplit.chars.forEach((char) => {\\n            if (char instanceof HTMLElement) {\\n              char.classList.add(\\"text-gradient\\");\\n            }\\n          });\\n          gsap.from(heroSplit.chars, {\\n            yPercent: 100,\\n            duration: 1.8,\\n            ease: \\"expo.out\\",\\n            stagger: 0.06\\n          });\\n        }\\n      } catch (e) {\\n        console.warn(\\"[Homepage-Template] Text split error for title:\\", e);\\n      }\\n    }\\n    if (subtitleElement) {\\n      try {\\n        const paragraphSplit = splitText(subtitleElement, \\"lines\\");\\n        if (paragraphSplit.lines && paragraphSplit.lines.length > 0) {\\n          gsap.from(paragraphSplit.lines, {\\n            opacity: 0,\\n            yPercent: 100,\\n            duration: 1.8,\\n            ease: \\"expo.out\\",\\n            stagger: 0.06,\\n            delay: 1\\n          });\\n        }\\n      } catch (e) {\\n        console.warn(\\"[Homepage-Template] Text split error for subtitle:\\", e);\\n      }\\n    }\\n    if (videoElement) {\\n      const startValue = isMobile ? \\"top 50%\\" : \\"center 60%\\";\\n      const endValue = isMobile ? \\"120% top\\" : \\"bottom top\\";\\n      const setupVideoScroll = () => {\\n        if (!videoElement.duration || videoElement.duration === 0) {\\n          return;\\n        }\\n        if (ScrollTrigger) {\\n          ScrollTrigger.getAll().forEach((trigger) => {\\n            if (trigger.vars && (trigger.vars.trigger === \\"video\\" || trigger.vars.trigger === \\"#hero-video\\")) {\\n              trigger.kill();\\n            }\\n          });\\n        }\\n        const videoTimeline = gsap.timeline({\\n          scrollTrigger: {\\n            trigger: \\"video\\",\\n            // Match reference - trigger on video element\\n            start: startValue,\\n            end: endValue,\\n            scrub: true,\\n            // Match reference - immediate scrub\\n            pin: true\\n          }\\n        });\\n        videoTimeline.to(videoElement, {\\n          currentTime: videoElement.duration\\n        });\\n      };\\n      if (videoElement.readyState >= 2 && videoElement.duration > 0) {\\n        setupVideoScroll();\\n      } else {\\n        videoElement.onloadedmetadata = () => {\\n          if (videoElement.duration > 0) {\\n            setupVideoScroll();\\n          }\\n        };\\n      }\\n    }\\n  }, 100);\\n}\\nonMount(async () => {\\n  await loadPage();\\n  const apiUrl = typeof import.meta !== \\"undefined\\" && import.meta.env?.VITE_API_URL || \\"http://localhost:3005\\";\\n  sseClient = createSSEClient({\\n    apiUrl,\\n    onTranslationUpdate: async (key, locale) => {\\n      if (locale === currentLocale && translationKeys.includes(key)) {\\n        console.log(`[Homepage-Template] \\\\u{1F504} Translation updated: ${key}, reloading page...`);\\n        await clearTranslationCache(currentLocale);\\n        await loadPage();\\n        setTimeout(() => initHeroAnimations(), 100);\\n      }\\n    },\\n    onContentUpdate: async (path) => {\\n      if (path === \\"homepage\\") {\\n        console.log(\\"[Homepage-Template] \\\\u{1F504} Content updated: homepage, reloading page...\\");\\n        await loadPage();\\n        setTimeout(() => initHeroAnimations(), 100);\\n      }\\n    },\\n    onStyleUpdate: async (componentId, variant) => {\\n      console.log(`[Homepage-Template] \\\\u{1F504} Style updated: ${componentId} (${variant}), reloading page...`);\\n      await loadPage();\\n      setTimeout(() => initHeroAnimations(), 100);\\n    },\\n    onConnect: (clientId) => {\\n      console.log(`[Homepage-Template] \\\\u2705 Connected to real-time updates (client: ${clientId})`);\\n    },\\n    onError: (error2) => {\\n      console.warn(\\"[Homepage-Template] \\\\u26A0\\\\uFE0F SSE connection error:\\", error2);\\n    },\\n    autoReconnect: true,\\n    reconnectInterval: 5e3\\n  });\\n  handleKeyPress = (e) => {\\n    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === \\"R\\") {\\n      e.preventDefault();\\n      refreshTranslations();\\n    }\\n  };\\n  window.addEventListener(\\"keydown\\", handleKeyPress);\\n});\\nasync function refreshTranslations() {\\n  console.log(\\"[Homepage-Template] \\\\u{1F504} Manually refreshing translations...\\");\\n  await clearTranslationCache(currentLocale);\\n  await loadPage();\\n}\\nonDestroy(() => {\\n  if (typeof window !== \\"undefined\\" && ScrollTrigger) {\\n    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());\\n    if (gsap) {\\n      gsap.killTweensOf(\\"*\\");\\n    }\\n  }\\n  if (sseClient) {\\n    sseClient.disconnect();\\n    console.log(\\"[Homepage-Template] \\\\u23F8\\\\uFE0F SSE connection closed\\");\\n  }\\n  if (handleKeyPress) {\\n    window.removeEventListener(\\"keydown\\", handleKeyPress);\\n  }\\n});\\n<\/script>\\n\\n<svelte:head>\\n  <title>Noir Crafted - Template-Driven Homepage</title>\\n  <meta name=\\"description\\" content=\\"Homepage rendered from JSON template schema via TemplateComposer\\" />\\n</svelte:head>\\n\\n<div>\\n  {#if loading}\\n    <div style=\\"padding: 3rem 0; text-align: center;\\">\\n      <div style=\\"color: rgba(255, 255, 255, 0.8); font-family: monospace; font-size: 0.875rem;\\">\\n        Loading template-driven homepage...\\n      </div>\\n    </div>\\n  {:else if error}\\n    <div style=\\"padding: 3rem 0; text-align: center;\\">\\n      <div style=\\"padding: 1.5rem; border: 1px solid rgba(234, 67, 53, 0.3); border-radius: 0.5rem; background: rgba(234, 67, 53, 0.1);\\">\\n        <h2 style=\\"font-size: 1.25rem; color: rgba(234, 67, 53, 0.9); margin-bottom: 0.5rem;\\">Template Error</h2>\\n        <p style=\\"color: rgba(234, 67, 53, 0.8);\\">{error}</p>\\n      </div>\\n    </div>\\n  {:else if composedPage && composedPage.sections && composedPage.sections.length > 0}\\n    <!-- Render composed sections -->\\n    {#each composedPage.sections as section, index (index)}\\n      <div class=\\"template-section\\">\\n        {@html section.html}\\n      </div>\\n    {/each}\\n\\n    <!-- Template Info Panel -->\\n    <div class=\\"template-info-container\\">\\n      <div class=\\"template-info-panel\\">\\n        <h3 class=\\"template-info-title\\">Template Information</h3>\\n        <div class=\\"template-info-content\\">\\n          <p><strong>Template ID:</strong> {composedPage.id}</p>\\n          <p><strong>Sections Rendered:</strong> {composedPage.sections.length}</p>\\n          <p><strong>Render Time:</strong> {composedPage.renderTime.toFixed(2)}ms</p>\\n          <p><strong>Locale:</strong> {composedPage.metadata?.locale || \'N/A\'}</p>\\n          <p class=\\"template-info-success\\">\\n            ✅ This page is rendered from JSON template schema via TemplateComposer!\\n            Check the browser console for detailed composition logs.\\n          </p>\\n        </div>\\n      </div>\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  /* Component styles are imported globally in app.css */\\n  /* This ensures styles apply to raw HTML rendered via {@html} */\\n  \\n  .template-section {\\n    width: 100%;\\n  }\\n  \\n  .template-info-container {\\n    padding: 4rem 0;\\n    max-width: 48rem;\\n    margin: 0 auto;\\n    padding-left: 1rem;\\n    padding-right: 1rem;\\n  }\\n  \\n  @media (min-width: 640px) {\\n    .template-info-container {\\n      padding-left: 1.5rem;\\n      padding-right: 1.5rem;\\n    }\\n  }\\n  \\n  @media (min-width: 1024px) {\\n    .template-info-container {\\n      padding-left: 2rem;\\n      padding-right: 2rem;\\n    }\\n  }\\n  \\n  .template-info-panel {\\n    padding: 1.5rem;\\n    background: rgba(67, 67, 67, 0.3);\\n    border: 1px solid rgba(72, 2, 43, 0.3);\\n    border-radius: 0.5rem;\\n    color: rgba(255, 255, 255, 0.9);\\n  }\\n  \\n  .template-info-title {\\n    font-size: 1.25rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: rgba(255, 255, 255, 1);\\n  }\\n  \\n  .template-info-content {\\n    text-align: left;\\n    font-size: 0.875rem;\\n    font-family: monospace;\\n    color: rgba(255, 255, 255, 0.8);\\n    line-height: 1.75;\\n  }\\n  \\n  .template-info-content p {\\n    margin: 0.5rem 0;\\n  }\\n  \\n  .template-info-success {\\n    margin-top: 1rem;\\n    font-size: 0.75rem;\\n    color: rgba(34, 197, 94, 0.9);\\n    font-weight: 600;\\n  }\\n</style>\\n\\n"],"names":[],"mappings":"AAiUE,6CAAkB,CAChB,KAAK,CAAE,IACT,CAEA,oDAAyB,CACvB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,oDAAyB,CACvB,YAAY,CAAE,MAAM,CACpB,aAAa,CAAE,MACjB,CACF,CAEA,MAAO,YAAY,MAAM,CAAE,CACzB,oDAAyB,CACvB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IACjB,CACF,CAEA,gDAAqB,CACnB,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACjC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACtC,aAAa,CAAE,MAAM,CACrB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAChC,CAEA,gDAAqB,CACnB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAC9B,CAEA,kDAAuB,CACrB,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,SAAS,CACtB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC/B,WAAW,CAAE,IACf,CAEA,oCAAsB,CAAC,eAAE,CACvB,MAAM,CAAE,MAAM,CAAC,CACjB,CAEA,kDAAuB,CACrB,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAC7B,WAAW,CAAE,GACf"}'
};
function splitText(element, type = "chars") {
  if (!element) return {};
  const text = element.textContent || "";
  const result = {};
  if (type === "chars" || type === "words") {
    const items = type === "chars" ? text.split("") : text.split(" ");
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    items.forEach((item, i) => {
      const span = document.createElement("span");
      span.textContent = type === "chars" ? item : item + (i < items.length - 1 ? " " : "");
      span.style.display = "inline-block";
      wrapper.appendChild(span);
    });
    element.textContent = "";
    element.appendChild(wrapper);
    if (type === "chars") {
      result.chars = Array.from(wrapper.children);
    } else {
      result.words = Array.from(wrapper.children);
    }
  } else if (type === "lines") {
    const lines = text.split("\n").filter((l) => l.trim());
    const wrapper = document.createElement("div");
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      div.style.display = "block";
      div.style.overflow = "hidden";
      wrapper.appendChild(div);
    });
    element.textContent = "";
    element.appendChild(wrapper);
    result.lines = Array.from(wrapper.children);
  }
  return result;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gsap = null;
  let ScrollTrigger = null;
  let gsapLoaded = false;
  if (typeof window !== "undefined") {
    Promise.all([import("gsap"), import("gsap/ScrollTrigger.js")]).then(([gsapModule, scrollTriggerModule]) => {
      gsap = gsapModule.gsap;
      ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsapLoaded = true;
        setTimeout(() => initHeroAnimations(), 100);
      }
    }).catch((err) => {
      console.warn("[Homepage-Template] Failed to load GSAP:", err);
    });
  }
  function initHeroAnimations() {
    if (typeof window === "undefined" || !gsap || !ScrollTrigger || !gsapLoaded) {
      return;
    }
    setTimeout(
      () => {
        const heroSection = document.getElementById("hero");
        const videoElement = document.querySelector("#hero-video");
        const titleElement = document.querySelector(".title");
        const subtitleElement = document.querySelector(".subtitle");
        if (!heroSection || !videoElement) return;
        const isMobile = window.innerWidth <= 767;
        if (titleElement) {
          try {
            const heroSplit = splitText(titleElement, "chars");
            if (heroSplit.chars && heroSplit.chars.length > 0) {
              heroSplit.chars.forEach((char) => {
                if (char instanceof HTMLElement) {
                  char.classList.add("text-gradient");
                }
              });
              gsap.from(heroSplit.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06
              });
            }
          } catch (e) {
            console.warn("[Homepage-Template] Text split error for title:", e);
          }
        }
        if (subtitleElement) {
          try {
            const paragraphSplit = splitText(subtitleElement, "lines");
            if (paragraphSplit.lines && paragraphSplit.lines.length > 0) {
              gsap.from(paragraphSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06,
                delay: 1
              });
            }
          } catch (e) {
            console.warn("[Homepage-Template] Text split error for subtitle:", e);
          }
        }
        if (videoElement) {
          const startValue = isMobile ? "top 50%" : "center 60%";
          const endValue = isMobile ? "120% top" : "bottom top";
          const setupVideoScroll = () => {
            if (!videoElement.duration || videoElement.duration === 0) {
              return;
            }
            if (ScrollTrigger) {
              ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars && (trigger.vars.trigger === "video" || trigger.vars.trigger === "#hero-video")) {
                  trigger.kill();
                }
              });
            }
            const videoTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: "video",
                // Match reference - trigger on video element
                start: startValue,
                end: endValue,
                scrub: true,
                // Match reference - immediate scrub
                pin: true
              }
            });
            videoTimeline.to(videoElement, { currentTime: videoElement.duration });
          };
          if (videoElement.readyState >= 2 && videoElement.duration > 0) {
            setupVideoScroll();
          } else {
            videoElement.onloadedmetadata = () => {
              if (videoElement.duration > 0) {
                setupVideoScroll();
              }
            };
          }
        }
      },
      100
    );
  }
  onDestroy(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (gsap) {
        gsap.killTweensOf("*");
      }
    }
  });
  $$result.css.add(css);
  return `  ${$$result.head += `<!-- HEAD_svelte-e9g130_START -->${$$result.title = `<title>Noir Crafted - Template-Driven Homepage</title>`, ""}<meta name="description" content="Homepage rendered from JSON template schema via TemplateComposer"><!-- HEAD_svelte-e9g130_END -->`, ""} <div>${`<div style="padding: 3rem 0; text-align: center;" data-svelte-h="svelte-1f722bv"><div style="color: rgba(255, 255, 255, 0.8); font-family: monospace; font-size: 0.875rem;">Loading template-driven homepage...</div></div>`} </div>`;
});
export {
  Page as default
};
