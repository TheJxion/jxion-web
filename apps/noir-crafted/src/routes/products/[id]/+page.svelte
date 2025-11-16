<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$atoms/Button.svelte';
	import { products, getProductById } from '$stores/products';
	import { cart } from '$stores/cart';
	import { favorites } from '$stores/favorites';
	import { toast } from '$stores/toast';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import type { Product } from '$types';

	$: productId = $page.params.id;
	$: product = getProductById(productId);
	$: formattedPrice = product ? formatCurrency(product.price) : '';
	$: mainImage = product?.image || '';
	$: images = product?.images || (product?.image ? [product.image] : []);
	$: selectedImage = mainImage;
	$: isFavorite = product ? $favorites.some((fav) => fav.id === product.id) : false;

	function handleAddToCart() {
		if (product) {
			cart.add(product, 1);
			toast.add(content.ui.addedToCart, 'success');
		}
	}

	function handleToggleFavorite() {
		if (product) {
			favorites.toggle(product);
			toast.add(
				isFavorite ? 'Favorilerden kaldırıldı' : 'Favorilere eklendi',
				'success'
			);
		}
	}
</script>

<svelte:head>
	<title>{product?.name || 'Ürün'} - Noir Crafted</title>
	<meta name="description" content={product?.description || ''} />
</svelte:head>

{#if product}
	<!-- Product Detail -->
	<section class="py-8 md:py-16 bg-white">
		<div class="container-custom">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
				<!-- Image Gallery -->
				<div class="space-y-4">
					<!-- Main Image -->
					<div class="aspect-square bg-noir-gray-50 rounded-lg overflow-hidden">
						<img
							src={selectedImage}
							alt={product.name}
							class="w-full h-full object-cover object-center"
							loading="eager"
						/>
					</div>
					<!-- Thumbnails -->
					{#if images.length > 1}
						<div class="grid grid-cols-4 gap-4">
							{#each images as image}
								<button
									type="button"
									on:click={() => (selectedImage = image)}
									class="aspect-square bg-noir-gray-50 rounded overflow-hidden border-2 {selectedImage === image
										? 'border-noir-black'
										: 'border-transparent'} hover:border-noir-gray-400 transition-colors"
								>
									<img
										src={image}
										alt={product.name}
										class="w-full h-full object-cover object-center"
										loading="lazy"
									/>
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Product Info -->
				<div class="space-y-6">
					<div class="space-y-4">
						<div>
							<span class="text-sm text-noir-gray-600 font-sans uppercase tracking-wide">
								{product.category}
							</span>
							<h1 class="text-4xl md:text-5xl font-serif text-noir-black mt-2">
								{product.name}
							</h1>
						</div>
						<div class="flex items-center gap-4">
							<span class="text-3xl font-semibold text-noir-black">
								{formattedPrice}
							</span>
							{#if !product.inStock}
								<span class="text-sm text-noir-gray-500 uppercase">Stokta Yok</span>
							{/if}
						</div>
						<p class="text-lg text-noir-gray-700 font-sans leading-relaxed">
							{product.description}
						</p>
					</div>

					<!-- Add to Cart and Favorite -->
					<div class="pt-4 border-t border-noir-gray-200 space-y-3">
						<Button
							variant="primary"
							size="lg"
							onClick={handleAddToCart}
							disabled={!product.inStock}
							className="w-full"
						>
							{#if product.inStock}
								{content.ui.addToCart}
							{:else}
								{content.ui.outOfStock}
							{/if}
						</Button>
						<button
							type="button"
							on:click={handleToggleFavorite}
							class="w-full flex items-center justify-center gap-2 px-6 py-3 border border-noir-gray-300 rounded-full text-noir-black hover:bg-noir-gray-50 transition-colors font-sans font-semibold"
						>
							<svg
								class="w-5 h-5 {isFavorite ? 'fill-current' : ''}"
								fill={isFavorite ? 'currentColor' : 'none'}
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
							{isFavorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
						</button>
					</div>

					<!-- Product Details -->
					<div class="pt-4 border-t border-noir-gray-200 space-y-4">
						<div>
							<h3 class="text-sm font-semibold text-noir-black mb-2 uppercase tracking-wide">
								{content.product.material.title}
							</h3>
							<p class="text-noir-gray-600 font-sans">
								{content.product.material.description}
							</p>
						</div>
						<div>
							<h3 class="text-sm font-semibold text-noir-black mb-2 uppercase tracking-wide">
								{content.product.care.title}
							</h3>
							<p class="text-noir-gray-600 font-sans">
								{content.product.care.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Related Products -->
	{#if $products.filter((p) => p.category === product.category && p.id !== product.id).length > 0}
		<section class="py-16 md:py-24 bg-noir-gray-50">
			<div class="container-custom">
				<h2 class="text-3xl md:text-4xl font-serif text-noir-black text-center mb-12">
					{content.product.related.title}
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each $products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) as relatedProduct}
						<a
							href="/products/{relatedProduct.id}"
							class="group block bg-white rounded-lg overflow-hidden hover:shadow-card-lg transition-shadow"
						>
							<div class="aspect-square bg-noir-gray-50 overflow-hidden">
								<img
									src={relatedProduct.image}
									alt={relatedProduct.name}
									class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
							</div>
							<div class="p-4 space-y-2">
								<h3 class="font-serif font-semibold text-noir-black group-hover:text-noir-gray-700 transition-colors">
									{relatedProduct.name}
								</h3>
								<p class="text-lg font-semibold text-noir-black">
									{formatCurrency(relatedProduct.price)}
								</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}
{:else}
	<!-- Product Not Found -->
	<section class="py-16 md:py-24 bg-white">
		<div class="container-custom">
			<div class="text-center space-y-4">
				<h1 class="text-4xl md:text-5xl font-serif text-noir-black">
					{content.ui.productNotFound}
				</h1>
				<p class="text-lg text-noir-gray-600 font-sans">
					{content.ui.productNotFoundDescription}
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

