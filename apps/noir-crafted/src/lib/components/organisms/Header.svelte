<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$stores/cart';
	import { favorites } from '$stores/favorites';
import { content } from '$lib/i18n';
import type { NavItem } from '$types';
import styles from '@jxion/design/styles/modules/HeaderNoir.module.scss';

	// SSR-safe browser check
	const isBrowser = typeof window !== 'undefined';
	
	// Dynamic import for page store to avoid SSR issues
	let pageStore: any = null;

const defaultLogoText = content.site?.name ?? 'NOIR';
const defaultLogoHref = '/';

const categoryOrder = [
	'kolye',
	'bilezik',
	'yuzuk',
	'kupe',
	'sahmeran',
	'tokalar',
	'fular'
] as const;

const categoryLabels = content.collections?.categories ?? {};

const categoryNavItems: NavItem[] = categoryOrder
	.map((key) => {
		const label = categoryLabels[key];
		if (!label) return null;
		return {
			text: label,
			href: `/collections/${key}`,
		};
	})
	.filter(Boolean) as NavItem[];

const generalNavItems: NavItem[] = [
	{ text: content.nav?.home ?? 'Ana Sayfa', href: '/' },
	{
		text: content.nav?.collections ?? 'Koleksiyonlar',
		href: categoryNavItems[0]?.href ?? '/collections/kolye',
	},
	{ text: content.nav?.about ?? 'Hakkımızda', href: '/about' },
	{ text: content.nav?.contact ?? 'İletişim', href: '/contact' },
];

const fallbackNavItems: NavItem[] =
	categoryNavItems.length > 0 ? [...categoryNavItems, ...generalNavItems] : generalNavItems;

export let logoText: string = defaultLogoText;
export let logoHref: string = defaultLogoHref;
export let navItems: NavItem[] = fallbackNavItems;

	// SSR-safe page access
	// Don't access page store during SSR - only on client
	let activeNavItem = '/';
	let currentPathname = '/'; // Store current pathname (updated only on client)
	
	// Subscribe to page store on client for reactivity
	let unsubscribePage: (() => void) | null = null;
	
	$: cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);
	$: favoriteCount = $favorites.length;
	
	// Subscribe to cart animation trigger
	let cartAnimationActive = false;
	let unsubscribeAnimation: (() => void) | null = null;
	
	onMount(() => {
		// Dynamically import page store on client only
		if (isBrowser) {
			import('$app/stores').then((pageModule) => {
				pageStore = pageModule.page;
				
				// Subscribe to page store for client-side reactivity
				if (pageStore) {
					unsubscribePage = pageStore.subscribe((p: any) => {
						currentPathname = p?.url?.pathname || '/';
						activeNavItem = currentPathname;
					});
				}
			}).catch((err) => {
				console.warn('Failed to load page store:', err);
			});
		}
		
		unsubscribeAnimation = cart.animationTrigger.subscribe((value) => {
			cartAnimationActive = value;
		});
		
		return () => {
			if (unsubscribePage) unsubscribePage();
			if (unsubscribeAnimation) unsubscribeAnimation();
		};
	});

	function isActive(href: string): boolean {
		// SSR-safe: use stored pathname (only updated on client)
		// During SSR, currentPathname will be '/', so isActive returns false
		// On client, currentPathname is updated via subscription
		if (!currentPathname) return false;
		return currentPathname.startsWith(href);
	}
</script>

<header class={styles.header}>
	<nav class={styles.header__nav}>
		<div class={styles.header__content}>
			<!-- Logo -->
			<a href={logoHref} class={styles.header__logo}>
				{logoText}
			</a>

			<!-- Desktop Navigation -->
			<div class={styles.header__navLinks}>
				{#each navItems as item}
					<a
						href={item.href}
						class="{styles.header__navLink} {isActive(item.href) ? styles['header__navLink--active'] : ''}"
					>
						{item.text}
					</a>
				{/each}
			</div>

			<!-- Utility Icons -->
			<div class={styles.header__actions}>
				<button
					type="button"
					class={styles.header__actionButton}
					aria-label="Search"
				>
					<svg class={styles.header__actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					class="{styles.header__actionButton} {isActive('/favorites') ? styles['header__actionButton--active'] : ''}"
					aria-label="Favorites"
				>
					<svg 
						class={styles.header__actionIcon} 
						fill={isActive('/favorites') ? 'currentColor' : 'none'} 
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
					{#if favoriteCount > 0}
						<span class={styles.header__badge}>
							{favoriteCount}
						</span>
					{/if}
				</a>
				<a
					href="/cart"
					class="{styles.header__actionButton} {cartAnimationActive ? styles['header__actionButton--animated'] : ''}"
					aria-label="Shopping Cart"
				>
					<svg 
						class="{styles.header__actionIcon} {cartAnimationActive ? styles['header__actionIcon--glow'] : ''}" 
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
						<span class="{styles.header__badge} {cartAnimationActive ? styles['header__badge--animated'] : ''}">
							{cartItemCount}
						</span>
					{/if}
				</a>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class={styles.header__mobileNav}>
			<div class={styles.header__mobileLinks}>
				{#each navItems as item}
					<a
						href={item.href}
						class="{styles.header__mobileLink} {isActive(item.href) ? styles['header__mobileLink--active'] : ''}"
					>
						{item.text}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>
