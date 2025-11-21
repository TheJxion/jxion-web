<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeKeyFeaturesNoir.module.scss';

  export type Feature = {
    title: string;
    description: string;
  };

  export let title: string = '';
  export let subtitle: string = '';
  export let items: Feature[] = [];
</script>

{#if items?.length}
  <section class={styles.featuresSection}>
    <div class={styles.featuresSection__container}>
      <div class={styles.featuresSection__header}>
        <h2>{title}</h2>
        {#if subtitle}<p>{subtitle}</p>{/if}
      </div>

      <div class={styles.featuresSection__grid}>
        {#each items as feature, index (feature.title || index)}
          <article class={styles.featureCard}>
            {#if feature.title}<h3>{feature.title}</h3>{/if}
            {#if feature.description}<p>{feature.description}</p>{/if}
          </article>
        {/each}
      </div>
    </div>
  </section>
{/if}

