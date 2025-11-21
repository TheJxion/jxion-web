<script lang="ts">
	import type { Product, ProductCardProps } from '$types';
	import { formatCurrency } from '$utils/format';
	import styles from '@jxion/design/styles/modules/ProductCardNoir.module.scss';

	export let product: Product;
	export let variant: ProductCardProps['variant'] = 'default';

	$: formattedPrice = formatCurrency(product.price);
	const getVariantClass = () =>
		variant !== 'default' ? styles[`productCard--${variant}`] : '';

	$: cardClasses = [styles.productCard, getVariantClass()].filter(Boolean).join(' ');
</script>

<article class={cardClasses}>
	<a href={`/products/${product.id}`} class={styles.productCard__link} aria-label={product.name}>
		<!-- Product Image -->
		<div class={styles.productCard__imageWrapper}>
			<img
				src={product.image}
				alt={product.name}
				class={styles.productCard__image}
				loading="lazy"
			/>
		</div>

		<!-- Product Info -->
		<div class={styles.productCard__body}>
			<h3 class={styles.productCard__title}>
				{product.name}
			</h3>
			<p class={styles.productCard__description}>
				{product.description}
			</p>
			{#if variant !== 'compact'}
				<div class={styles.productCard__footer}>
					<span class={styles.productCard__price}>
						{formattedPrice}
					</span>
					{#if !product.inStock}
						<span class={styles.productCard__stockBadge}>Stokta Yok</span>
					{/if}
				</div>
			{/if}
		</div>
	</a>
</article>
