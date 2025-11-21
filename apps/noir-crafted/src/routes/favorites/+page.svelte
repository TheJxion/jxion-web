<script lang="ts">
	import { favorites } from '$stores/favorites';
	import { content } from '$lib/i18n';
	import ProductCard from '$molecules/ProductCard.svelte';
	import Button from '$atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import styles from '@jxion/design/styles/modules/FavoritesNoir.module.scss';

	$: favoriteProducts = $favorites;
	$: isEmpty = favoriteProducts.length === 0;

	function handleDiscover() {
		goto('/collections/kolye');
	}
</script>

<svelte:head>
	<title>{content.ui.favorites} - Noir Crafted</title>
</svelte:head>

{#if isEmpty}
	<!-- Empty Favorites State -->
	<section class="{styles.favoritesPage} {styles.favoritesPage__empty}">
		<div class={styles.favoritesPage__container}>
			<div class={styles.favoritesPage__emptyContent}>
				<div class={styles.favoritesPage__emptyText}>
					<h1 class={styles.favoritesPage__title}>
						{content.ui.favorites}
					</h1>
					<p class={styles.favoritesPage__subtitle}>
						Henüz favori ürününüz bulunmamaktadır.
					</p>
					<p class={styles.favoritesPage__description}>
						Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.
					</p>
				</div>
				<Button variant="primary" size="lg" href={undefined} onClick={handleDiscover}>
					{content.ui.discover}
				</Button>
			</div>
		</div>
	</section>
{:else}
	<!-- Favorites Grid -->
	<section class={styles.favoritesPage}>
		<div class={styles.favoritesPage__container}>
			<div class={styles.favoritesPage__header}>
				<h1 class={styles.favoritesPage__title}>
					{content.ui.favorites}
				</h1>
				<p class={styles.favoritesPage__count}>
					{favoriteProducts.length} ürün favorilerinizde
				</p>
			</div>

			<div class={styles.favoritesPage__grid}>
				{#each favoriteProducts as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>
{/if}

