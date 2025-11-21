<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeWhyNoirNoir.module.scss';

  export type WhyNoirCard = {
    title: string;
    description: string;
    icon?: string;
  };

  export let title: string = '';
  export let cards: WhyNoirCard[] = [];
</script>

{#if cards?.length}
  <section class={styles.whySection}>
    <div class={styles.whySection__container}>
      <h2>{title}</h2>
      <div class={styles.whySection__grid}>
        {#each cards as card, index (card.title || index)}
          <article class={styles.whyCard}>
            {#if card.icon}<span class={styles.whyCard__icon}>{card.icon}</span>{/if}
            {#if card.title}<h3>{card.title}</h3>{/if}
            {#if card.description}<p>{card.description}</p>{/if}
          </article>
        {/each}
      </div>
    </div>
  </section>
{/if}

