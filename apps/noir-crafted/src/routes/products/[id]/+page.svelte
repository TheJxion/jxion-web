<script lang="ts">
	import Button from '$atoms/Button.svelte';
	import { products, getProductById } from '$stores/products';
	import { cart } from '$stores/cart';
	import { favorites } from '$stores/favorites';
	import { toast } from '$stores/toast';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import type { Product } from '$types';
	import styles from '@jxion/design/styles/modules/ProductDetailNoir.module.scss';

	export let data: { productId: string };
	$: productId = data.productId;
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
	<section class={styles.productDetail}>
		<div class={styles.productDetail__container}>
			<div class={styles.productDetail__grid}>
				<!-- Image Gallery -->
				<div class={styles.productDetail__gallery}>
					<!-- Main Image -->
					<div class={styles.productDetail__mainImage}>
						<img
							src={selectedImage}
							alt={product.name}
							class={styles.productDetail__mainImageImg}
							loading="eager"
						/>
					</div>
					<!-- Thumbnails -->
					{#if images.length > 1}
						<div class={styles.productDetail__thumbnails}>
							{#each images as image}
								<button
									type="button"
									on:click={() => (selectedImage = image)}
									class={`${styles.productDetail__thumbnailButton} ${
										selectedImage === image
											? styles['productDetail__thumbnailButton--active']
											: ''
									}`}
								>
									<img
										src={image}
										alt={product.name}
										class={styles.productDetail__thumbnailImage}
										loading="lazy"
									/>
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Product Info -->
				<div class={styles.productDetail__info}>
					<div class={styles.productDetail__header}>
						<div>
							<span class={styles.productDetail__category}>
								{product.category}
							</span>
							<h1 class={styles.productDetail__title}>
								{product.name}
							</h1>
						</div>
						<div class={styles.productDetail__priceRow}>
							<span class={styles.productDetail__price}>
								{formattedPrice}
							</span>
							{#if !product.inStock}
								<span class={styles.productDetail__stockBadge}>Stokta Yok</span>
							{/if}
						</div>
						<p class={styles.productDetail__description}>
							{product.description}
						</p>
					</div>

					<!-- Add to Cart and Favorite -->
					<div class={styles.productDetail__actions}>
						<Button
							variant="primary"
							size="lg"
							href={undefined}
							onClick={handleAddToCart}
							disabled={!product.inStock}
							className={`${styles.productDetail__actionButton} button--full-width`}
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
							class={styles.productDetail__favoriteButton}
						>
							<svg
								class={styles.productDetail__favoriteIcon}
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
					<div class={styles.productDetail__details}>
						<div class={styles.productDetail__detailSection}>
							<h3 class={styles.productDetail__detailTitle}>
								{content.product.material.title}
							</h3>
							<p class={styles.productDetail__detailText}>
								{content.product.material.description}
							</p>
						</div>
						<div class={styles.productDetail__detailSection}>
							<h3 class={styles.productDetail__detailTitle}>
								{content.product.care.title}
							</h3>
							<p class={styles.productDetail__detailText}>
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
		<section class={styles.productDetail__related}>
			<div class={styles.productDetail__container}>
				<h2 class={styles.productDetail__relatedTitle}>
					{content.product.related.title}
				</h2>
				<div class={styles.productDetail__relatedGrid}>
					{#each $products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) as relatedProduct}
						<a
							href={`/products/${relatedProduct.id}`}
							class={styles.productDetail__relatedCard}
						>
							<div class={styles.productDetail__relatedImage}>
								<img
									src={relatedProduct.image}
									alt={relatedProduct.name}
									class={styles.productDetail__relatedImageImg}
									loading="lazy"
								/>
							</div>
							<div class={styles.productDetail__relatedInfo}>
								<h3 class={styles.productDetail__relatedName}>
									{relatedProduct.name}
								</h3>
								<p class={styles.productDetail__relatedPrice}>
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
	<section class={styles.productDetail__notFound}>
		<div class={styles.productDetail__container}>
			<div class={styles.productDetail__notFoundContent}>
				<h1 class={styles.productDetail__notFoundTitle}>
					{content.ui.productNotFound}
				</h1>
				<p class={styles.productDetail__notFoundText}>
					{content.ui.productNotFoundDescription}
				</p>
				<a href="/" class={styles.productDetail__notFoundLink}>
					{content.ui.backToHome}
				</a>
			</div>
		</div>
	</section>
{/if}

