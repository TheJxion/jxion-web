<script lang="ts">
	import { page } from '$app/stores';
	import ProductSection from '$organisms/ProductSection.svelte';
	import { products } from '$stores/products';
	import { getProductsByCategory } from '$stores/products';
	import { content } from '$lib/i18n';
	import type { ProductCategory } from '$types';
	import styles from '@jxion/design/styles/modules/CollectionNoir.module.scss';

	// Get category from URL
	$: categoryParam = $page.params.category;
	$: category = getCategoryName(categoryParam);
	$: filteredProducts = getProductsByCategory(category);

	function getCategoryName(param: string): ProductCategory {
		const categoryMap: Record<string, ProductCategory> = {
			kolye: 'Kolye',
			bilezik: 'Bilezik',
			yuzuk: 'Yüzük',
			kupe: 'Küpe',
			sahmeran: 'Şahmeran',
			tokalar: 'Yetişkin Tokaları',
			fular: 'Fular'
		};
		return categoryMap[param] || 'Kolye';
	}

	$: pageTitle = category;
	$: pageDescription = `${category} koleksiyonumuzdan özel tasarımlar.`;
</script>

<svelte:head>
	<title>{pageTitle} - Noir Crafted</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Collection Header -->
<section class={styles.collectionPage__header}>
	<div class={styles.collectionPage__container}>
		<div class={styles.collectionPage__headerContent}>
			<h1 class={styles.collectionPage__title}>
				{category}
			</h1>
			<p class={styles.collectionPage__description}>
				{pageDescription}
			</p>
		</div>
	</div>
</section>

<!-- Products Grid -->
{#if filteredProducts.length > 0}
	<ProductSection
		title=""
		subtitle=""
		products={filteredProducts}
		variant="grid"
	/>
{:else}
	<section class={styles.collectionPage__empty}>
		<div class={styles.collectionPage__container}>
			<div class={styles.collectionPage__emptyContent}>
				<p class={styles.collectionPage__emptyText}>
					{content.ui.noProductsInCategory}
				</p>
				<a href="/" class={styles.collectionPage__emptyLink}>
					{content.ui.backToHome}
				</a>
			</div>
		</div>
	</section>
{/if}

