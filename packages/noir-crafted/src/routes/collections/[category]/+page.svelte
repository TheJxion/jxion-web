<script lang="ts">
	import { page } from '$app/stores';
	import ProductSection from '$organisms/ProductSection.svelte';
	import { products } from '$stores/products';
	import { getProductsByCategory } from '$stores/products';
	import { content } from '$lib/i18n';
	import type { ProductCategory } from '$types';

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
<section class="py-12 md:py-16 bg-white border-b border-noir-gray-200">
	<div class="container-custom">
		<div class="text-center space-y-4">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-serif text-noir-black">
				{category}
			</h1>
			<p class="text-lg text-noir-gray-600 font-sans max-w-2xl mx-auto">
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
	<section class="py-16 md:py-24 bg-white">
		<div class="container-custom">
			<div class="text-center space-y-4">
				<p class="text-lg text-noir-gray-600 font-sans">
					{content.ui.noProductsInCategory}
				</p>
				<a
					href="/"
					class="inline-block px-6 py-3 bg-noir-black text-white font-semibold rounded-full hover:bg-noir-gray-800 transition-colors"
				>
					{content.ui.backToHome}
				</a>
			</div>
		</div>
	</section>
{/if}

