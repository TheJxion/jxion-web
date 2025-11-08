<script lang="ts">
	import { cart } from '$stores/cart';
	import { user } from '$stores/user';
	import { goto } from '$app/navigation';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import Button from '$atoms/Button.svelte';

	$: cartItems = $cart;
	$: cartTotal = $cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	$: isAuthenticated = $user !== null;
	$: isEmpty = cartItems.length === 0;

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
			// Navigate to checkout (future implementation)
			goto('/checkout');
		} else {
			// Redirect to login with return URL
			goto('/auth/login?redirect=/cart');
		}
	}

	function handleContinueShopping() {
		goto('/collections/kolye');
	}
</script>

<svelte:head>
	<title>{content.ui.myBasket} - Noir Crafted</title>
</svelte:head>

{#if isEmpty}
	<!-- Empty Cart State -->
	<section class="py-16 md:py-24 bg-white min-h-[60vh] flex items-center">
		<div class="container-custom text-center space-y-6">
			<div class="space-y-4">
				<h1 class="text-4xl md:text-5xl font-serif text-noir-black">
					{content.ui.myBasket}
				</h1>
				<p class="text-lg text-noir-gray-600 font-sans">
					{content.ui.emptyCart}
				</p>
				<p class="text-base text-noir-gray-500 font-sans">
					{content.ui.emptyCartDescription}
				</p>
			</div>
			<Button variant="primary" size="lg" onClick={handleContinueShopping}>
				{content.ui.discover}
			</Button>
		</div>
	</section>
{:else}
	<!-- Cart with Items -->
	<section class="py-8 md:py-16 bg-white min-h-[60vh]">
		<div class="container-custom">
			<h1 class="text-4xl md:text-5xl font-serif text-noir-black mb-8">
				{content.ui.myBasket}
			</h1>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Cart Items -->
				<div class="lg:col-span-2 space-y-4">
					{#each cartItems as item (item.product.id)}
						<div
							class="bg-white border border-noir-gray-200 rounded-lg p-6 flex flex-col sm:flex-row gap-6 transition-opacity duration-300"
						>
							<!-- Product Image -->
							<a
								href="/products/{item.product.id}"
								class="flex-shrink-0 w-full sm:w-32 h-32 bg-noir-gray-50 rounded-lg overflow-hidden"
							>
								<img
									src={item.product.image}
									alt={item.product.name}
									class="w-full h-full object-cover object-center"
								/>
							</a>

							<!-- Product Info -->
							<div class="flex-1 space-y-4">
								<div class="flex justify-between items-start">
									<div class="space-y-2">
										<a
											href="/products/{item.product.id}"
											class="text-xl font-serif font-semibold text-noir-black hover:text-noir-gray-700 transition-colors"
										>
											{item.product.name}
										</a>
										<p class="text-sm text-noir-gray-600 font-sans">
											{item.product.category}
										</p>
									</div>
									<button
										type="button"
										on:click={() => handleRemove(item.product.id)}
										class="text-noir-gray-400 hover:text-noir-black transition-colors"
										aria-label="Remove item"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								<div class="flex items-center justify-between">
									<!-- Quantity Selector -->
									<div class="flex items-center gap-3">
										<label class="text-sm font-sans text-noir-gray-600">
											{content.ui.quantity}:
										</label>
										<div class="flex items-center border border-noir-gray-300 rounded">
											<button
												type="button"
												on:click={() => handleQuantityChange(item.product.id, item.quantity - 1)}
												class="px-3 py-1 text-noir-black hover:bg-noir-gray-100 transition-colors"
												aria-label="Decrease quantity"
											>
												−
											</button>
											<span class="px-4 py-1 text-noir-black font-sans min-w-[3rem] text-center">
												{item.quantity}
											</span>
											<button
												type="button"
												on:click={() => handleQuantityChange(item.product.id, item.quantity + 1)}
												class="px-3 py-1 text-noir-black hover:bg-noir-gray-100 transition-colors"
												aria-label="Increase quantity"
											>
												+
											</button>
										</div>
									</div>

									<!-- Subtotal -->
									<div class="text-right">
										<p class="text-lg font-semibold text-noir-black">
											{formatCurrency(item.product.price * item.quantity)}
										</p>
										<p class="text-sm text-noir-gray-500 font-sans">
											{formatCurrency(item.product.price)} / {content.ui.quantity.toLowerCase()}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Summary Card -->
				<div class="lg:col-span-1">
					<div class="bg-noir-gray-50 border border-noir-gray-200 rounded-lg p-6 sticky top-24 space-y-6">
						<h2 class="text-xl font-serif font-semibold text-noir-black">
							{content.ui.cart}
						</h2>

						<div class="space-y-4">
							<div class="flex justify-between items-center text-lg">
								<span class="font-sans text-noir-gray-700">{content.ui.total}:</span>
								<span class="font-serif font-semibold text-noir-black">{formatCurrency(cartTotal)}</span>
							</div>
						</div>

						<div class="space-y-3 pt-4 border-t border-noir-gray-300">
							<Button
								variant="secondary"
								size="md"
								onClick={handleContinueShopping}
								className="w-full"
							>
								{content.ui.continueShopping}
							</Button>
							<Button
								variant="primary"
								size="md"
								onClick={handleCheckout}
								className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-noir-black font-bold shadow-lg shadow-[#FFD700]/30 transition-all duration-300"
							>
								{content.ui.proceedToCheckout}
							</Button>
							{#if !isAuthenticated}
								<p class="text-xs text-noir-gray-500 text-center font-sans mt-2">
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

