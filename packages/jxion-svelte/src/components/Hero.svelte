<script lang="ts">
  /**
   * Hero Component - Svelte Implementation
   * 
   * Uses:
   * - HTML template from @jxion-core (heroTemplate.html)
   * - SCSS styles from @jxion-design
   * - Types from @jxion/shared
   * 
   * This component renders the actual HTML template from @jxion-core
   * converted to Svelte template syntax.
   */

  import styles from '@jxion/design/src/components/hero.module.scss';
  import { heroTemplate, SvelteRenderer } from '@jxion/core';
  import type { HeroProps } from '@jxion/shared';

  export let title: string;
  export let subtitle: string = "";
  export let description: string = "";
  export let ctaText: string = "Get Started";
  export let statsValue: string = "7";
  export let statsLabel: string = "Years Experience";
  export let cardSubtitle: string = "";
  export let testId: string = "hero";
  export let onCtaClick: (() => void) | undefined = undefined;

  // Render the HTML template from @jxion-core
  $: renderedTemplate = SvelteRenderer.render({
    template: heroTemplate.html,
    variables: {
      title,
      subtitle,
      description,
      ctaText,
      statsValue,
      statsLabel,
      cardSubtitle,
      testId,
      onCtaClick: onCtaClick ? "onCtaClick" : ""
    },
    styles
  });
</script>

<!-- Template rendered from @jxion-core -->
<div class="hero-template">
  {@html renderedTemplate}
</div>