<script lang="ts">
	import Card from '$atoms/Card.svelte';
	import type { Product, ProductCardProps } from '$types';
	import { formatCurrency } from '$utils/format';

	export let product: Product;
	export let variant: ProductCardProps['variant'] = 'default';

	$: cardClasses = variant === 'compact' ? 'p-4' : variant === 'featured' ? 'p-8' : 'p-6';
	$: formattedPrice = formatCurrency(product.price);
</script>

<Card variant="default" className="group cursor-pointer hover:shadow-card-lg transition-shadow">
	<a href="/products/{product.id}" class="block">
		<!-- Product Image -->
		<div class="relative aspect-square mb-4 bg-noir-gray-50 rounded overflow-hidden">
			<img
				src={product.image}
				alt={product.name}
				class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
				loading="lazy"
			/>
		</div>

		<!-- Product Info -->
		<div class="space-y-2">
			<h3 class="font-serif text-lg font-semibold text-noir-black group-hover:text-noir-gray-700 transition-colors">
				{product.name}
			</h3>
			<p class="text-sm text-noir-gray-600 line-clamp-2">
				{product.description}
			</p>
			{#if variant !== 'compact'}
				<div class="flex items-center justify-between pt-2">
					<span class="text-lg font-semibold text-noir-black">
						{formattedPrice}
					</span>
					{#if !product.inStock}
						<span class="text-xs text-noir-gray-500 uppercase">Stokta Yok</span>
					{/if}
				</div>
			{/if}
		</div>
	</a>
</Card>
