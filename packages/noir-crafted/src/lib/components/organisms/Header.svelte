<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { cart } from '$stores/cart';
	import { favorites } from '$stores/favorites';
	import { content } from '$lib/i18n';
	import type { NavItem } from '$types';

	export let logoText: string = content.site.name;
	export let logoHref: string = '/';
	export let navItems: NavItem[] = [
		{ text: content.nav.kolye, href: '/collections/kolye' },
		{ text: content.nav.bilezik, href: '/collections/bilezik' },
		{ text: content.nav.yuzuk, href: '/collections/yuzuk' },
		{ text: content.nav.kupe, href: '/collections/kupe' },
		{ text: content.nav.sahmeran, href: '/collections/sahmeran' },
		{ text: content.nav.tokalar, href: '/collections/tokalar' },
		{ text: content.nav.fular, href: '/collections/fular' },
	];

	$: activeNavItem = $page.url.pathname;
	$: cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);
	$: favoriteCount = $favorites.length;
	
	// Subscribe to cart animation trigger
	let cartAnimationActive = false;
	let unsubscribeAnimation: (() => void) | null = null;
	
	onMount(() => {
		unsubscribeAnimation = cart.animationTrigger.subscribe((value) => {
			cartAnimationActive = value;
		});
		return () => {
			if (unsubscribeAnimation) unsubscribeAnimation();
		};
	});

	function isActive(href: string): boolean {
		return $page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 bg-white border-b border-noir-gray-200">
	<nav class="container-custom py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href={logoHref} class="text-2xl font-bold uppercase tracking-tight text-noir-black hover:opacity-80 transition-opacity">
				{logoText}
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden lg:flex items-center space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-sm font-medium text-noir-black hover:text-noir-gray-700 transition-colors {isActive(item.href)
							? 'border-b-2 border-noir-black pb-1'
							: ''}"
					>
						{item.text}
					</a>
				{/each}
			</div>

			<!-- Utility Icons -->
			<div class="flex items-center space-x-4">
				<button
					type="button"
					class="p-2 rounded-full hover:bg-noir-gray-100 transition-colors"
					aria-label="Search"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
				<a
					href="/favorites"
					class="relative p-2 rounded-full hover:bg-noir-gray-100 transition-colors {isActive('/favorites') ? 'bg-noir-gray-100' : ''}"
					aria-label="Favorites"
				>
					<svg class="w-5 h-5" fill={isActive('/favorites') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					{#if favoriteCount > 0}
						<span class="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-noir-black text-xs font-bold rounded-full flex items-center justify-center">
							{favoriteCount}
						</span>
					{/if}
				</a>
				<a
					href="/cart"
					class="relative p-2 rounded-full hover:bg-noir-gray-100 transition-all {cartAnimationActive ? 'scale-110' : ''}"
					aria-label="Shopping Cart"
				>
					<svg 
						class="w-5 h-5 transition-all {cartAnimationActive ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : ''}" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
					{#if cartItemCount > 0}
						<span class="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-noir-black text-xs font-bold rounded-full flex items-center justify-center transition-all {cartAnimationActive ? 'scale-125' : ''}">
							{cartItemCount}
						</span>
					{/if}
				</a>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="lg:hidden mt-4 pt-4 border-t border-noir-gray-200">
			<div class="flex flex-wrap gap-4">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-sm font-medium text-noir-black hover:text-noir-gray-700 transition-colors {isActive(item.href)
							? 'border-b-2 border-noir-black pb-1'
							: ''}"
					>
						{item.text}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>
