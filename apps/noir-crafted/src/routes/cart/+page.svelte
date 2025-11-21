<script lang="ts">
	import { cart } from '$stores/cart';
	import { user } from '$stores/user';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import Button from '$atoms/Button.svelte';
	import styles from '@jxion/design/styles/modules/CartNoir.module.scss';

	$: cartItems = $cart;
	$: cartTotal = $cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	$: isAuthenticated = $user !== null;
	$: isEmpty = cartItems.length === 0;

	const navigate = (path: string) => {
		if (typeof window !== 'undefined') {
			window.location.href = path;
		}
	};

	function handleQuantityChange(productId: string, newQuantity: number) {
		if (newQuantity <= 0) {
			cart.remove(productId);
		} else {
			cart.updateQuantity(productId, newQuantity);
		}
	}

	function handleRemove(productId: string) {
		cart.remove(productId);
	}

	function handleCheckout() {
		if (isAuthenticated) {
			navigate('/checkout');
		} else {
			navigate('/auth/login?redirect=/cart');
		}
	}

	function handleContinueShopping() {
		navigate('/collections/kolye');
	}
</script>

<svelte:head>
	<title>{content.ui.myBasket} - Noir Crafted</title>
</svelte:head>

{#if isEmpty}
	<!-- Empty Cart State -->
	<section class="{styles.cartPage} {styles.cartPage__empty}">
		<div class={styles.cartPage__container}>
			<div class={styles.cartPage__emptyContent}>
				<div class={styles.cartPage__emptyText}>
					<h1 class={styles.cartPage__title}>
						{content.ui.myBasket}
					</h1>
					<p class={styles.cartPage__subtitle}>
						{content.ui.emptyCart}
					</p>
					<p class={styles.cartPage__description}>
						{content.ui.emptyCartDescription}
					</p>
				</div>
				<Button variant="primary" size="lg" href={undefined} onClick={handleContinueShopping}>
					{content.ui.discover}
				</Button>
			</div>
		</div>
	</section>
{:else}
	<!-- Cart with Items -->
	<section class={styles.cartPage}>
		<div class={styles.cartPage__container}>
			<h1 class={styles.cartPage__title} style="margin-bottom: 2rem;">
				{content.ui.myBasket}
			</h1>

			<div class={styles.cartPage__grid}>
				<!-- Cart Items -->
				<div class={styles.cartPage__items}>
					{#each cartItems as item (item.product.id)}
						<div class={styles.cartPage__item}>
							<!-- Product Image -->
							<a
								href="/products/{item.product.id}"
								class={styles.cartPage__itemImageLink}
							>
								<img
									src={item.product.image}
									alt={item.product.name}
									class={styles.cartPage__itemImage}
								/>
							</a>

							<!-- Product Info -->
							<div class={styles.cartPage__itemInfo}>
								<div class={styles.cartPage__itemHeader}>
									<div class={styles.cartPage__itemDetails}>
										<a
											href="/products/{item.product.id}"
											class={styles.cartPage__itemNameLink}
										>
											{item.product.name}
										</a>
										<p class={styles.cartPage__itemCategory}>
											{item.product.category}
										</p>
									</div>
									<button
										type="button"
										on:click={() => handleRemove(item.product.id)}
										class={styles.cartPage__itemRemove}
										aria-label="Remove item"
									>
										<svg class={styles.cartPage__itemRemoveIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								<div class={styles.cartPage__itemFooter}>
									<!-- Quantity Selector -->
									<div class={styles.cartPage__quantityControls}>
										<span class={styles.cartPage__quantityLabel} aria-hidden="true">
											{content.cart.labels.quantity}:
										</span>
										<div class={styles.cartPage__quantitySelector}>
											<button
												type="button"
												on:click={() => handleQuantityChange(item.product.id, item.quantity - 1)}
												class={styles.cartPage__quantityButton}
												aria-label="Decrease quantity"
											>
												−
											</button>
											<span class={styles.cartPage__quantityValue}>
												{item.quantity}
											</span>
											<button
												type="button"
												on:click={() => handleQuantityChange(item.product.id, item.quantity + 1)}
												class={styles.cartPage__quantityButton}
												aria-label="Increase quantity"
											>
												+
											</button>
										</div>
									</div>

									<!-- Subtotal -->
									<div class={styles.cartPage__itemSubtotal}>
										<p class={styles.cartPage__itemSubtotalPrice}>
											{formatCurrency(item.product.price * item.quantity)}
										</p>
										<p class={styles.cartPage__itemSubtotalUnit}>
											{formatCurrency(item.product.price)} / {content.cart.labels.unitPrice}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Summary Card -->
				<div class={styles.cartPage__summary}>
					<div class={styles.cartPage__summaryCard}>
						<h2 class={styles.cartPage__summaryTitle}>
							{content.cart.summary.title}
						</h2>

						<div class={styles.cartPage__summaryTotal}>
							<span class={styles.cartPage__summaryTotalLabel}>{content.cart.summary.total}:</span>
							<span class={styles.cartPage__summaryTotalValue}>{formatCurrency(cartTotal)}</span>
						</div>

						<div class={styles.cartPage__summaryActions}>
							<Button
								variant="secondary"
								size="md"
								href={undefined}
								onClick={handleContinueShopping}
								className="button--full-width"
							>
								{content.ui.continueShopping}
							</Button>
							<Button
								variant="primary"
								size="md"
								href={undefined}
								onClick={handleCheckout}
								className="button--full-width"
							>
								{content.ui.proceedToCheckout}
							</Button>
							{#if !isAuthenticated}
								<p class={styles.cartPage__summaryNote}>
									Ödeme için {content.ui.signIn} gereklidir.
								</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

