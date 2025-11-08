<script lang="ts">
	import ProductCard from '$molecules/ProductCard.svelte';
	import type { ProductSectionProps } from '$types';

	export let title: ProductSectionProps['title'];
	export let subtitle: ProductSectionProps['subtitle'] = '';
	export let products: ProductSectionProps['products'] = [];
	export let variant: ProductSectionProps['variant'] = 'grid';
</script>

<section class="py-16 md:py-24 bg-white">
	<div class="container-custom">
		<!-- Section Header -->
		<div class="text-center mb-12 space-y-4">
			<h2 class="text-4xl md:text-5xl font-serif text-noir-black">
				{title}
			</h2>
			{#if subtitle}
				<p class="text-lg text-noir-gray-600 font-sans max-w-2xl mx-auto">
					{subtitle}
				</p>
			{/if}
		</div>

		<!-- Products Grid -->
		{#if variant === 'grid'}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
				{#each products as product}
					<ProductCard {product} />
				{/each}
			</div>
		{:else}
			<!-- Carousel variant can be added later -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
				{#each products as product}
					<ProductCard {product} />
				{/each}
			</div>
		{/if}
	</div>
</section>
