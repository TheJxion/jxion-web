<script lang="ts">
  /**
   * FAQ Component - Svelte Implementation
   * 
   * Uses:
   * - SCSS styles from @jxion-design
   * - Content from ContentManager (passed as props)
   * 
   * This component renders FAQ items with accordion functionality.
   */

  import { onMount } from 'svelte';
  import styles from '@jxion/design/styles/modules/FAQ.module.scss';

  export let title: string = '';
  export let items: Array<{ question: string; answer: string }> = [];

  let openIndex: number | null = null;

  function toggleItem(index: number) {
    openIndex = openIndex === index ? null : index;
  }

  // Log rendering for debugging
  onMount(() => {
    console.log('[Jxion-Svelte] FAQ component rendered:', {
      title,
      itemCount: items.length,
    });
  });
</script>

<section class={styles.faq} data-testid="faq">
  <div class={styles['faq__container']}>
    {#if title}
      <h2 class={styles['faq__title']} data-testid="faq-title">
        {title}
      </h2>
    {/if}
    <div class={styles['faq__list']} data-testid="faq-list">
      {#each items as item, index}
        <div
          class={styles['faq__item']}
          class:faq__item--open={openIndex === index}
          data-testid="faq-item-{index}"
        >
          <button
            class={styles['faq__question']}
            data-testid="faq-question-{index}"
            on:click={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            {item.question}
            <span class={styles['faq__icon']} data-testid="faq-icon-{index}">
              {openIndex === index ? '▲' : '▼'}
            </span>
          </button>
          {#if openIndex === index}
            <div
              class={styles['faq__answer']}
              data-testid="faq-answer-{index}"
            >
              <p>{item.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @import '@jxion/design/styles/modules/FAQ.module.scss';
</style>

