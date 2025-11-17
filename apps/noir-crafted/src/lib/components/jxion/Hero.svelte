<script lang="ts">
  /**
   * @title Noir-Crafted Hero Component Wrapper
   * 
   * - HTML template = @jxion-core (heroTemplate.html)
   * - SCSS styles from @jxion-design (hero.modules.scss)
   * - Types from @jxion/shared
    
   * @params
   */

  import styles from '@jxion/design/styles/modules/Hero.module.scss';
  import { heroTemplate, SvelteRenderer } from '@jxion/core';
  import type { HeroProps } from '@jxion/shared';

  //TODO(janberk-feature(these values should also work with the useDictionary libaries and hooks too and gets a custom values from the noir-admin as a dependency.)

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
