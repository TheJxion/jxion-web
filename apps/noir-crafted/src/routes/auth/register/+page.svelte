<script lang="ts">
	import { user } from '$stores/user';
	import { goto } from '$app/navigation';
	import { content } from '$lib/i18n';
	import Button from '$atoms/Button.svelte';
	import { toast } from '$stores/toast';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	export let data: { redirectUrl: string };
	$: redirectUrl = data.redirectUrl;

	async function handleSubmit() {
		error = '';
		loading = true;

		if (!email || !password || !confirmPassword) {
			error = 'Lütfen tüm alanları doldurun.';
			loading = false;
			return;
		}

		if (password !== confirmPassword) {
			error = 'Şifreler eşleşmiyor.';
			loading = false;
			return;
		}

		if (password.length < 6) {
			error = 'Şifre en az 6 karakter olmalıdır.';
			loading = false;
			return;
		}

		try {
			await user.register(email, password);
			toast.add('Kayıt başarılı! Hoş geldiniz.', 'success');
			goto(redirectUrl);
		} catch (e: any) {
			error = e.message || content.ui.registerError;
			toast.add(error, 'error');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{content.ui.signUp} - Noir Crafted</title>
</svelte:head>

<section class="min-h-screen bg-noir-black flex items-center justify-center py-12 px-4">
	<div class="w-full max-w-md">
		<!-- Logo -->
		<div class="text-center mb-8">
			<a href="/" class="inline-block text-3xl font-bold uppercase tracking-tight text-white hover:opacity-80 transition-opacity">
				{content.site.name}
			</a>
		</div>

		<!-- Auth Card -->
		<div class="bg-white rounded-lg p-8 shadow-xl">
			<h1 class="text-3xl font-serif font-semibold text-noir-black mb-6 text-center">
				{content.ui.registerTitle}
			</h1>

			{#if error}
				<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-sans">
					{error}
				</div>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="space-y-5">
				<div>
					<label for="email" class="block text-sm font-sans font-medium text-noir-black mb-2">
						{content.ui.email}
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent font-sans text-noir-black"
						placeholder="ornek@email.com"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-sans font-medium text-noir-black mb-2">
						{content.ui.password}
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						minlength="6"
						class="w-full px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent font-sans text-noir-black"
						placeholder="••••••••"
					/>
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-sans font-medium text-noir-black mb-2">
						Şifre Tekrar
					</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						required
						minlength="6"
						class="w-full px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent font-sans text-noir-black"
						placeholder="••••••••"
					/>
				</div>

				<Button
					type="submit"
					variant="primary"
					size="lg"
					loading={loading}
					disabled={loading}
					className="w-full"
				>
					{content.ui.signUp}
				</Button>
			</form>

			<div class="mt-6 text-center">
				<p class="text-sm text-noir-gray-600 font-sans">
					{content.ui.alreadyHaveAccount}
					<a href="/auth/login?redirect={redirectUrl}" class="text-noir-black font-semibold hover:underline">
						{content.ui.signIn}
					</a>
				</p>
			</div>
		</div>
	</div>
</section>
