<script lang="ts">
  /**
   * Section Component - Svelte Implementation
   * 
   * Uses:
   * - HTML template from @jxion-core (sectionTemplate.html)
   * - SCSS styles from @jxion-design
   * - Content from ContentManager (passed as props)
   */

  import { SvelteRenderer } from '@jxion/core';
  import { sectionTemplate } from '@jxion/core';
  import styles from '@jxion/design/components/section.module.scss';

  export let title: string = '';
  export let subtitle: string = '';
  export let description: string = '';
  export let content: string = '';
  export let footerContent: string = '';
  export let variant: string = 'default';
  export let size: string = 'medium';

  // Render the HTML template from @jxion-core
  $: renderedTemplate = SvelteRenderer.render({
    template: sectionTemplate.html,
    variables: {
      title,
      subtitle,
      description,
      content,
      footerContent,
      variant,
      size,
    },
    styles,
  });
</script>

<!-- Template rendered from @jxion-core -->
<div class="section-template">
  {@html renderedTemplate}
</div>

<style>
  @import '@jxion/design/components/section.module.scss';
</style>

