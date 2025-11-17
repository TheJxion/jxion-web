<script lang="ts">
	import { cart } from '$stores/cart';
	import { user } from '$stores/user';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { formatCurrency } from '$utils/format';
	import { content } from '$lib/i18n';
	import Button from '$atoms/Button.svelte';
	import { toast } from '$stores/toast';

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

	onMount(() => {
		if (!isAuthenticated) {
			goto('/auth/login?redirect=/checkout');
		}
		if (cartItems.length === 0) {
			goto('/cart');
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
			goto('/');
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
	<div class="min-h-screen bg-gradient-to-br from-noir-black via-gray-900 to-noir-black py-12 px-4">
		<div class="container-custom max-w-6xl">
			<!-- Header with Progress -->
			<div class="mb-8 text-center">
				<h1 class="text-4xl md:text-5xl font-serif text-white mb-4 animate-fade-in">
					Ödeme
				</h1>
				<div class="flex items-center justify-center gap-4 mb-8">
					<div class="flex items-center gap-2">
						<div class="w-10 h-10 rounded-full flex items-center justify-center {step >= 1 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-noir-black' : 'bg-gray-700 text-gray-400'} transition-all duration-500">
							<span class="font-bold">1</span>
						</div>
						<span class="text-sm text-gray-300 font-sans">Teslimat</span>
					</div>
					<div class="w-16 h-0.5 {step >= 2 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-gray-700'} transition-all duration-500"></div>
					<div class="flex items-center gap-2">
						<div class="w-10 h-10 rounded-full flex items-center justify-center {step >= 2 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-noir-black' : 'bg-gray-700 text-gray-400'} transition-all duration-500">
							<span class="font-bold">2</span>
						</div>
						<span class="text-sm text-gray-300 font-sans">Ödeme</span>
					</div>
					<div class="w-16 h-0.5 {step >= 3 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-gray-700'} transition-all duration-500"></div>
					<div class="flex items-center gap-2">
						<div class="w-10 h-10 rounded-full flex items-center justify-center {step >= 3 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-noir-black' : 'bg-gray-700 text-gray-400'} transition-all duration-500">
							<span class="font-bold">3</span>
						</div>
						<span class="text-sm text-gray-300 font-sans">Onay</span>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Main Form -->
				<div class="lg:col-span-2 space-y-6">
					{#if step === 1}
						<!-- Shipping Information -->
						<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl animate-slide-up">
							<h2 class="text-2xl font-serif text-white mb-6 flex items-center gap-3">
								<span class="w-1 h-8 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded"></span>
								Teslimat Bilgileri
							</h2>
							<div class="space-y-5">
								<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label
											for="shipping-full-name"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											Ad Soyad <span class="text-[#FFD700]">*</span>
										</label>
										<input
											type="text"
											id="shipping-full-name"
											bind:value={shippingInfo.fullName}
											required
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
											placeholder="Adınız ve Soyadınız"
										/>
									</div>
									<div>
										<label
											for="shipping-email"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											E-posta <span class="text-[#FFD700]">*</span>
										</label>
										<input
											type="email"
											id="shipping-email"
											bind:value={shippingInfo.email}
											required
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
											placeholder="ornek@email.com"
										/>
									</div>
								</div>
								<div>
									<label
										for="shipping-phone"
										class="block text-sm font-sans font-medium text-gray-300 mb-2"
									>
										Telefon <span class="text-[#FFD700]">*</span>
									</label>
									<input
										type="tel"
										id="shipping-phone"
										bind:value={shippingInfo.phone}
										required
										class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
										placeholder="05XX XXX XX XX"
									/>
								</div>
								<div>
									<label
										for="shipping-address"
										class="block text-sm font-sans font-medium text-gray-300 mb-2"
									>
										Adres <span class="text-[#FFD700]">*</span>
									</label>
									<textarea
										id="shipping-address"
										bind:value={shippingInfo.address}
										required
										rows="3"
										class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all resize-none"
										placeholder="Tam adres bilgisi"
									></textarea>
								</div>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label
											for="shipping-city"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											Şehir <span class="text-[#FFD700]">*</span>
										</label>
										<input
											type="text"
											id="shipping-city"
											bind:value={shippingInfo.city}
											required
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
											placeholder="İstanbul"
										/>
									</div>
									<div>
										<label
											for="shipping-postal-code"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											Posta Kodu
										</label>
										<input
											type="text"
											id="shipping-postal-code"
											bind:value={shippingInfo.postalCode}
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
											placeholder="34000"
										/>
									</div>
								</div>
							</div>
						</div>
					{:else if step === 2}
						<!-- Payment Information -->
						<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl animate-slide-up">
							<h2 class="text-2xl font-serif text-white mb-6 flex items-center gap-3">
								<span class="w-1 h-8 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded"></span>
								Ödeme Bilgileri
							</h2>
							<div class="space-y-5">
								<div>
									<label
										for="payment-card-number"
										class="block text-sm font-sans font-medium text-gray-300 mb-2"
									>
										Kart Numarası <span class="text-[#FFD700]">*</span>
									</label>
									<input
										type="text"
										id="payment-card-number"
										bind:value={paymentInfo.cardNumber}
										on:input={(e) => paymentInfo.cardNumber = formatCardNumber(e.currentTarget.value)}
										maxlength="19"
										required
										class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all font-mono text-lg tracking-wider"
										placeholder="1234 5678 9012 3456"
									/>
								</div>
								<div>
									<label
										for="payment-card-name"
										class="block text-sm font-sans font-medium text-gray-300 mb-2"
									>
										Kart Üzerindeki İsim <span class="text-[#FFD700]">*</span>
									</label>
									<input
										type="text"
										id="payment-card-name"
										bind:value={paymentInfo.cardName}
										required
										class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
										placeholder="AD SOYAD"
									/>
								</div>
								<div class="grid grid-cols-2 gap-5">
									<div>
										<label
											for="payment-expiry"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											Son Kullanma <span class="text-[#FFD700]">*</span>
										</label>
										<input
											type="text"
											id="payment-expiry"
											bind:value={paymentInfo.expiryDate}
											on:input={(e) => paymentInfo.expiryDate = formatExpiryDate(e.currentTarget.value)}
											maxlength="5"
											required
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all font-mono"
											placeholder="MM/YY"
										/>
									</div>
									<div>
										<label
											for="payment-cvv"
											class="block text-sm font-sans font-medium text-gray-300 mb-2"
										>
											CVV <span class="text-[#FFD700]">*</span>
										</label>
										<input
											type="text"
											id="payment-cvv"
											bind:value={paymentInfo.cvv}
											maxlength="3"
											required
											class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all font-mono"
											placeholder="123"
										/>
									</div>
								</div>
							</div>
						</div>
					{:else if step === 3}
						<!-- Review -->
						<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl animate-slide-up">
							<h2 class="text-2xl font-serif text-white mb-6 flex items-center gap-3">
								<span class="w-1 h-8 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded"></span>
								Sipariş Özeti
							</h2>
							<div class="space-y-4">
								<div class="bg-white/5 rounded-lg p-4">
									<h3 class="font-serif text-white mb-3">Teslimat Bilgileri</h3>
									<p class="text-gray-300 text-sm">{shippingInfo.fullName}</p>
									<p class="text-gray-300 text-sm">{shippingInfo.address}</p>
									<p class="text-gray-300 text-sm">{shippingInfo.city}</p>
								</div>
								<div class="bg-white/5 rounded-lg p-4">
									<h3 class="font-serif text-white mb-3">Ödeme Bilgileri</h3>
									<p class="text-gray-300 text-sm font-mono">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
								</div>
							</div>
						</div>
					{/if}

					<!-- Navigation Buttons -->
					<div class="flex gap-4">
						{#if step > 1}
							<Button
								variant="outline"
								size="lg"
								onClick={handlePreviousStep}
								className="flex-1 border-white/20 text-white hover:bg-white/10"
							>
								Geri
							</Button>
						{/if}
						{#if step < 3}
							<Button
								variant="primary"
								size="lg"
								onClick={handleNextStep}
								className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-noir-black font-bold"
							>
								Devam Et
							</Button>
						{:else}
							<Button
								variant="primary"
								size="lg"
								onClick={handlePlaceOrder}
								disabled={loading}
								loading={loading}
								className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-noir-black font-bold shadow-lg shadow-[#FFD700]/50"
							>
								Siparişi Onayla
							</Button>
						{/if}
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl sticky top-24">
						<h2 class="text-xl font-serif text-white mb-6">Sipariş Özeti</h2>
						<div class="space-y-4 mb-6">
							{#each cartItems as item}
								<div class="flex gap-4 items-start">
									<img
										src={item.product.image}
										alt={item.product.name}
										class="w-16 h-16 object-cover rounded-lg"
									/>
									<div class="flex-1">
										<p class="text-white text-sm font-serif">{item.product.name}</p>
										<p class="text-gray-400 text-xs">Adet: {item.quantity}</p>
										<p class="text-[#FFD700] font-semibold mt-1">{formatCurrency(item.product.price * item.quantity)}</p>
									</div>
								</div>
							{/each}
						</div>
						<div class="border-t border-white/20 pt-4 space-y-3">
							<div class="flex justify-between text-gray-300">
								<span>Ara Toplam</span>
								<span>{formatCurrency(cartTotal)}</span>
							</div>
							<div class="flex justify-between text-gray-300">
								<span>Kargo</span>
								<span class="text-[#FFD700]">Ücretsiz</span>
							</div>
							<div class="border-t border-white/20 pt-3 flex justify-between items-center">
								<span class="text-white font-serif text-lg">Toplam</span>
								<span class="text-[#FFD700] font-serif text-2xl font-bold">{formatCurrency(cartTotal)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.5s ease-out;
	}
</style>

