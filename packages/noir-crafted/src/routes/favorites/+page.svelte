<script lang="ts">
	import { favorites } from '$stores/favorites';
	import { content } from '$lib/i18n';
	import ProductCard from '$molecules/ProductCard.svelte';
	import Button from '$atoms/Button.svelte';
	import { goto } from '$app/navigation';

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
	<section class="py-16 md:py-24 bg-white min-h-[60vh] flex items-center">
		<div class="container-custom text-center space-y-6">
			<div class="space-y-4">
				<h1 class="text-4xl md:text-5xl font-serif text-noir-black">
					{content.ui.favorites}
				</h1>
				<p class="text-lg text-noir-gray-600 font-sans">
					Henüz favori ürününüz bulunmamaktadır.
				</p>
				<p class="text-base text-noir-gray-500 font-sans">
					Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.
				</p>
			</div>
			<Button variant="primary" size="lg" onClick={handleDiscover}>
				{content.ui.discover}
			</Button>
		</div>
	</section>
{:else}
	<!-- Favorites Grid -->
	<section class="py-8 md:py-16 bg-white min-h-[60vh]">
		<div class="container-custom">
			<h1 class="text-4xl md:text-5xl font-serif text-noir-black mb-8">
				{content.ui.favorites}
			</h1>
			<p class="text-base text-noir-gray-600 font-sans mb-8">
				{favoriteProducts.length} ürün favorilerinizde
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
				{#each favoriteProducts as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>
{/if}

