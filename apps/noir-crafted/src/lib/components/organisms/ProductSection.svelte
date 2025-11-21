<script lang="ts">
	import ProductCard from '$molecules/ProductCard.svelte';
	import type { ProductSectionProps } from '$types';
	import styles from '@jxion/design/styles/modules/ProductSectionNoir.module.scss';

	export let title: ProductSectionProps['title'];
	export let subtitle: ProductSectionProps['subtitle'] = '';
	export let products: ProductSectionProps['products'] = [];
	export let variant: ProductSectionProps['variant'] = 'grid';
</script>

<section class={styles.productSection}>
	<div class={styles.productSection__container}>
		<!-- Section Header -->
		<div class={styles.productSection__header}>
			<h2 class={styles.productSection__title}>
				{title}
			</h2>
			{#if subtitle}
				<p class={styles.productSection__subtitle}>
					{subtitle}
				</p>
			{/if}
		</div>

		<!-- Products Grid -->
		<div class={styles.productSection__grid}>
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>
