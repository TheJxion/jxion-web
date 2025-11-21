<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeMotifsNoir.module.scss';

  export type Motif = {
    name: string;
    description: string;
  };

  export let title: string = '';
  export let subtitle: string = '';
  export let motifs: Motif[] = [];
</script>

{#if motifs?.length}
  <section class={styles.motifsSection}>
    <div class={styles.motifsSection__container}>
      <div class={styles.motifsSection__header}>
        <h2>{title}</h2>
        {#if subtitle}<p>{subtitle}</p>{/if}
      </div>
      <div class={styles.motifsSection__grid}>
        {#each motifs as motif, index (motif.name || index)}
          <article class={styles.motifCard}>
            {#if motif.name}<h3>{motif.name}</h3>{/if}
            {#if motif.description}<p>{motif.description}</p>{/if}
          </article>
        {/each}
      </div>
    </div>
  </section>
{/if}

