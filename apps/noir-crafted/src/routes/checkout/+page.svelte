<script lang="ts">
	import { cart } from '$stores/cart';
	import { user } from '$stores/user';
	import { onMount } from 'svelte';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import Button from '$atoms/Button.svelte';
	import { toast } from '$stores/toast';
	import styles from '@jxion/design/styles/modules/CheckoutNoir.module.scss';

	$: cartItems = $cart;
	$: cartTotal = $cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	$: isAuthenticated = $user !== null;
	$: currentUser = $user;

	let shippingInfo = {
		fullName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: ''
	};

	let paymentInfo = {
		cardNumber: '',
		cardName: '',
		expiryDate: '',
		cvv: ''
	};

	let loading = false;
	let step = 1; // 1: Shipping, 2: Payment, 3: Review

	const navigate = (path: string) => {
		if (typeof window !== 'undefined') {
			window.location.href = path;
		}
	};

	onMount(() => {
		if (!isAuthenticated) {
			navigate('/auth/login?redirect=/checkout');
		}
		if (cartItems.length === 0) {
			navigate('/cart');
		}
		if (currentUser) {
			shippingInfo.email = currentUser.email || '';
			shippingInfo.fullName = currentUser.name || '';
		}
	});

	function handleNextStep() {
		if (step === 1) {
			// Validate shipping info
			if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address) {
				toast.add('Lütfen tüm zorunlu alanları doldurun.', 'error');
				return;
			}
			step = 2;
		} else if (step === 2) {
			// Validate payment info
			if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv) {
				toast.add('Lütfen tüm ödeme bilgilerini doldurun.', 'error');
				return;
			}
			step = 3;
		}
	}

	function handlePreviousStep() {
		if (step > 1) {
			step--;
		}
	}

	async function handlePlaceOrder() {
		loading = true;
		// Simulate order processing
		await new Promise((resolve) => setTimeout(resolve, 2000));
		
		// Clear cart
		cart.clear();
		toast.add('Siparişiniz başarıyla alındı!', 'success');
		
		// Redirect to success page or home
		setTimeout(() => {
			navigate('/');
		}, 1500);
	}

	function formatCardNumber(value: string) {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || '';
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(' ');
		}
		return v;
	}

	function formatExpiryDate(value: string) {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		if (v.length >= 2) {
			return v.substring(0, 2) + '/' + v.substring(2, 4);
		}
		return v;
	}
</script>

<svelte:head>
	<title>Ödeme - Noir Crafted</title>
</svelte:head>

{#if isAuthenticated && cartItems.length > 0}
	<div class={styles.checkoutPage}>
		<div class={styles.checkoutPage__container}>
			<!-- Header with Progress -->
			<div class={styles.checkoutPage__header}>
				<h1 class={styles.checkoutPage__title}>
					Ödeme
				</h1>
				<div class={styles.checkoutPage__progress}>
					<div class={styles.checkoutPage__progressStep}>
						<div class="{styles.checkoutPage__progressCircle} {step >= 1 ? styles['checkoutPage__progressCircle--active'] : styles['checkoutPage__progressCircle--inactive']}">
							<span>1</span>
						</div>
						<span class={styles.checkoutPage__progressLabel}>Teslimat</span>
					</div>
					<div class="{styles.checkoutPage__progressLine} {step >= 2 ? styles['checkoutPage__progressLine--active'] : styles['checkoutPage__progressLine--inactive']}"></div>
					<div class={styles.checkoutPage__progressStep}>
						<div class="{styles.checkoutPage__progressCircle} {step >= 2 ? styles['checkoutPage__progressCircle--active'] : styles['checkoutPage__progressCircle--inactive']}">
							<span>2</span>
						</div>
						<span class={styles.checkoutPage__progressLabel}>Ödeme</span>
					</div>
					<div class="{styles.checkoutPage__progressLine} {step >= 3 ? styles['checkoutPage__progressLine--active'] : styles['checkoutPage__progressLine--inactive']}"></div>
					<div class={styles.checkoutPage__progressStep}>
						<div class="{styles.checkoutPage__progressCircle} {step >= 3 ? styles['checkoutPage__progressCircle--active'] : styles['checkoutPage__progressCircle--inactive']}">
							<span>3</span>
						</div>
						<span class={styles.checkoutPage__progressLabel}>Onay</span>
					</div>
				</div>
			</div>

			<div class={styles.checkoutPage__grid}>
				<!-- Main Form -->
				<div>
					{#if step === 1}
						<!-- Shipping Information -->
						<div class={styles.checkoutPage__formSection}>
							<h2 class={styles.checkoutPage__formTitle}>
								<span class={styles.checkoutPage__formTitleAccent}></span>
								Teslimat Bilgileri
							</h2>
							<div class={styles.checkoutPage__formGrid}>
								<div class={styles.checkoutPage__formField}>
									<label
										for="shipping-full-name"
										class={styles.checkoutPage__formLabel}
									>
										Ad Soyad <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="shipping-full-name"
										bind:value={shippingInfo.fullName}
										required
										class={styles.checkoutPage__formInput}
										placeholder="Adınız ve Soyadınız"
									/>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="shipping-email"
										class={styles.checkoutPage__formLabel}
									>
										E-posta <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="email"
										id="shipping-email"
										bind:value={shippingInfo.email}
										required
										class={styles.checkoutPage__formInput}
										placeholder="ornek@email.com"
									/>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="shipping-phone"
										class={styles.checkoutPage__formLabel}
									>
										Telefon <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="tel"
										id="shipping-phone"
										bind:value={shippingInfo.phone}
										required
										class={styles.checkoutPage__formInput}
										placeholder="05XX XXX XX XX"
									/>
								</div>
								<div class="{styles.checkoutPage__formField}" style="grid-column: 1 / -1;">
									<label
										for="shipping-address"
										class={styles.checkoutPage__formLabel}
									>
										Adres <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<textarea
										id="shipping-address"
										bind:value={shippingInfo.address}
										required
										rows="3"
										class={styles.checkoutPage__formTextarea}
										placeholder="Tam adres bilgisi"
									></textarea>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="shipping-city"
										class={styles.checkoutPage__formLabel}
									>
										Şehir <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="shipping-city"
										bind:value={shippingInfo.city}
										required
										class={styles.checkoutPage__formInput}
										placeholder="İstanbul"
									/>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="shipping-postal-code"
										class={styles.checkoutPage__formLabel}
									>
										Posta Kodu
									</label>
									<input
										type="text"
										id="shipping-postal-code"
										bind:value={shippingInfo.postalCode}
										class={styles.checkoutPage__formInput}
										placeholder="34000"
									/>
								</div>
							</div>
						</div>
					{:else if step === 2}
						<!-- Payment Information -->
						<div class={styles.checkoutPage__formSection}>
							<h2 class={styles.checkoutPage__formTitle}>
								<span class={styles.checkoutPage__formTitleAccent}></span>
								Ödeme Bilgileri
							</h2>
							<div class={styles.checkoutPage__formGrid}>
								<div class="{styles.checkoutPage__formField}" style="grid-column: 1 / -1;">
									<label
										for="payment-card-number"
										class={styles.checkoutPage__formLabel}
									>
										Kart Numarası <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="payment-card-number"
										bind:value={paymentInfo.cardNumber}
										on:input={(e) => paymentInfo.cardNumber = formatCardNumber(e.currentTarget.value)}
										maxlength="19"
										required
										class="{styles.checkoutPage__formInput} {styles['checkoutPage__formInput--mono']}"
										placeholder="1234 5678 9012 3456"
									/>
								</div>
								<div class="{styles.checkoutPage__formField}" style="grid-column: 1 / -1;">
									<label
										for="payment-card-name"
										class={styles.checkoutPage__formLabel}
									>
										Kart Üzerindeki İsim <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="payment-card-name"
										bind:value={paymentInfo.cardName}
										required
										class={styles.checkoutPage__formInput}
										placeholder="AD SOYAD"
									/>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="payment-expiry"
										class={styles.checkoutPage__formLabel}
									>
										Son Kullanma <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="payment-expiry"
										bind:value={paymentInfo.expiryDate}
										on:input={(e) => paymentInfo.expiryDate = formatExpiryDate(e.currentTarget.value)}
										maxlength="5"
										required
										class="{styles.checkoutPage__formInput} {styles['checkoutPage__formInput--mono']}"
										placeholder="MM/YY"
									/>
								</div>
								<div class={styles.checkoutPage__formField}>
									<label
										for="payment-cvv"
										class={styles.checkoutPage__formLabel}
									>
										CVV <span class={styles.checkoutPage__formRequired}>*</span>
									</label>
									<input
										type="text"
										id="payment-cvv"
										bind:value={paymentInfo.cvv}
										maxlength="3"
										required
										class="{styles.checkoutPage__formInput} {styles['checkoutPage__formInput--mono']}"
										placeholder="123"
									/>
								</div>
							</div>
						</div>
					{:else if step === 3}
						<!-- Review -->
						<div class={styles.checkoutPage__formSection}>
							<h2 class={styles.checkoutPage__formTitle}>
								<span class={styles.checkoutPage__formTitleAccent}></span>
								Sipariş Özeti
							</h2>
							<div class={styles.checkoutPage__formGrid}>
								<div class={styles.checkoutPage__reviewSection}>
									<h3 class={styles.checkoutPage__reviewTitle}>Teslimat Bilgileri</h3>
									<p class={styles.checkoutPage__reviewText}>{shippingInfo.fullName}</p>
									<p class={styles.checkoutPage__reviewText}>{shippingInfo.address}</p>
									<p class={styles.checkoutPage__reviewText}>{shippingInfo.city}</p>
								</div>
								<div class={styles.checkoutPage__reviewSection}>
									<h3 class={styles.checkoutPage__reviewTitle}>Ödeme Bilgileri</h3>
									<p class="{styles.checkoutPage__reviewText}" style="font-family: monospace;">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
								</div>
							</div>
						</div>
					{/if}

					<!-- Navigation Buttons -->
					<div class={styles.checkoutPage__formActions}>
						{#if step > 1}
							<Button
								variant="outline"
								size="lg"
								href={undefined}
								onClick={handlePreviousStep}
								className="button--full-width"
							>
								Geri
							</Button>
						{/if}
						{#if step < 3}
							<Button
								variant="primary"
								size="lg"
								href={undefined}
								onClick={handleNextStep}
								className="button--full-width"
							>
								Devam Et
							</Button>
						{:else}
							<Button
								variant="primary"
								size="lg"
								href={undefined}
								onClick={handlePlaceOrder}
								disabled={loading}
								loading={loading}
								className="button--full-width"
							>
								Siparişi Onayla
							</Button>
						{/if}
					</div>
				</div>

				<!-- Order Summary -->
				<div class={styles.checkoutPage__summary}>
					<div class={styles.checkoutPage__summaryCard}>
						<h2 class={styles.checkoutPage__summaryTitle}>Sipariş Özeti</h2>
						<div class={styles.checkoutPage__summaryItems}>
							{#each cartItems as item}
								<div class={styles.checkoutPage__summaryItem}>
									<img
										src={item.product.image}
										alt={item.product.name}
										class={styles.checkoutPage__summaryItemImage}
									/>
									<div class={styles.checkoutPage__summaryItemInfo}>
										<p class={styles.checkoutPage__summaryItemName}>{item.product.name}</p>
										<p class={styles.checkoutPage__summaryItemMeta}>Adet: {item.quantity}</p>
										<p class={styles.checkoutPage__summaryItemPrice}>{formatCurrency(item.product.price * item.quantity)}</p>
									</div>
								</div>
							{/each}
						</div>
						<div class={styles.checkoutPage__summaryTotals}>
							<div class={styles.checkoutPage__summaryTotalRow}>
								<span>Ara Toplam</span>
								<span>{formatCurrency(cartTotal)}</span>
							</div>
							<div class={styles.checkoutPage__summaryTotalRow}>
								<span>Kargo</span>
								<span style="color: var(--color-noir-gold);">Ücretsiz</span>
							</div>
							<div class={styles.checkoutPage__summaryTotalFinal}>
								<span class={styles.checkoutPage__summaryTotalLabel}>Toplam</span>
								<span class={styles.checkoutPage__summaryTotalValue}>{formatCurrency(cartTotal)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

