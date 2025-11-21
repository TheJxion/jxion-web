<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeImpactStatsNoir.module.scss';

  export type ImpactStat = {
    value: string;
    label: string;
  };

  export let stats: ImpactStat[] = [];
  export let title: string = 'Etkimiz';
</script>

{#if stats?.length}
  <section class={styles.impactSection}>
    <div class={styles.impactSection__container}>
      <h2>{title}</h2>
      <div class={styles.impactSection__grid}>
        {#each stats as stat, index (stat.label || index)}
          <article class={styles.impactCard}>
            {#if stat.value}<span class={styles.impactCard__value}>{stat.value}</span>{/if}
            {#if stat.label}<span class={styles.impactCard__label}>{stat.label}</span>{/if}
          </article>
        {/each}
      </div>
    </div>
  </section>
{/if}

