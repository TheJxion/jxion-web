<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';

	// SvelteKit automatically provides these props, but we don't use them
	// Declaring them to suppress warnings
	export const data: any = undefined;
	export const params: any = undefined;

	// Dynamically import React components
	let immersiveHeroModule: any = null;
	let productCardModule: any = null;
	let heroLoaded = false;
	let productCardLoaded = false;

	// GSAP and ScrollTrigger references
	let GSAP: any;
	let ScrollTrigger: any;

	// Element references for GSAP animations
	let heroWrapper: HTMLElement;
	let mainContent: HTMLElement;
	let timeline: any = null;

	onMount(async () => {
		// --- 1. Load GSAP and ScrollTrigger ---
		try {
			const [gsapModule, scrollTriggerModule] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
			]);

			// GSAP exports as named export 'gsap' (lowercase)
			GSAP = gsapModule.gsap || gsapModule.default || gsapModule;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

			if (GSAP && ScrollTrigger) {
				GSAP.registerPlugin(ScrollTrigger);
			}
		} catch (error) {
			console.error('Error loading GSAP:', error);
		}

		// --- 2. Load React Components ---
		try {
			immersiveHeroModule = await import('$lib/components/organisms/ImmersiveHero');
			heroLoaded = true;
		} catch (error) {
			console.error('Error loading ImmersiveHero:', error);
			heroLoaded = true; // Continue even if component fails
		}

		try {
			productCardModule = await import('$lib/components/molecules/ProductCard');
			productCardLoaded = true;
		} catch (error) {
			console.error('Error loading ProductCard:', error);
			productCardLoaded = true; // Continue even if component fails
		}

		// --- 3. Initialize GSAP ScrollTrigger Animation ---
		// Wait for next tick to ensure DOM is ready
		setTimeout(() => {
			if (heroLoaded && heroWrapper && mainContent && GSAP && ScrollTrigger) {
				// Pin the hero section
				ScrollTrigger.create({
					trigger: heroWrapper,
					pin: true,
					start: 'top top',
					end: '+=100%', // Pin for 100vh of scroll
					scrub: 1, // Smooth animation tied to scroll
					onUpdate: (self: any) => {
						// Optional: Log scroll progress for debugging
						// console.log('Scroll Progress:', self.progress.toFixed(2));
					},
				});

				// Create timeline for hero content animation
				timeline = GSAP.timeline({
					scrollTrigger: {
						trigger: heroWrapper,
						start: 'top top',
						end: 'bottom top',
						scrub: 1,
					},
				});

				// Find the hero content element (the React component wrapper)
				const heroContent = heroWrapper.querySelector('.homepage-hero') as HTMLElement;

				if (heroContent) {
					// Animate hero content: scale down, move up, fade out
					timeline
						.to(heroContent, {
							scale: 0.8,
							y: '-15%',
							opacity: 0,
							ease: 'power2.out',
						}, 0)
						// Animate main content: reveal from bottom with clipPath
						.fromTo(
							mainContent,
							{
								clipPath: 'inset(100% 0 0 0)',
								y: 50,
							},
							{
								clipPath: 'inset(0% 0 0 0)',
								y: 0,
								ease: 'power2.out',
							},
							0.1
						);
				}
			}
		}, 100); // Small delay to ensure React components are rendered
	});

	onDestroy(() => {
		// Clean up all ScrollTrigger instances
		if (ScrollTrigger) {
			ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
		}
		// Kill timeline if it exists
		if (timeline) {
			timeline.kill();
		}
	});

	// --- Product Data ---
	const PRODUCTS = [
		{
			title: 'Ay Döngüsü Kolye',
			description:
				'Ayın evrelerinden ilham alan zarif bir kolye. Gümüş kaplama ile özenle işlenmiş, zamanın ötesinde bir tasarım.',
			price: '₺1.299,00',
			imageUrl: 'https://placehold.co/400x400/222/FFF?text=KOLYE',
		},
		{
			title: 'Başak Burcu Yüzük',
			description:
				'Virgo burcunun zarafetini yansıtan özel tasarım yüzük. Altın kaplama ile muhteşem bir kombinasyon.',
			price: '₺899,00',
			imageUrl: 'https://placehold.co/400x400/333/FFF?text=YUZUK',
		},
		{
			title: 'Lale Motifli Bilezik',
			description:
				'Türk kültürünün simgesi lale motifleriyle bezeli zarif bilezik. Her detayı özenle işlenmiş.',
			price: '₺1.599,00',
			imageUrl: 'https://placehold.co/400x400/444/FFF?text=BILEZIK',
		},
		{
			title: 'Şahmeran Koleksiyonu Küpe',
			description:
				"Efsanevi Şahmeran'dan ilham alan muhteşem küpe tasarımı. Güçlü ve zarif bir ifade.",
			price: '₺1.199,00',
			imageUrl: 'https://placehold.co/400x400/555/FFF?text=KUPE',
		},
		{
			title: 'Zarif Toka Seti',
			description:
				'Yetişkin kadınlar için özel tasarlanmış zarif toka seti. Günlük kullanım için ideal.',
			price: '₺599,00',
			imageUrl: 'https://placehold.co/400x400/666/FFF?text=T+TOKA',
		},
		{
			title: 'İpek Fular - Özel Tasarım',
			description:
				'Lüks ipekten üretilmiş özel tasarım fular. Her mevsim için şık bir aksesuar.',
			price: '₺799,00',
			imageUrl: 'https://placehold.co/400x400/777/FFF?text=FULAR',
		},
	];

	// Motif data
	const MOTIFS = [
		{ icon: '🌙', title: 'Ay Döngüleri', description: 'Zamanın ritmini yansıtan tasarımlar' },
		{ icon: '🌟', title: 'Virgo', description: 'Zarafet ve mükemmellik arayışı' },
		{ icon: '🌷', title: 'Lale', description: 'Türk kültürünün simgesi' },
		{ icon: '🐍', title: 'Şahmeran', description: 'Efsanevi güç ve zarafet' },
	];
</script>

<svelte:head>
	<title>NOIR | Zamanın Ötesinde Takı Deneyimi</title>
	<meta name="description" content="Yapay zeka güdümlü tasarımı Türk mirasıyla bütünleştiren lüks takı koleksiyonu" />
</svelte:head>

<!-- Immersive Hero Section - GSAP Pin Container -->
<div class="hero-wrapper" bind:this={heroWrapper}>
	{#if heroLoaded && immersiveHeroModule}
		<LocalReactWrapper
			componentModule={immersiveHeroModule}
			componentName="ImmersiveHero"
			props={{ className: 'homepage-hero' }}
		/>
	{:else}
		<div class="hero-loading">
			<div class="loading-spinner"></div>
		</div>
	{/if}
</div>

<!-- Main Content Section (Scrollable) -->
<section class="main-content min-h-[200vh] py-32" bind:this={mainContent}>
	<!-- Intro Text -->
	<div class="text-center mb-20 px-4 md:px-0 max-w-3xl mx-auto">
		<h1 class="text-6xl font-serif text-yellow-600 mb-6 antialiased leading-tight">
			The Virgo Collection
		</h1>
		<p class="text-lg text-gray-300 max-w-xl mx-auto">
			Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren en son
			koleksiyonumuzu keşfedin. Bu bölüm, kahraman animasyonu tamamlandıktan sonra başlar.
		</p>
	</div>

	<!-- Featured Collection Title -->
	<div class="text-center mb-12">
		<h2 class="text-4xl font-serif text-white mb-2">Öne Çıkan Koleksiyon</h2>
		<p class="text-gray-400">En sevilen parçalarımızdan bir seçki</p>
	</div>

	<!-- Product Grid -->
	<div class="product-grid container mx-auto px-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each PRODUCTS as product (product.title)}
				{#if productCardLoaded && productCardModule}
					<LocalReactWrapper
						componentModule={productCardModule}
						componentName="ProductCard"
						props={product}
					/>
				{:else}
					<div class="product-loading-card bg-gray-900 rounded-xl animate-pulse"></div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Why Noir Section -->
	<div class="container mx-auto px-4 mt-32 text-center">
		<h2 class="text-4xl font-serif text-yellow-600 mb-12">Neden Noir?</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">✨</span>
				<h3 class="text-xl font-semibold text-white mb-2">Özel Tasarım</h3>
				<p class="text-gray-400">
					Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir.
				</p>
			</div>
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">🔨</span>
				<h3 class="text-xl font-semibold text-white mb-2">Kaliteli İşçilik</h3>
				<p class="text-gray-400">
					En kaliteli malzemeler ve geleneksel zanaatkarlık ile modern tasarımın buluşması.
				</p>
			</div>
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">💎</span>
				<h3 class="text-xl font-semibold text-white mb-2">Anlamlı Tasarımlar</h3>
				<p class="text-gray-400">
					Ay döngüleri, Virgo, lale ve Şahmeran gibi motiflerle örülü hikayeler.
				</p>
			</div>
		</div>
	</div>

	<!-- Design Motifs Section -->
	<div class="container mx-auto px-4 mt-32 text-center">
		<h2 class="text-4xl font-serif text-white mb-12">Tasarım Motifleri</h2>
		<p class="text-gray-400 mb-16">
			Her koleksiyonumuz, derin anlamlar taşıyan motiflerle bezenmiştir
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each MOTIFS as motif (motif.title)}
				<div class="flex flex-col items-center p-4 transition duration-300 hover:bg-gray-900 rounded-lg">
					<span class="text-4xl mb-4">{motif.icon}</span>
					<h3 class="text-lg font-semibold text-yellow-600 mb-1">{motif.title}</h3>
					<p class="text-sm text-gray-400">{motif.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Newsletter Form -->
	<div class="container mx-auto px-4 mt-32 text-center py-16 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
		<h2 class="text-4xl font-serif text-white mb-4">Yeni Koleksiyonlardan Haberdar Olun</h2>
		<p class="text-gray-400 mb-8">
			Özel indirimler ve yeni tasarımlar hakkında ilk siz haberdar olun.
		</p>
		<form class="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
			<input
				type="email"
				placeholder="E-posta adresinizi girin"
				class="flex-grow w-full md:w-auto p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
			/>
			<button
				type="submit"
				class="w-full md:w-auto p-3 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition-colors shadow-lg"
			>
				Abone Ol
			</button>
		</form>
	</div>
</section>

<!-- Footer -->
<footer class="bg-black py-16 border-t border-gray-800">
	<div class="container mx-auto px-4 text-center">
		<div class="text-4xl font-serif text-yellow-600 mb-4 tracking-wider">NOIR</div>
		<p class="text-gray-400 mb-10 text-lg">Zamanın ötesinde takı deneyimi.</p>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-4xl mx-auto">
			<!-- Corporate -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Kurumsal</h4>
				<a href="/about" class="text-gray-400 hover:text-yellow-600 transition-colors">Hakkımızda</a>
				<a href="/contact" class="text-gray-400 hover:text-yellow-600 transition-colors">İletişim</a>
				<a href="/careers" class="text-gray-400 hover:text-yellow-600 transition-colors">Kariyer</a>
			</div>

			<!-- Customer Service -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Müşteri Hizmetleri</h4>
				<a href="/shipping" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Kargo ve Teslimat</a
				>
				<a href="/returns" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>İade ve Değişim</a
				>
				<a href="/faq" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Sık Sorulan Sorular</a
				>
			</div>

			<!-- Legal -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Yasal</h4>
				<a href="/privacy" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Gizlilik Politikası</a
				>
				<a href="/terms" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Kullanım Koşulları</a
				>
				<a href="/cookies" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Çerez Politikası</a
				>
			</div>

			<!-- Social Media -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Bizi Takip Edin</h4>
				<div class="flex space-x-4">
					<a
						href="https://twitter.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>X</a
					>
					<a
						href="https://instagram.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>IG</a
					>
					<a
						href="https://facebook.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>FB</a
					>
				</div>
			</div>
		</div>

		<p class="mt-16 text-sm text-gray-600">© 2025 NOIR. Tüm hakları saklıdır. Jxion Framework Powered.</p>
	</div>
</footer>

<style>
	/* --- Jxion Design System Variables (from _noir-variables.scss) --- */
	:global(:root) {
		--color-noir-black: #000000;
		--color-noir-gold: #ffd700;
		--color-noir-graphite: #434343;
		--color-noir-text-primary: #f8f8f8;
		--color-noir-text-secondary: #e2e2e2;
	}

	/* Hero Wrapper: Container for pinned content */
	.hero-wrapper {
		height: 100vh;
		position: relative;
		/* Background: Dark gradient that seeps under the hero */
		background: radial-gradient(
			circle at center,
			var(--color-noir-graphite) 0%,
			var(--color-noir-black) 100%
		);
	}

	/* React Component Container */
	:global(.homepage-hero) {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.hero-loading {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-noir-black);
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 215, 0, 0.2);
		border-top-color: var(--color-noir-gold);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.main-content {
		background-color: var(--color-noir-black);
		color: var(--color-noir-text-primary);
		position: relative;
		z-index: 10; /* Ensures content is above the unpinned canvas */
		/* Initial clipPath for smooth reveal animation */
		clip-path: inset(100% 0 0 0);
	}

	/* Headings use Playfair Display font (NOIR theme) */
	:global(h1),
	:global(h2),
	:global(h3),
	footer :global(h4) {
		font-family: 'Playfair Display', 'Times New Roman', serif;
	}

	/* Visual consistency improvements */
	.product-loading-card {
		height: 450px; /* Match product card height */
		background-color: #1a1a1a;
		border: 1px solid #333;
	}
</style>

