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
  export let description: string = '';
  export let products: FeaturedProduct[] = [];
</script>

{#if title || description || products?.length}
  <section class={styles.featuredSection}>
    <div class={styles.featuredSection__container}>
      <div class={styles.featuredSection__header}>
        {#if title}<h2>{title}</h2>{/if}
        {#if subtitle}<p>{subtitle}</p>{/if}
        {#if description}<p class={styles.featuredSection__description}>{description}</p>{/if}
      </div>

      {#if products?.length}
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
      {/if}
    </div>
  </section>
{/if}

