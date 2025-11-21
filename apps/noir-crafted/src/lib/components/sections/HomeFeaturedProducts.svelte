<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeFeaturedProductsNoir.module.scss';

  export type FeaturedProduct = {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
  };

  export let title: string = '';
  export let subtitle: string = '';
  export let products: FeaturedProduct[] = [];
</script>

{#if products?.length}
  <section class={styles.featuredSection}>
    <div class={styles.featuredSection__container}>
      <div class={styles.featuredSection__header}>
        <h2>{title}</h2>
        {#if subtitle}<p>{subtitle}</p>{/if}
      </div>

      <div class={styles.featuredSection__grid}>
        {#each products as product, index (product.title || index)}
          <article class={styles.featuredCard}>
            <div class={styles.featuredCard__image}>
              {#if product.imageUrl}
                <img src={product.imageUrl} alt={product.title} loading="lazy" />
              {/if}
            </div>
            <div class={styles.featuredCard__body}>
              {#if product.title}<h3>{product.title}</h3>{/if}
              {#if product.description}<p>{product.description}</p>{/if}
              {#if product.price}
                <span class={styles.featuredCard__price}>{product.price}</span>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>
{/if}

